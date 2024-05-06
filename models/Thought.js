const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlenth: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
    },
    username: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },

    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(() => {
  return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
