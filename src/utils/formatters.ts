export const getFullName = (
  firstName: string = '',
  lastName: string = '',
  secondLastName: string = '',
) => {
  return `${lastName.toUpperCase()} ${secondLastName.toUpperCase()}, ${firstName}`;
};
