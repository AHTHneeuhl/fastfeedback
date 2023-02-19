import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmptyState';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return 'Loading...';
  }

  return <EmptyState />;
};

export default Dashboard;
