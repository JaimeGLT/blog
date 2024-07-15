const verifyToken = require('../middlewares/verifyToken');
const schema = require('../middlewares/schema');
const { 
    addFavorite,
    getFavorites,
    getFavorite,
    deleteFavorite
 } = require('../controllers/favorites.controller');

const favoriteRouter = require('express').Router();

favoriteRouter.post('/favorite/:id', verifyToken, addFavorite);
favoriteRouter.get('/favorites', verifyToken, getFavorites);
favoriteRouter.get('/favorite/:id', verifyToken, getFavorite);
favoriteRouter.delete('/favorite/:id', verifyToken, deleteFavorite);

module.exports = favoriteRouter;