const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


const thought = async (userId) =>
    User.aggregate([
        { $match: { _id: ObjectId(userId) } },
        {
            $unwind: '$thoughts'
        },
        {
            $group: {
                _id: ObjectId(userId)
            }
        }
    ]);

// const friend = async (userId) =>
//     User.aggregate([
//         { $match: { _id: ObjectId(userId) } },
//         {
//             $group: {
//                 _id: ObjectId(userId),
//                 friends: {}
//             }
//         }
//     ])



module.exports = {
    // get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },

    // get one user by id
    // return all thought by the user
    getUserId(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('__v')//??
            .then(async (user) => {
                !user
                    ? res.status(404).json({ message: 'User not found' })
                    : res.json({
                        user,
                        thought: await thought(req.params.userId),
                        // friends: await friend(req.params.userId)
                    })
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // updateUser(req, res) {
    //     User.findOneAndUpdate({ _id: req.params.userId },
    //         { $set: req.body },
    //         { runValidators: true, new: true })
    //         .then((user) =>
    //             !user
    //                 ? res.status(404).json({ message: 'User not found, could not update' })
    //                 : res.json(user))
    // },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User not found, nothing deleted' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    }
};