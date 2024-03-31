import { users } from "../dummyData/data.js";

const userResolver = {
  Query: {
    users: () => {
      return users;
    },
    user(_, args, context) {
      return users.find((data) => data._id == args.userId);
    },
  },
  Mutation: {},
};

export default userResolver;
