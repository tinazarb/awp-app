const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
});


router.get('/:userId/cart', async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      include: [{ model: Product }, { model: User }],
      where: { userId: req.params.userId, orderId: null },
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});



router.delete('/:userId/cart/:productId', async (req, res, next) => {
  try {
    await Cart.destroy({
      where: {
        id: req.params.productId,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
