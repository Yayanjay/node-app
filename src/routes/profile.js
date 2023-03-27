const express = require('express');
const router = express.Router();
const ctrlProfile = require('../controllers/profile')

router.get('/commit', ctrlProfile.commit);
router.get('/drop', ctrlProfile.drop);

router.get('/', ctrlProfile.getAll);
router.get('/:id', ctrlProfile.getById);
router.post('/', ctrlProfile.addProfile)
router.put('/:id', ctrlProfile.updateProfile)

module.exports = router