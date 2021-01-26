const { gql } = require("apollo-server");

module.exports = gql`
  type Collection {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    recipes: [Recipe]!
  }
  type Recipe {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getCollections: [Collection]
    getCollection(collectionId: ID!): Collection
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createCollection(body: String!): Collection!
    deleteCollection(collectionId: ID!): String!
    addRecipe(collectionId: ID!, body: String!): Collection!
    deleteRecipe(collectionId: ID!, recipeId: ID!): Collection!
  }
`;
