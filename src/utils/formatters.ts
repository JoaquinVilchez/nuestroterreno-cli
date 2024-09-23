export const getFullName = (firstName: string = '', lastName: string = '') => {
  return `${lastName.toUpperCase()}, ${firstName}`;
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
