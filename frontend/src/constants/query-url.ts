export const QUERY_GETS = {
  FRIENDS: (username: string) =>
    `filters[$and][0][follower][username][$eq]=${username}&filters[$and][1][requestStatus][$eq]=friends&populate[followed][fields][0]=id&populate[followed][fields][1]=username&populate[followed][fields][2]=firstName&populate[followed][fields][3]=lastName&populate[followed][fields][4]=profilePicture&populate[followed][fields][5]=banner&populate[followed][populate][followedRelationships][filters][requestStatus]=friends`,
  PHOTOS: (username: string) =>
    `filters[$and][0][author][username][$eq]=${username}&populate[author][fields][0]=id&populate[author][fields][1]=username`,
};

export const QUERY_GET_NEWS_FEEDS = (
  authorId: string,
  page: number = 1,
  pageSize: number = 10,
) =>
  `filters[author][id][$eq]=${authorId}&populate[author]=*&populate[likes][fields][0]=createdAt&populate[likes][populate][user]=*&populate[likes][sort][createdAt]=desc&populate[comments]=*&populate[shares]=*&sort[createdAt]=desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

export const QUERY_GET_EXISTING_LIKE = (newsFeedId: number, userId: number) =>
  `filters[user][id][$eq]=${userId}&populate[user]=*&populate[post]=*&filters[post][id][$eq]=${newsFeedId}&filters[user][id][$eq]=${userId}`;
