const router = require('express').Router();
const { Favorites, Photo } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const favorites = await Favorites.findAll({
      include: [{ model: Photo }],
      where: {
        userId: null,
        orderId: null,
      },
    });

    res.json(favorites);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    let favoritesItem = await Favorites.findOne({
      where: {
        productId: id,
        userId: null,
        orderId: null,
      },
    });
    res.json(favoritesItem);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const favoritesItemId = req.params.id;

    let favoritesItem = await Favorites.findOne({
      where: {
        id: favoritesItemId,
        userId: null,
      },
    });
    res.sendStatus(favoritesItem);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Favorites.destroy({
      where: {
        id: req.params.id,
        userId: null,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
