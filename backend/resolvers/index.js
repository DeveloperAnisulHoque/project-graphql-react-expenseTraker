import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user.resolver.js";
import transctionResolver from "./transction.resolver.js";

const mergedResolvers = mergeResolvers([userResolver, transctionResolver]);

export default mergedResolvers;
