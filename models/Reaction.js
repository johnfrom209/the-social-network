const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            // mongoose objectId
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 200
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            // use a getter to format the timestamp on query
        }
    }
)