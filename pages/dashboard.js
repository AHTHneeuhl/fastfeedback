import { useAuth } from '@/lib/auth';
import Head from 'next/head';
import useSWR from 'swr';

import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import DashboardShell from '@/components/DashboardShell';
import fetcher from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';

const Dashboard = () => {
  const { data: sites, isLoading } = useSWR('/api/sites', fetcher);

  return (
    <>
      <Head>
        <title>Fast Feedback | Dashboard</title>
      </Head>
      <DashboardShell>
        {isLoading ? (
          <SiteTableSkeleton />
        ) : sites ? (
          <SiteTable sites={sites} />
        ) : (
          <EmptyState />
        )}
      </DashboardShell>
    </>
  );
};

export default Dashboard;
