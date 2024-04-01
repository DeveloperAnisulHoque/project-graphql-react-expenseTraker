import { users } from "../dummyData/data.js";
import Transaction from "../models/transaction.model.js";

const transctionResolver = {
  Query: {
    transactions: async (_, context) => {
      try {
        if (!context.geUser()) throw new Error("Unauthorized");

        const userId = await context.getUser()._id;
        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (error) {
        console.error("Error in getting transctions : ", error);
        throw new Error(err.message || "Internal server error");
      }
    },
    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (error) {
        console.error("Error in getting single transction : ", error);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (error) {
        console.error("Error in create  transction : ", error);
        throw new Error(err.message || "Internal server error");
      }
    },
    updateTransaction: async (_, { input }, context) => {
      try {
        const updateTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );

        return updateTransaction;
      } catch (error) {
        console.error("Error in update  transction : ", error);
        throw new Error(err.message || "Internal server error");
      }
    },
    deleteTransaction: async (_, args, context) => {
      try {
        const deleteTransaction = await Transaction.findByIdAndDelete(
          input.transactionId
        );

        return deleteTransaction;
      } catch (error) {
        console.error("Error in delete  transction : ", error);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
};

export default transctionResolver;
