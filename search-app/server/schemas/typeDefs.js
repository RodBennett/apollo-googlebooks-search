const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        bookCount: Int!
        savedBooks: [Book]!
    }

    type Author {
        _id: ID!
    }

    type Book {
        authors: [Author]!
        description: String!
        bookId: String!
        image: String!
        link: String!
        title: String!
    }

    type Query {
        me: User
    }
    type Mutation {
        login: (username: String!, email: String!, password: String!): Auth
        saveBook: (authors: ID!, description: String!, bookId: ID!, title: String!, image: String!, link: String!): User 
        removeBook: (bookId: ID!): User
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;
