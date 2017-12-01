# GraphQL Architecture Example
Simple example of a modulable GraphQL architecture based on folders.

## How it works
For each object in your system, you create a folder inside `/src/graphql/`. The folder will have to contains the following files:
* `*.graphql` - This file contains the type definitions regarding the object. You need at least one, but can have as many as you want (e.g. one for `type Query` and another one for `type Mutations`)
* `resolvers.js` - This file exports all the resolver functions declarated on the GraphQL files

All folders are processed automaticaly by `/graphql/index.js`. You just make the new folder,  create the necessary files and it will just work. No need to remember to import the folders or load something!

## Example structure

```
└── graphql
    ├── index.js
    ├── post
    │   ├── resolvers.js
    │   └── allTypeDefs.graphql
    └── user
        ├── resolvers.js
        ├── mutations.graphql
        └── queries.graphql
```