import {GraphQLList, GraphQLInt} from "graphql";
import Account from "../types/Account.js";
import AccountResolver from "../resolvers/account.resolver.js";

const accountQueries = {
    getAccounts: {
        type: new GraphQLList(Account),
        resolve: () => AccountResolver.getAccounts()
    },
    getAccount: {
        type: Account,
        args: {
            id: {
                name: "id",
                type: GraphQLInt
            }
        },
        resolve: (_, args) => AccountResolver.getAccount(args.id)
    }
};

export default accountQueries;