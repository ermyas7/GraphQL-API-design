const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema,
    stripIgnoredCharacters
} = require('graphql');



const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        flight_number: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
        date_local: {
            type: GraphQLString
        },
        success: {
            type: GraphQLBoolean
        },
        rocket: {
            type: GraphQLString
        }
    })
});

const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        type: {
            type: GraphQLString
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        launches: {
            type: GraphQLList(LaunchType),
            async resolve() {
                const res = await axios.get('https://api.spacexdata.com/v4/launches')
                return res.data;
            },
        },
        launch: {
            type: LaunchType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            async resolve(parent, args) {
                const res = await axios.get(`https://api.spacexdata.com/v4/launches/${args.id}`)
                return res.data;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});