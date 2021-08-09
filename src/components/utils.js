import fs from 'graceful-fs';
import util from 'util';

export const readFileAsync = util.promisify(fs.readFile);
export const writeFileAsync = util.promisify(fs.writeFile);
export const appendFileAsync = util.promisify(fs.appendFile);

export async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const isValidCommand = (input, command) => {
  const regex = new RegExp(`^(${String(command).replace(/( )/g, '')})$`);
  return !!String(input).match(regex)?.[0] ?? false;
};
