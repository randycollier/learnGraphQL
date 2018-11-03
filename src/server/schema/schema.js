const graphql = require('graphql');
const axios = require('axios');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;
const JSON_SERVER = "http://localhost:3000";
const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString},
        description: { type: GraphQLString},
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return axios.get(`${JSON_SERVER}/companies/${parentValue.id}/users`)
                .then((response)=>response.data)
                .catch(error=>{console.log(error)})
            }
        }
    })
})


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString},
        age: { type: GraphQLInt}
        ,
        company: {
            type: CompanyType,
            resolve(parentValue, args) {
                return axios.get(`${JSON_SERVER}/companies/${parentValue.companyId}`)
                .then((response)=>response.data)
                .catch(error=>{console.log(error)})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`${JSON_SERVER}/users/${args.id}`)
                .then((response)=>response.data)
                .catch(error=>{console.log(error)})
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`${JSON_SERVER}/companies/${args.id}`)
                .then(response => response.data)
                .catch(error=>{console.log(error)})
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                companyId: { type: GraphQLString }
            },
            resolve(parentValue, { firstName, age}) {
                return axios.post(`${JSON_SERVER}/users`,{ firstName, age })
                .then(response => response.data)
                .catch(error=>(console.log(error)))
            }
        },
        updateUser: {
            type: UserType,
            args: { 
                id: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: GraphQLString },
                age: { type: GraphQLInt },
                companyId: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                return axios.patch(`${JSON_SERVER}/users/${args.id}`, args)
                .then(response => response.data)
                .catch(error=>(console.log(error)))
            }
        },
        deleteUser: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parentValue, args) {
                return axios.delete(`${JSON_SERVER}/users/${args.id}`)
                .then(response => response.data)
                .catch(error=>(console.log(error)))
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})