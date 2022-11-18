import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($author: ID!, $title: String!, $description: String!, $bookId: String!, $image: String!, $link: String!) {
        saveBook(author: $author, title: $title, description: $description, bookId: $bookId. image: $image, link: $link) {
            user {
                _id
                savedBooks
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($author: ID!, $title: String!, $description: String!, $bookId: String!, $image: String!, $link: String!) {
        removeBook(author: $author, title: $title, description: $description, bookId: $bookId. image: $image, link: $link) {
            user {
                _id
                savedBooks
            }
        }
    }
`;







