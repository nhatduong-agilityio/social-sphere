import { render, screen } from '@testing-library/react';
import { NewsFeedSocialCount } from '../news-feed-social-count';

describe('NewsFeedSocialCount', () => {
  const mockProps = {
    numberOfLikes: 10,
    numberOfShares: 5,
    numberOfComments: 3,
  };

  it('matches snapshot', () => {
    const { container } = render(<NewsFeedSocialCount {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders all social counts correctly', () => {
    render(<NewsFeedSocialCount {...mockProps} />);
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('matches snapshot with zero counts', () => {
    const { container } = render(
      <NewsFeedSocialCount
        numberOfLikes={0}
        numberOfShares={0}
        numberOfComments={0}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders with large numbers', () => {
    const { container } = render(
      <NewsFeedSocialCount
        numberOfLikes={1000}
        numberOfShares={500}
        numberOfComments={250}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
