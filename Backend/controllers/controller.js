const Movie = require('../db/models/movie-model');
require("dotenv").config();
const cloudinary = require('cloudinary').v2;

console.log(cloudinary.config().cloud_name);

createMovie = async (req, res)=> {
    const body = req.body;
    if(!body){
        return res.status(400).json({success: false, error: "You must specify an movie"});
    }
    

    let smallImageUrl = "";
    await cloudinary.uploader.upload(body.smallImage, {
        resource_type: "image",
        public_id: `netflix-clone/images/${body.title}`,
        tags: "smallImages",
    }).then((result) => {
        console.log("success", JSON.stringify(result.url, null, 2))
        smallImageUrl = result.url;
    }).catch((err) => {
        console.log("error", JSON.stringify(err, null, 2))
   })

   let bannerImageUrl = "";
    await cloudinary.uploader.upload(body.bannerImage, {
        resource_type: "image",
        public_id: `netflix-clone/header-images/${body.title}`,
        transformation:{height:580, crop: "scale"},
        tags: "bannerImage",
    }).then((result) => {
        console.log("success", JSON.stringify(result.url, null, 2))
        bannerImageUrl = result.url;
    }).catch((err) => {
         console.log("error", JSON.stringify(err, null, 2))
    })

    let videoUrl = "";
    await cloudinary.uploader.upload(body.video, {
        resource_type: "video",
        public_id: `netflix-clone/videos/${body.title}`,
        chunk_size: 30000000,
        tags: "video",
    }).then((result) => {
        console.log("success", JSON.stringify(result.url, null, 2))
       videoUrl = result.url;
    }).catch((err) => {
        console.log("error", JSON.stringify(err, null, 2))
   })
    
    body.smallImage = smallImageUrl;
    body.bannerImage = bannerImageUrl;
    body.video = videoUrl;

    const movie = new Movie(body);

    if(!movie){
        return res.status(400).json({success: false, error: "Movie creation failed"});
    }

    movie.save().then(() => {
        console.log("movie uploaded")
        return res.status(201).json({
            success: true, 
            id: movie._id, 
            message: "Movie created"
        });
        
    }).catch(error => {
        return res.status(400).json({error, message: "Movie not created"});
    });
}
getAllMovies = async (req,res) => {
    Movie.find({}, (err, movies) =>{
        if(err){
            return res.status(400).json({success: false, error: err});
        }
        if(!movies.length){
            return res.status(404).json({success: false, error: "No albums found!"});
        }
        return res.status(200).json({success: true, data: movies});
    });
}

getArandomMovie = async (req,res) => {
    Movie.find({}, (err, movies) =>{
        const ran =() => {return Math.floor(Math.random() * (movies.length));}
        if(err){
            return res.status(400).json({success: false, error: err});
        }
        if(!movies.length){
            return res.status(404).json({success: false, error: "No albums found!"});
        }
        return res.status(200).json({success: true, data: movies[ran()]});
    });
}
getAllMoviesByCategory = async (req,res) => {
    Movie.find({"category": req.params.cat}, (err, movies) =>{
        if(err){
            return res.status(400).json({success: false, error: err});
        }
        if(!movies.length){
            return res.status(404).json({success: false, error: "No albums found!"});
        }
        return res.status(200).json({success: true, data: movies});
    });
}
getMovieById = async (req,res) => {
    Movie.findById(req.params.id, (err, movie) => {
        if(err){
            return res.status(400).json({success: false, error: err});
        }
        if(!movie){
            return res.status(404).json({success: false, error: "Movie not found!"});
        }
        return res.status(200).json({success: true, data: movie});
    })
}
updateMovie = async (req,res) => {
    const body = req.body;
    if(!body){
        return res.status(400).json({success: false, error: "You must provide some data to update"});
    }

    Movie.findOne({_id: req.params.id}, (err, movie) => {
        if(err){
            return res.status(400).json({success: false, error: err, message: "Movie item not found"});
        }
        if(!movie){
            return res.status(400).json({success: false, error: "Movie creation failed"});
        }
        // update the document with the json data that was passed in req.body
        movie.title = body.title;
        movie.synopsis = body.synopsis;
        movie.cast = body.cast;
        movie.genre = body.genre;
        movie.category = body.category;
        movie.rating = body.rating;
        movie.year = body.year;
        movie.duration = body.duration;
        movie.smallImage = body.smallImage;
        movie.bannerImage = body.bannerImage;
        movie.video = body.video;

        

        // save the updated object back to the database
        movie.save().then(()=>{
            return res.status(200).json({
                success: true,
                id: movie._id,
                message: "Movie updated"
            });
        }).catch(error =>{
            return res.status(404).json({error, message: "Movie update failed"})
        });
    });

}
deleteMovie = async (req, res) => {
    Movie.findByIdAndDelete({_id: req.params.id}, (err, movie) =>{
        if(err){
            return res.status(400).json({success: false, error: err});
        }
        if(!movie){
            return res.status(404).json({success: false, error: "Movie not found"});
        }
        return res.status(200).json({success: true, data: movie._id, message: "Movie deleted"});
    });
}

module.exports = {createMovie, getAllMovies,getArandomMovie,getAllMoviesByCategory, getMovieById, updateMovie, deleteMovie};