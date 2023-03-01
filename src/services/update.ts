/**
 * Update data from key and trigger arg
 * @param key
 * @param arg
 */
export const update = <T>(key: string, { arg }: { arg: T }) => {
  fetch(key, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((text) => {
        throw new Error(text);
      });
    }

    return res.json();
  });
};
