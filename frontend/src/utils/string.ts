export const getFirstLetters = (firstName: string, lastName: string) => {
  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();

  return firstInitial + lastInitial;
};

export const getFullName = (firstName: string, lastName: string) =>
  [firstName, lastName]
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
    .join(' ');
