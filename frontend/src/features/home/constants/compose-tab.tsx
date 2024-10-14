export enum ComposeTabValue {
  Publish = 'publish',
  Albums = 'albums',
  Video = 'video',
}

export const COMPOSE_TAB_TITLES: Record<ComposeTabValue, string> = {
  [ComposeTabValue.Publish]: 'Publish',
  [ComposeTabValue.Albums]: 'Albums',
  [ComposeTabValue.Video]: 'Video',
};
