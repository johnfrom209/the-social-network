const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: {
                friendCount: {
                    get() {
                        return friends.length
                    }
                }
            }
        }
    }
);

const User = model('user', userSchema);

module.exports = User;