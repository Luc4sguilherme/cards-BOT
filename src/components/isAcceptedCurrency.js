const currencies = ['TF2', 'GEMS'];

export default (currency) => {
  if (currencies.includes(currency)) {
    return true;
  }

  return false;
};
