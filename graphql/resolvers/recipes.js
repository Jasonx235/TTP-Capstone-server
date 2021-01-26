const Collection = require("../../models/Collection");
const checkAuth = require("../../utils/check-auth");

const { AuthenticationError, UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    addRecipe: async (_, { collectionId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty Recipe", {
          errors: {
            body: "Recipe body must not be empty",
          },
        });
      }

      const collection = await Collection.findById(collectionId);

      if (collection) {
        collection.recipes.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await collection.save();
        return collection;
      } else throw new UserInputError("Collection not found");
    },

    deleteRecipe: async (_, { collectionId, recipeId }, context) => {
      const { username } = checkAuth(context);

      const collection = await Collection.findById(collectionId);

      if (collection) {
        const recipeIndex = collection.recipes.findIndex(
          (r) => r.id === recipeId
        );

        if (collection.recipes[recipeIndex].username === username) {
          collection.recipes.splice(recipeIndex, 1);
          await collection.save();
          return collection;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Collection not found");
      }
    },
  },
};
