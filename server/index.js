const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = 5000;
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4hbah.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    const database = client.db("TaskMate");
    const usersCollection = database.collection("users");
    const tasksCollection = database.collection("tasks");

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "User already exists" });
      }
      user.createdAt = new Date();
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // Task related endpoints
    app.post("/tasks", async (req, res) => {
      try {
        const task = {
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        const result = await tasksCollection.insertOne(task);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.get("/tasks/:userId", async (req, res) => {
      try {
        const { userId } = req.params;
        const tasks = await tasksCollection
          .find({ userId })
          .sort({ order: 1 })
          .toArray();
        res.json(tasks);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.patch("/tasks/:taskId", async (req, res) => {
      try {
        const { taskId } = req.params;
        const updates = {
          ...req.body,
          updatedAt: new Date()
        };
        const result = await tasksCollection.updateOne(
          { _id: new ObjectId(taskId) },
          { $set: updates }
        );
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.delete("/tasks/:taskId", async (req, res) => {
      try {
        const { taskId } = req.params;
        const result = await tasksCollection.deleteOne({
          _id: new ObjectId(taskId)
        });
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Batch update for reordering
    app.patch("/tasks/batch-update", async (req, res) => {
      try {
        const operations = req.body.map(({ _id, category, order }) => ({
          updateOne: {
            filter: { _id: new ObjectId(_id) },
            update: { 
              $set: { 
                category,
                order,
                updatedAt: new Date()
              }
            }
          }
        }));
        
        const result = await tasksCollection.bulkWrite(operations);
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`TaskMate  app listening on port ${port}`);
});
