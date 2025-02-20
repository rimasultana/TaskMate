import useAuth from '@/hooks/useAuth';
import TaskBoard from '../components/TaskBoard/TaskBoard';
import { Navigate } from 'react-router';

const Home = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Task Management</h1>
      <TaskBoard />
    </div>
  );
};

export default Home;
