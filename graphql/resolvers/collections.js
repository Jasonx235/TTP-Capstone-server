const { AuthenticationError } = require("apollo-server");
const Collection = require("../../models/Collection");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getCollections() {
      try {
        const collections = await Collection.find().sort({ createdAt: -1 });
        return collections;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getCollection(_, { collectionId }) {
      try {
        const collection = await Collection.findById(collectionId);
        if (collection) {
          return collection;
        } else {
          throw new Error("Collection not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createCollection(_, { body }, context) {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new Error("Collection body must not be empty");
      }

      console.log(user);
      const newCollection = new Collection({
        user: user.id,
        body,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const collection = await newCollection.save();
      return collection;
    },

    async deleteCollection(_, { collectionId }, context) {
      const user = checkAuth(context);

      try {
        const collection = await Collection.findById(collectionId);
        if (user.username === post.username) {
          await post.delete();
          return "Collection deleted Successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
