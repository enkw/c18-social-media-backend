const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUserById,
  updateUserById,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users (Get or post users)
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId (Get a specific user, update a specific user, delete a specific user)
router.route('/:userId').get(getSingleUser).put(updateUserById).delete(deleteUserById);

// /api/users/:userId/friends (Add friend)
router.route('/:userId/friends').post(addFriend);

// /api/users/:userId/friends/:friendId (Delete friend)
router.route('./:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
