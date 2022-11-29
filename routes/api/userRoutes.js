const router = require('express').Router();

const {
    getUsers,
    getUserId,
    createUser,
    updateUser,
    deleteUser,
    updateFriend,
    deleteFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

//  /api/users/:userId
router.route('/:userId').get(getUserId).delete(deleteUser).put(updateUser);

//  /api/users/userId/thoughts
// router.route('/:userId/thoughts').get()

//  /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(updateFriend).delete(deleteFriend)


module.exports = router;

