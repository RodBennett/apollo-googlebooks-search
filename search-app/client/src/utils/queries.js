import { gql } from '@apollo/client';

export const GET_ME = gql`
query user {
    user {
        _id
        username
        email
        savedBooks {
            _id
            # question here ???
            authors {
                _id
            }
            description
            bookId
            image
            link
            title
        }
    }
}`;
