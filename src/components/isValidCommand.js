export const isValidCommand = (input, command) => {
  const regex = new RegExp(`^(${String(command).replace(/( )/g, '')})$`);
  return !!String(input).match(regex)?.[0] ?? false;
};
