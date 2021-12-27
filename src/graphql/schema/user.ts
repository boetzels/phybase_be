const User = `
    type User {
        id: ID!
        email: String!
        password: String!
        name: String!
    }

    type token {
        jwt: ID!
    }

    type Query {
        getUser(id: ID!): User
        getUsers: [User]
    }

    type Mutation {
        signup(
            email: String!
            password: String!
            name: String!
        ): String!,
        signin(
            email: String!
            password: String!
        ): Token!,
}
`

module.exports = User;