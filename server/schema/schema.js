const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

//Test data
let users = [
  {
    name: "Dylan Whitlock",
    age: "24",
    id: "1",
    accountId: "1"
  },
  {
    name: "Josie Hillfinger",
    age: "31",
    id: "2",
    accountId: "2"
  },
  {
    name: "Kenny Whitlock",
    age: "55",
    id: "3",
    accountId: "3"
  }
];

let accounts = [
  {
    name: "Facebook",
    num: "23424",
    id: "1"
  },
  {
    name: "Google",
    num: "19004",
    id: "2"
  },
  {
    name: "Apple",
    num: "67910",
    id: "3"
  },
  {
    name: "Facebook",
    num: "09999",
    id: "3"
  },
  {
    name: "Google",
    num: "88888",
    id: "1"
  },
  {
    name: "Apple",
    num: "77777",
    id: "2"
  }
];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLString },
    accounts: {
      type: new GraphQLList(AccountType),
      resolve(parent, args) {
        return _.filter(accounts, { id: parent.id });
      }
    }
  })
});
// Fields are wrapped in a function because they are only excuted after all variables/types are initialized
const AccountType = new GraphQLObjectType({
  name: "Account",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    num: { type: GraphQLInt },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(users, { accountId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return _.find(users, { id: args.id });
      }
    },
    account: {
      type: AccountType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return _.find(accounts, { id: args.id });
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return users;
      }
    },
    accounts: {
      type: new GraphQLList(AccountType),
      resolve(parent, args) {
        return accounts;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
