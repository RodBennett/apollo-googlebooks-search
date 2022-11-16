// import AuthenticationError npm
const { AuthenticationError } = require('apollo-server-express');
//import User from /models/User
const { User, Book } = require('../models');

// imported from /utils/auth.js
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },

        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId})
        },

        me: async (parent, args, context ) => {
            if(context.user) {
                return User.findOne({ _id: context.user._id }).populate('books');       
            }
            throw new AuthenticationError('Please login to view your books!');
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user }
        },
        login: async (parent, {email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Username and password do not match, try again');
            }

           const correctPw = await user.isCorrectPassword(password)

           if (!correctPw) {
            throw new AuthenticationError('Username and password do not match, try again')
           }

           const token = signToken(user)
           return { token, user }
        },
        addBook: async (parent, { })
    }
}