const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


const friendCount = async () =>
    // aggregate grabs everything inside of User
    // but I only want one
    User.findOne()
        .count('friends')
        .then((numberOfFriends) => numberOfFriends)

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

const friend = async (userId) =>
    User.aggregate([
        { $match: { _id: ObjectId(userId) } },
        { $unwind: '$friends' },
        {
            $group: {
                _id: ObjectId(userId),
                // friendCount: { $sum: '$friends' }
            }
        }
    ])

module.exports = {
    // get all users
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                // const friendCount = users.friends.length;
                const userObj = {
                    users,
                    // friendCount
                    // friiiendCount: await friendCount(req.params.userId)
                };
                return res.json(userObj);
            })
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
                        friends: await friend(req.params.userId),
                        // friendCount: friends.length
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

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User not found, could not update' })
                    : res.json(user))
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User not found, nothing deleted' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    updateFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User not found, nothing deleted' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));

    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User not found, nothing deleted' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    }
};