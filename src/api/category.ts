// Constants
import { API_ENDPOINT } from '@/constants/api-endpoint';

// Models
import { CategoryModel } from '@/models/CategoryModel';

export const getCategoryList = async (showError: boolean = false) => {
  // TODO: Create service to avoid repeating load env for API_RUL
  let CATEGORY_LIST_URL = `${process.env.API_URL}/${API_ENDPOINT.CATEGORY_LIST}`;

  // Make Api Endpoint wrong to throw error for demo
  if (showError) {
    CATEGORY_LIST_URL += 'invalidUrl';
  }

  const res = await fetch(CATEGORY_LIST_URL, {
    cache: 'no-store',
  });
  const data: CategoryModel[] = await res.json();

  return data;
};

export const getCategoryById = async (id: string) => {
  // TODO: Create service to avoid repeating load env for API_RUL
  const CATEGORY_DETAIL_URL = `${process.env.API_URL}/${API_ENDPOINT.CATEGORY_LIST}/${id}`;

  const res = await fetch(CATEGORY_DETAIL_URL, {
    cache: 'no-store',
  });
  const data: CategoryModel = await res.json();

  return data;
};
