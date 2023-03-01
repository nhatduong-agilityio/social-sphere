/**
 * Remove data form key
 * @param key
 */
export const remove = (key: string) => {
  fetch(key, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((text) => {
        throw new Error(text);
      });
    }

    return res.json();
  });
};
