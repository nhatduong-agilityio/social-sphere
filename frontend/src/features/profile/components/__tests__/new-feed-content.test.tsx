import { render } from '@testing-library/react';
import { NewFeedContent } from '../new-feed-content';

export class IntersectionObserver {
  root = null;
  rootMargin = '';
  thresholds = [];

  disconnect() {
    return null;
  }

  observe() {
    return null;
  }

  takeRecords() {
    return [];
  }

  unobserve() {
    return null;
  }
}

window.IntersectionObserver = IntersectionObserver;
global.IntersectionObserver = IntersectionObserver;

global.fetch = jest.fn();

jest.mock('@/actions');

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: () => [{}, jest.fn()],
}));

const mockProps = {
  authorId: 'test-author-id',
  newsFeedIdsPagination: {
    data: [
      { id: 1, createdAt: '2024-01-01', documentId: '1' },
      { id: 2, createdAt: '2024-01-02', documentId: '2' },
    ],
    meta: {
      pagination: {
        page: 1,
        pageSize: 10,
        pageCount: 2,
        total: 15,
      },
    },
  },
};

describe('NewFeedContent Component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <NewFeedContent
        authorId={mockProps.authorId}
        newsFeedIds={mockProps.newsFeedIdsPagination.data}
        pagination={mockProps.newsFeedIdsPagination.meta.pagination}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
