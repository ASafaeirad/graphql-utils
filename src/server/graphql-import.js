import fs from 'fs';
import path from 'path';
import caller from 'caller';

export const getDirName = () => path.dirname(caller(2));

const removeGqlExtensionIfExist = filename => filename.replace(/(.graphql$)/gi, '');
const addGqlExtension = filename => `${filename}.graphql`;
const fixGqlExtension = filename => addGqlExtension(removeGqlExtensionIfExist(filename));

export const importSchema = (filename) => {
  const folder = path.dirname(caller());
  let file = fixGqlExtension(filename);
  return fs.readFileSync(path.join(folder, file), 'utf8').toString();
};
