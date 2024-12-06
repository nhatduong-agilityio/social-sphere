import {
  useCommentReplyStore,
  commentReplyInitState,
  CommentReplyValues,
} from '../comment-reply';
import { MOCK_FRIENDS } from '@/__mocks__';

describe('Comment Reply Store', () => {
  beforeEach(() => {
    useCommentReplyStore.setState(commentReplyInitState);
  });

  it('initializes with correct default state', () => {
    const state = useCommentReplyStore.getState();
    expect(state.commentReplyValue).toEqual({
      commentId: undefined,
      friend: undefined,
    });
  });

  it('sets comment reply value correctly', () => {
    const mockFriend = MOCK_FRIENDS[0];

    const newValue = {
      commentId: 123,
      friend: mockFriend,
    } as CommentReplyValues;

    useCommentReplyStore.getState().setCommentReplyValue(newValue);

    const state = useCommentReplyStore.getState();
    expect(state.commentReplyValue).toEqual(newValue);
  });

  it('clears comment reply state correctly', () => {
    // First set some values
    const mockValue = {
      commentId: 123,
      friend: MOCK_FRIENDS[0],
    };

    useCommentReplyStore.getState().setCommentReplyValue(mockValue);

    // Then clear the state
    useCommentReplyStore.getState().clearCommentReply();

    // Verify it's back to initial state
    const state = useCommentReplyStore.getState();
    expect(state.commentReplyValue).toEqual(
      commentReplyInitState.commentReplyValue,
    );
  });

  it('persists state to sessionStorage', () => {
    const mockValue = {
      commentId: 456,
      friend: MOCK_FRIENDS[0],
    };

    useCommentReplyStore.getState().setCommentReplyValue(mockValue);

    const storedState = JSON.parse(
      sessionStorage.getItem('onboarding-steps') || '{}',
    );
    expect(storedState.state.commentReplyValue).toEqual(mockValue);
  });
});
