
const graphql = require("graphql");
const _ = require("lodash");
const { countries } = require("./country");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList } = graphql;
const CountryType = new GraphQLObjectType({
  name: "Country",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    capital: { type: GraphQLString },
  }),
});
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    country: {
      type: CountryType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(countries, { id: args.id });
      },
    },
    countries: {
      type: new GraphQLList(CountryType),
      resolve(parent, args) {
        return countries;
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
});