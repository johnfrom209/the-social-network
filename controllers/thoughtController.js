const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

// const formatDate = async (thought) => {

//     Thought.aggregate([
//         { $match: { _id: ObjectId(thought) } },
//         { $unwind: '$thought' },
//     ])
//         .then((date => {
//             console.log(date);
//             return date; //this is the object found by the id
//             // return `${new Date(date.createdAt).getMonth() + 1}/${new Date(date.createdAt).getDate()}/${new Date(date.createdAt).getFullYear()
//             //     }`;
//         }))

// }
module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err))
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('__v')//??
            .then(async (thought) => {
                !thought
                    ? res.status(404).json({ message: 'Thought not found' })
                    : res.json({
                        thought,
                        // date: await formatDate(thought)
                        // text: thought.thoughtText,
                    })
            })
    },

    createThought(req, res) {
        // how to set the user?
        // req.params.userId
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                )
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Post created, but no user found with that ID' })
                    : res.json('Created the Thought'))
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Thought not found, nothing deleted' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Thought not found, could not update' })
                    : res.json(thought))
    },

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body.thoughtText } },
            { runValidators: true, new: true }
        )
            .then((reaction) =>
                !reaction
                    ? res.status(404).json({ message: 'Thought not found' })
                    : res.json(reaction)
            )
            .catch((err) => res.status(500).json(err));
    },

    delReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.params.reactionId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Thought not found' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    }
}