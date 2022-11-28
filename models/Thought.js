const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 8,
            maxLength: 200
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            // getter to format the timestamp on query
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: {
                reactionCount: {
                    get() {
                        return reactions.length
                    }
                }
            }
        }
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;