import fs from 'fs';
import path from 'path';
import {makeExecutableSchema} from 'graphql-tools';
import {fileLoader, mergeTypes, mergeResolvers} from 'merge-graphql-schemas';

/*
 * Create Types
 */

const typesArray = fileLoader(path.join(__dirname, '.'), {
  recursive: true,
  extensions: ['.graphql']
});

const typeDefs = mergeTypes(typesArray);

/*
 * Create Resolvers
 */

// Temporary while 'merge-graphql-schemas' does not accept blobs
const recursiveReadDirSync = dir =>
  fs.readdirSync(dir)
    .reduce((files, file) => (
      fs.statSync(path.join(dir, file)).isDirectory() ?
        files.concat(recursiveReadDirSync(path.join(dir, file))) :
        files.concat(path.join(dir, file))
      ),
      []);

const resolversArray = recursiveReadDirSync(__dirname)
  .filter(f => (path.parse(f).name.toLowerCase() === 'resolvers'))
  .map(f => {
    const file = require(f);
    return file.default || file;
  });

const resolvers = mergeResolvers(resolversArray);

/*
 * Create Schema
 */

export default makeExecutableSchema({typeDefs, resolvers});