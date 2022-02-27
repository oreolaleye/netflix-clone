import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer'
import FileUpload from './FileUpload';
import axios from 'axios';

function CreateMovieList() {
    const [title, setTitle] = useState();
    const [synopsis, setSynopsis] = useState();
    const [cast, setCast] = useState();
    const [genre, setGenre] = useState();
    const [category, setCategory] = useState();
    const [rating, setRating] = useState();
    const [year, setYear] = useState();
    const [duration, setDuration] = useState();
    const [smallImage, setSmallImage] = useState();
    const [bannerImage, setBannerImage] = useState();
    const [video, setVideo] = useState();


    const handleTitle = (event) => setTitle(event.target.value);
    const handleSynopsis = (event) => setSynopsis(event.target.value);
    const handleCast = (event) => setCast(event.target.value);
    const handleGenre = (event) => setGenre(event.target.value);
    const handleCategory = (event) => setCategory(event.target.value);
    const handleRating = (event) => setRating(event.target.value);
    const handleYear = (event) => setYear(event.target.value);
    const handleDuration = (event) => setDuration(event.target.value);
    const handleSmallImage = (event) => setSmallImage(event.target.value);
    const handleBannerImage = (event) => setBannerImage(event.target.value);
    const handleVideo = (event) => setVideo(event.target.value);

    

    const data = {title, synopsis, cast, genre, category, rating, year, duration, smallImage, bannerImage, video};

    const createMovie = async e => {
      e.preventDefault();
	  window.alert(smallImage, bannerImage, video);
      try{
        const res = await axios.post('http://localhost:8080/api/movie', data)
        window.alert(res.message)
      }catch(err){
        console.log(err)
      }
    }


    return (
        <div>
          <div className="create_header_div">
            <Header />
          </div>
          <div className="create_movie">
            <div className="form_div">
            	<div className="form_div_inner">
            		<div className="input_div mr-10">
                		<label>Title: </label>
                		<input name="title" type="text" value={title} required onChange={handleTitle} />
                	</div>
                	<div className="input_div">
                  		<label>Cast: </label>
                  		<input name="cast" type="text" value={cast} onChange={handleCast} />
                	</div>
              	</div>

            	<div className="input_div">
            		<label>Synopsis: </label>
                	<textarea name="synposis" value={synopsis} onChange={handleSynopsis} />
              	</div>

              
			<div className="form_div_inner">
				<div className="input_div mr-10">
					<label>Genre: </label>
					<input name="genre" type="text" value={genre} onChange={handleGenre} />
				</div>
				<div className="input_div mr-10">
					<label>Category: </label>
					<input name="category" type="text" value={category} onChange={handleCategory} />
				</div>
				<div className="input_div">
					<label>Rating: </label>
					<input name="rating" type="text" value={rating} onChange={handleRating} />
				</div>
			</div>

            <div className="form_div_inner">
				<div className="input_div mr-10">
					<label>Year: </label>
					<input name="year" type="number" value={year} onChange={handleYear} />
				</div>
				<div className="input_div">
					<label>Duration: </label>
					<input name="duration" type="text" value={duration} onChange={handleDuration} />
				</div>
			</div>
              

              

			<div className="form_div_inner">
				<div className="input_div mr-10">
					<label>Small Image: </label>
					<input name="smallImage" type="text" value={smallImage} onChange={handleSmallImage} />
				</div>
				<div className="input_div mr-10">
				<label>Banner Image: </label>
					<input name="bannerImage" type="text" value={bannerImage} onChange={handleBannerImage} />
				</div>
				<div className="input_div">
				<label>Video: </label>
					<input name="video" type="text" value={video} onChange={handleVideo} />
				</div>
			</div>
             
              <div className="form_btn_div">
                <button className="btn_1" onClick={createMovie}>Create Movie</button>
                <button className="btn_2">Cancel</button>
              </div>
            </div>
          </div>  
          <Footer />
        </div>
    )
}

export default CreateMovieList
