import Head from 'next/head';
import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import DashboardShell from '@/components/DashboardShell';
import fetcher from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';
import SiteTableHeader from '@/components/SiteTableHeader';

const Dashboard = () => {
  const { user } = useAuth();
  const { data: sites, isLoading } = useSWR(
    user ? ['/api/sites', user.token] : null,
    fetcher
  );

  return (
    <>
      <Head>
        <title>Fast Feedback | Dashboard</title>
      </Head>
      <DashboardShell>
        <SiteTableHeader />
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
