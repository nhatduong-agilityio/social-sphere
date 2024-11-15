import { UserDetail } from '@/types';

export const MOCK_FRIENDS: UserDetail[] = [
  {
    id: 1,
    firstName: 'John',
    username: 'johndoe',
    email: 'admin@gmail.com',
    password: '1@Dzxcvb',
    lastName: 'Doe',
    countFriends: 3,
    profilePicture: 'https://i.pravatar.cc/300',
    location: {
      city: 'Melbourne',
      countryCode: 'au',
    },
  },
  {
    id: 2,
    username: 'nellyschwartz',
    firstName: 'Nelly',
    lastName: 'Schwartz',
    countFriends: 1,
    profilePicture: 'https://i.pravatar.cc/300',
    location: {
      city: 'New York',
      countryCode: 'us',
    },
  },
  {
    id: 3,
    username: 'mikelasalle',
    firstName: 'Mike',
    lastName: 'Lasalle',
    countFriends: 2,
    profilePicture: 'https://i.pravatar.cc/300',
    location: {
      city: 'Berlin',
      countryCode: 'de',
    },
  },
  {
    id: 4,
    username: 'sarahjohnson',
    firstName: 'Sarah',
    lastName: 'Johnson',
    countFriends: 4,
    profilePicture: 'https://i.pravatar.cc/300',
    location: {
      city: 'London',
      countryCode: 'gb',
    },
  },
  {
    id: 5,
    username: 'stellabergmann',
    firstName: 'Stella',
    lastName: 'Bergmann',
    countFriends: 0,
    profilePicture: 'https://i.pravatar.cc/300',
    location: {
      city: 'Los Angeles',
      countryCode: 'us',
    },
  },
  {
    id: 6,
    username: 'davidkim',
    firstName: 'David',
    lastName: 'Kim',
    countFriends: 0,
    profilePicture: 'https://i.pravatar.cc/300',
    location: {
      city: 'Ha Noi',
      countryCode: 'vn',
    },
  },
];

export const MOCK_PHOTOS = [
  {
    id: '1',
    src: 'https://friendkit.cssninja.io/assets/img/demo/profile/about/photos/1.jpg',
    alt: 'Photo 1',
  },
  {
    id: '2',
    src: 'https://friendkit.cssninja.io/assets/img/demo/profile/about/photos/2.jpg',
    alt: 'Photo 2',
  },
  {
    id: '3',
    src: 'https://friendkit.cssninja.io/assets/img/demo/profile/about/photos/3.jpg',
    alt: 'Photo 3',
  },
  {
    id: '4',
    src: 'https://friendkit.cssninja.io/assets/img/demo/profile/about/photos/4.jpg',
    alt: 'Photo 4',
  },
  {
    id: '5',
    src: 'https://friendkit.cssninja.io/assets/img/demo/profile/about/photos/5.jpg',
    alt: 'Photo 5',
  },
  {
    id: '6',
    src: 'https://friendkit.cssninja.io/assets/img/demo/profile/about/photos/6.jpg',
    alt: 'Photo 6',
  },
  {
    id: '7',
    src: 'https://friendkit.cssninja.io/assets/img/demo/profile/about/photos/7.jpg',
    alt: 'Photo 7',
  },
  {
    id: '8',
    src: 'https://friendkit.cssninja.io/assets/img/demo/profile/about/photos/8.jpg',
    alt: 'Photo 8',
  },
];

export const MOCK_VIDEOS = [
  {
    id: '1',
    thumbnail:
      'https://friendkit.cssninja.io/assets/img/demo/profile/about/videos/1.jpg',
    videoSrc: '',
    duration: 152,
    alt: 'Video 1',
  },
  {
    id: '2',
    thumbnail:
      'https://friendkit.cssninja.io/assets/img/demo/profile/about/videos/2.jpg',
    videoSrc: '',
    duration: 152,
    alt: 'Video 2',
  },
  {
    id: '3',
    thumbnail:
      'https://friendkit.cssninja.io/assets/img/demo/profile/about/videos/3.jpg',
    videoSrc: '',
    duration: 152,
    alt: 'Video 3',
  },
  {
    id: '4',
    thumbnail:
      'https://friendkit.cssninja.io/assets/img/demo/profile/about/videos/4.jpg',
    videoSrc: '',
    duration: 152,
    alt: 'Video 4',
  },
  {
    id: '5',
    thumbnail:
      'https://friendkit.cssninja.io/assets/img/demo/profile/about/videos/5.jpg',
    videoSrc: '',
    duration: 152,
    alt: 'Video 5',
  },
];

export const MOCK_LOCATIONS = [
  {
    id: '1',
    title: 'Melbourne',
    src: 'https://friendkit.cssninja.io/assets/img/demo/unsplash/places/16.jpg',
    alt: 'Melbourne',
    rating: 5,
  },
  {
    id: '2',
    title: 'Dany Burgers',
    src: 'https://friendkit.cssninja.io/assets/img/demo/unsplash/places/17.jpg',
    alt: 'Dany Burgers',
    rating: 4,
  },
  {
    id: '3',
    title: 'Vethnics Fashion',
    src: 'https://friendkit.cssninja.io/assets/img/demo/unsplash/places/18.jpg',
    alt: 'Vethnics Fashion',
    rating: 5,
  },
  {
    id: '4',
    title: 'The Smoothie Bar',
    src: 'https://friendkit.cssninja.io/assets/img/demo/unsplash/places/19.jpg',
    alt: 'The Smoothie Bar',
    rating: 5,
  },
  {
    id: '5',
    title: 'Eiffel Tower',
    src: 'https://friendkit.cssninja.io/assets/img/demo/unsplash/places/20.jpg',
    alt: 'Eiffel Tower',
    rating: 5,
  },
  {
    id: '6',
    title: 'Lennie Fair',
    src: 'https://friendkit.cssninja.io/assets/img/demo/unsplash/places/21.jpg',
    alt: 'Lennie Fair',
    rating: 5,
  },
];

export const MOCK_GROUPS = [
  {
    id: '1',
    name: 'Family',
    description: 'Davis family',
    members: '39 members',
    avatar: 'https://i.pravatar.cc/300',
    location: {
      city: 'Los Angeles',
      countryCode: 'us',
    },
  },
  {
    id: '2',
    name: 'Crazy Bakers',
    description: `It's all about making cakes`,
    members: '8K members',
    avatar: 'https://i.pravatar.cc/300',
    location: {
      city: 'Trelew',
      countryCode: 'ar',
    },
  },
  {
    id: '3',
    name: 'Otaku Zone',
    description: 'Japanese culture',
    members: '98K members',
    avatar: 'https://i.pravatar.cc/300',
    location: {
      city: 'Tokyo',
      countryCode: 'jp',
    },
  },
  {
    id: '4',
    name: 'Streetwear',
    description: 'Urban clothing',
    members: '519 members',
    avatar: 'https://i.pravatar.cc/300',
    location: {
      city: 'Manchester',
      countryCode: 'uk',
    },
  },
  {
    id: '5',
    name: 'Motivate',
    description: 'Sports videos',
    members: '50K members',
    avatar: 'https://i.pravatar.cc/300',
    location: {
      city: 'Madrid',
      countryCode: 'es-variant',
    },
  },
];

export const MOCK_PAGES = [
  {
    id: '1',
    name: 'Css Ninja',
    description: 'Share on Css Ninja.',
    avatar: 'https://friendkit.cssninja.io/assets/img/avatars/hanzo.svg',
    owner: MOCK_FRIENDS[3],
  },
  {
    id: '2',
    name: 'NuclearJs',
    description: 'Share on NuclearJs.',
    avatar:
      'https://friendkit.cssninja.io/assets/img/vector/icons/logos/nuclearjs.svg',
    owner: MOCK_FRIENDS[2],
  },
  {
    id: '3',
    name: 'Slicer',
    description: 'Share on Slicer.',
    avatar:
      'https://friendkit.cssninja.io/assets/img/vector/icons/logos/slicer.svg',
    owner: MOCK_FRIENDS[4],
  },
];
