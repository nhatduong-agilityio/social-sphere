import { determineShareType } from '../share-news-feed';
import { ShareTypeOption } from '@/types';

describe('Share News Feed Utils', () => {
  describe('determineShareType', () => {
    it('returns FRIENDS_FEED when friendsFeed parameter is provided', () => {
      expect(determineShareType('friend1')).toBe(ShareTypeOption.FRIENDS_FEED);
    });

    it('returns GROUP when group parameter is provided', () => {
      expect(determineShareType(undefined, 'group1')).toBe(
        ShareTypeOption.GROUP,
      );
    });

    it('returns PAGE when page parameter is provided', () => {
      expect(determineShareType(undefined, undefined, 'page1')).toBe(
        ShareTypeOption.PAGE,
      );
    });

    it('returns FRIENDS_MESSAGE when friendsMessage parameter is provided', () => {
      expect(
        determineShareType(undefined, undefined, undefined, 'message1'),
      ).toBe(ShareTypeOption.FRIENDS_MESSAGE);
    });

    it('returns YOUR_FEED when no parameters are provided', () => {
      expect(determineShareType()).toBe(ShareTypeOption.YOUR_FEED);
    });

    it('prioritizes friendsFeed over other options when multiple parameters are provided', () => {
      expect(determineShareType('friend1', 'group1', 'page1', 'message1')).toBe(
        ShareTypeOption.FRIENDS_FEED,
      );
    });
  });
});
