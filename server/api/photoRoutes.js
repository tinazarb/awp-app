const router = require('express').Router();
const { Photo } = require('../db/models');
module.exports = router;

console.log('HITTING PHOTO ROUTES');

router.get('/', async (req, res, next) => {
  try {
    const allPhotos = await Photo.findAll({ order: [['id', 'ASC']] });
    console.log('ALL PHOTOS DATA', allPhotos);
    res.json(allPhotos);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const singlePhoto = await Photo.findByPk(req.params.id);
    res.json(singlePhoto);
  } catch (err) {
    next(err);
  }
});
