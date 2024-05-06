const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

// /api/thoughts (Get thoughts and post a new thought)
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId (Gets a single thought, updates a thought, deletes a thought)
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions (Create a reaction)
router.route('/:thoughtId/reactions').post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId (Delete a reaction)
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
