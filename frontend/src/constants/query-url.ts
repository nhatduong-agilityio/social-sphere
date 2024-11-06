export const QUERY_GET_FRIENDS = (id?: string) =>
  `filters[$and][0][follower][id][$eq]=${id}&filters[$and][1][requestStatus][$eq]=friends&populate[followed][fields][0]=id&populate[followed][fields][1]=username&populate[followed][fields][2]=firstName&populate[followed][fields][3]=lastName&populate[followed][fields][4]=profilePicture&populate[followed][fields][5]=banner&populate[followed][populate][followedRelationships][filters][requestStatus]=friends`;

export const QUERY_GET_NEWS_FEEDS = (
  authorId: string,
  page: number = 1,
  pageSize: number = 10,
) =>
  `filters[author][id][$eq]=${authorId}&populate[author]=*&populate[likes]=*&populate[comments]=*&populate[shares]=*&sort[0]=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
