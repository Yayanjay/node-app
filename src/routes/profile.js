const express = require('express');
const router = express.Router();
const ctrlProfile = require('../controllers/profile')
// const ctrlMahasiswa = require('../controllers/mahasiswa')

router.get('/commit', ctrlProfile.commit);
router.get('/drop', ctrlProfile.drop);

router.get('/', ctrlProfile.getAll);
router.get('/:id', ctrlProfile.getById);
router.post('/', ctrlProfile.addProfile)
// router.put('/:id', ctrlMahasiswa.updateMahasiswa)
// router.delete('/:id', ctrlMahasiswa.deleteMahasiswa)

// router.get('/avg/:id', ctrlMahasiswa.avgScoreMahasiswa);

module.exports = router