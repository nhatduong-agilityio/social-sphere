// Read data form key
export const fetcher = (key: string) => fetch(key).then((res) => res.json());
