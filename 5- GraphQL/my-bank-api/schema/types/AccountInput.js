import { GraphQLInputObjectType, GraphQLString, GraphQLInt, GraphQLFloat } from "graphql";

const AccountInput = new GraphQLInputObjectType({
    name: "AccountInput",
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
        balance: {
            type: GraphQLFloat
        }
    })
});

export default AccountInput;