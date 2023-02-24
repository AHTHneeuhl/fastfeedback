import useSWR from 'swr';
import Head from 'next/head';

import { useAuth } from '@/lib/auth';
import DashboardShell from '@/components/DashboardShell';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import FeedbackTable from '@/components/FeedbackTable';
import fetcher from '@/utils/fetcher';

const Feedback = () => {
  const { user } = useAuth();
  const { data: feedbacks, isLoading } = useSWR(
    user ? ['/api/feedback', user.token] : null,
    fetcher
  );

  return (
    <>
      <Head>
        <title>Fast Feedback | Dashboard</title>
      </Head>
      <DashboardShell>
        {isLoading ? (
          <SiteTableSkeleton />
        ) : feedbacks ? (
          <FeedbackTable feedbacks={feedbacks} />
        ) : null}
      </DashboardShell>
    </>
  );
};

export default Feedback;
