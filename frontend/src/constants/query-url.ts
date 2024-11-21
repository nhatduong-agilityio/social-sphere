export const QUERY = {
  FRIENDS: (username: string, page: number = 1, pageSize: number = 10) =>
    `filters[$and][0][follower][username][$eq]=${username}&filters[$and][1][requestStatus][$eq]=friends&populate[followed][fields][0]=id&populate[followed][fields][1]=username&populate[followed][fields][2]=firstName&populate[followed][fields][3]=lastName&populate[followed][fields][4]=profilePicture&populate[followed][fields][5]=banner&populate[followed][populate][followedRelationships][filters][requestStatus]=friends&sort[createdAt]=desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
  PHOTOS: (username: string) =>
    `filters[$and][0][author][username][$eq]=${username}&populate[author][fields][0]=id&populate[author][fields][1]=username`,
  SUGGEST_FRIENDS: (userId: string) => `/non-friends/${userId}`,
  ACCEPT_FRIENDS: (userId: string) =>
    `filters[$and][0][followed][id][$eq]=${userId}&filters[$and][1][requestStatus][$eq]=pending&populate[follower][populate][followedRelationships][filters][requestStatus]=friends&pagination[pageSize]=6`,
  REJECT_FRIENDS: (follower: string, followed: string) =>
    `filters[$and][0][follower][id][$eq]=${follower}&?filters[$and][1][followed][id][$eq]=${followed}&filters[requestStatus][$eq]=rejected`,
  NEWS_FEEDS: (authorId: string, page: number = 1, pageSize: number = 10) =>
    `filters[author][id][$eq]=${authorId}&populate[author]=*&populate[likes][fields][0]=createdAt&populate[likes][populate][user]=*&populate[likes][sort][createdAt]=desc&populate[comments]=*&populate[shares]=*&sort[createdAt]=desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
  EXISTING_LIKE: (newsFeedId: number, userId: number) =>
    `filters[user][id][$eq]=${userId}&populate[user]=*&populate[post]=*&filters[post][id][$eq]=${newsFeedId}&filters[user][id][$eq]=${userId}`,
  LATEST_NEWS_FEED_IDS_BY_AUTHOR_ID: (
    authorId: string,
    page: number = 1,
    pageSize: number = 10,
  ) =>
    `filters[author][id][$eq]=${authorId}&filters[shareType][$eq]=yourFeed&fields[0]=id&sort[createdAt]=desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
  NEWS_FEED_DETAIL_BY_ID: (newsFeedId: string) =>
    `filters[id][$eq]=${newsFeedId}&populate[author]=*&populate[likes][fields][0]=createdAt&populate[likes][populate][user]=*&populate[likes][sort][createdAt]=desc&populate[comments]=*&populate[shares]=*&populate[sharedFrom][populate][author]=*`,
  LIST_COMMENTS_IN_NEWS_FEED_BY_ID: (
    newsFeedId: string,
    page: number = 1,
    pageSize: number = 10,
  ) =>
    `filters[post][id][$eq]=${newsFeedId}&filters[parent][$null]=true&populate[friend]=*&populate[likes][fields][0]=createdAt&populate[likes]&populate[replies][populate][friend]=*&populate[replies][populate][likes][fields][0]=createdAt&populate[replies][populate][likes]&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[createdAt]=desc`,
  CREATE_SHARE: '/create',
  PROFILE: (username: string) =>
    `filters[username][$eq]=${username}&populate[followedRelationships][filters][requestStatus]=friends`,
  GROUPS: (
    authorId: string,
    searchName = '',
    page: number = 1,
    pageSize: number = 10,
  ) =>
    `filters[$or][0][createdUser][id][$eq]=${authorId}&filters[$or][1][groupMembers][user][id][$eq]=${authorId}&populate=*&filters[name][$containsi]=${searchName}&sort[createdAt]=desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
  GROUP_DETAIL_BY_NAME: (name: string) =>
    `filters[name][$eq]=${name}&populate[createdUser]=*&populate[groupMembers][populate][user]=*&populate[posts]=*`,
  GROUP_MEMBERS_BY_GROUP_ID: (
    groupId: string,
    page: number = 1,
    pageSize: number = 10,
  ) =>
    `filters[group][id][$eq]=${groupId}&populate[user]=*&sort[createdAt]=desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
  LATEST_NEWS_FEED_IDS_BY_GROUP_ID: (
    groupId: string,
    page: number = 1,
    pageSize: number = 10,
  ) =>
    `filters[group][id][$eq]=${groupId}&fields[0]=id&sort[createdAt]=desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
};
