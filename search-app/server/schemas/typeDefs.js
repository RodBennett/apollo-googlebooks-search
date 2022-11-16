const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
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
        link: Stirng!
        title: String!
    }

    type Query {
        
    }
`;

module.exports = typeDefs;
