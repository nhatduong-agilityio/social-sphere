import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

// Models
import { UserDetail } from '@/types';

export type CommentReplyValues = {
  commentId: number | undefined;
  friend: UserDetail | undefined;
};

export type CommentReplyState = {
  commentReplyValue: CommentReplyValues;
};

export type CommentReplyActions = {
  setCommentReplyValue: (values: CommentReplyValues) => void;
  clearCommentReply: () => void;
};

export type CommentReplyStore = CommentReplyState & CommentReplyActions;

export const commentReplyInitState: CommentReplyState = {
  commentReplyValue: {
    commentId: undefined,
    friend: undefined,
  },
};

export const useCommentReplyStore = createWithEqualityFn<CommentReplyStore>()(
  persist(
    (set) => ({
      ...commentReplyInitState,
      setCommentReplyValue: (value) => {
        set((state) => ({
          ...state,
          commentReplyValue: value,
        }));
      },
      clearCommentReply: () => {
        set({
          ...commentReplyInitState,
        });
      },
    }),
    {
      name: 'onboarding-steps',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
  shallow,
);
