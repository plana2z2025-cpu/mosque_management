const getInitials = (fullName) => {
  const names = fullName.split(' ');
  const initials = names
    .map((name) => name.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
  return initials;
};

export default getInitials;
