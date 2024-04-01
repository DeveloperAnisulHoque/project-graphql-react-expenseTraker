import { users } from "../dummyData/data.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
  Mutation: {
    singUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;
        if (!username || !name || !password || !gender) {
          throw new Error("All fields are required");
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("All fields are required");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = await User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture: gender == "mail" ? boyProfilePic : girlProfilePic,
        });
        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (error) {
        console.error("Error in signUp : ", error);
        throw new Error(err.message || "Internal server error");
      }
    },
    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        const { user } = await constext.authenticate("graphql-local", {
          username,
          password,
        });
        await context.login(user);
        return user;
      } catch (error) {
        console.error("Error in login : ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    logout: async (_, context) => {
      try {
        await constext.logout();
        req.session.destroy((err) => {
          if (err) throw err;
        });
        res.clearCookie("connect.sid");
        return { message: "Logout successfully" };
      } catch (error) {
        console.error("Error in logout : ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
  Query: {
    authUser: async (_, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (error) {
        console.error("Error in authUser : ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    user: async (_, { userId }, context) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (error) {
        console.error("Error in user query : ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
};

export default userResolver;
