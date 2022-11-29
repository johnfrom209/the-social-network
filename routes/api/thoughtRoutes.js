const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    createReaction,
    delReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

router.route('/:thoughtId/reactions').post(createReaction).delete(delReaction)

module.exports = router;
