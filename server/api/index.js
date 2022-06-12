const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/photos', require('./photoRoutes'));
router.use('/favorites', require('./favoriteRoutes'));

console.log('HITTING API INDEX');

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
