const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find({}).populate({
        path: 'reactions',
        select: '-__v',
        options: { sort: { 'createdAt': -1 } },
      }).select('-__v').sort({ createdAt: -1 });

      res.status(200).json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).populate({
        path: 'reactions',
        select: '-__v',
        options: { sort: { 'createdAt': -1 } },
      }).select('-__v').sort({ createdAt: -1 });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID found.' })
      }

      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findByIdAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true },
      )

      if (!user) {
        res.status(404).json({ message: 'No user with that ID found.'});
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID found.' });
      }

      const user = await User.findByIdAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thought: req.params.thoughtId } },
        { new: true },
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID found.' });
      }

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true },
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID found.' })
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a reaction
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true },
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID found.'})
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a reaction
  async removeFriend(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: req.params.reactionId } },
        {
          new: true,
        },
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID found.'})
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
}