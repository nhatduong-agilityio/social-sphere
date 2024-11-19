import { OverviewContent } from '@/features/profile/components';

const OverviewPage = ({ params }: { params: { username: string } }) => (
  <OverviewContent username={params.username} />
);

export default OverviewPage;
