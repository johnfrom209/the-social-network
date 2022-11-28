const router = require('express').Router();

const {
    getUsers,
    getUserId,
    createUser,
    deleteUser
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

//  /api/users/:userId
router.route('/:userId').get(getUserId).delete(deleteUser);

//  /api/users/userId/thoughts
// router.route('/:userId/thoughts').get()


module.exports = router;

