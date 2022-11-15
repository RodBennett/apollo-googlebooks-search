// import AuthenticationError npm
const { AuthenticationError } = require('apollo-server-express');
//import User from /models/User
const { User } = require('../models');

// imported from /utils/auth.js
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },

        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId})

        }
    }
}