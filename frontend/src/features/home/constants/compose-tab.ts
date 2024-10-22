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

export const TAB_DIALOG_CONTENT = {
  [ComposeTabValue.Albums]: {
    title: 'Add Photos',
    steps: [
      {
        image: '/images/albums.svg',
        title: 'Manage your photos',
        description:
          'Lorem ipsum sit dolor amet is a dummy text used by the typography industry and the web industry.',
      },
      {
        image: '/images/upload.svg',
        title: 'Manage your photos',
        description:
          'Lorem ipsum sit dolor amet is a dummy text used by the typography industry and the web industry.',
      },
    ],
  },
  [ComposeTabValue.Video]: {
    title: 'Add Videos',
    steps: [
      {
        image: '/images/videotrip.svg',
        title: 'Share live videos',
        description:
          'Lorem ipsum sit dolor amet is a dummy text used by the typography industry and the web industry.',
      },
      {
        image: '/images/videocall.svg',
        title: 'To build your audience',
        description:
          'Lorem ipsum sit dolor amet is a dummy text used by the typography industry and the web industry.',
      },
    ],
  },
};
