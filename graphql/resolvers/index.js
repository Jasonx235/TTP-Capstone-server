const usersResolvers = require("./users");
const collectionsResolvers = require("./collections");
const recipesResolvers = require("./recipes");

module.exports = {
  Query: {
    ...collectionsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...recipesResolvers.Mutation,
  },
};
