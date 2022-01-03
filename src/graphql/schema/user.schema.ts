import { gql } from 'apollo-server-express';

export const User = gql`
    type User {
        id: ID!
        email: String!
        password: String!
        name: String!
    }

    type Token {
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
`;