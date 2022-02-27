const express = require('express');
const MovieCtrl = require('../controllers/controller');
const router = express.Router();

//create
router.post('/movie', MovieCtrl.createMovie);
//get all
router.get('/movie', MovieCtrl.getAllMovies);
//get a random movie
router.get('/movie/banner', MovieCtrl.getArandomMovie);
//get all by category
router.get('/movie/category/:cat', MovieCtrl.getAllMoviesByCategory);
//get by id
router.get('/movie/:id', MovieCtrl.getMovieById);
//update
router.put('/movie/:id', MovieCtrl.updateMovie);
//delete
router.delete('/movie/:id', MovieCtrl.deleteMovie);


module.exports = router;

