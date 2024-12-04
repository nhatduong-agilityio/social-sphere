import { render } from '@testing-library/react';
import { ActivityFeed } from '../activity-feed';
import { getNewsFeedIds } from '../../actions';

jest.mock('../../actions');
jest.mock('../activity-feed-content', () => ({
  ActivityFeedContent: () => (
    <div data-testid="mocked-content">Mocked Content</div>
  ),
}));

const mockData = {
  newsFeed: {
    data: {
      data: [{ id: 1, attributes: { title: 'Test Post' } }],
      meta: { pagination: { page: 1, pageSize: 10, total: 1 } },
    },
  },
};

describe('ActivityFeed', () => {
  beforeAll(() => {
    (getNewsFeedIds as jest.Mock).mockResolvedValue(mockData.newsFeed);
  });

  it('renders successfully with all data', async () => {
    const component = await ActivityFeed();
    const { container } = render(component);

    expect(container).toMatchSnapshot();
  });

  it('calls all required APIs', async () => {
    await ActivityFeed();

    expect(getNewsFeedIds).toHaveBeenCalled();
  });
});
