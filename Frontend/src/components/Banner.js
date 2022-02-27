import React,{useState, useEffect} from 'react'
import data from '../data'
import Modal from './Modal';

function Banner(props) {
    const [showModal, setShowModal] = useState(false);
    const [movie, setMovie] = useState([]);
    const [moviesdata, setMoviesdata] = useState([]);

    const moreInfo= () => setShowModal(true);
    const hideInfo =()=> setShowModal(false);

    
    // async function fetchMovie(){
    //     const res = await fetch("http://localhost:8080/api/movie/banner");
    //     res.json().then(res => setMovie(res.data));
    // };
    // const movie_cat = movie.category;
    async function fetchMovies(){
        const res = await fetch("http://localhost:8080/api/movie");
        res.json().then(res => setMoviesdata(res.data));
    };
    
    useEffect(() => {
        setMovie(props.data)
        fetchMovies()
    },[]);
    

    return (
        <div>
            {showModal ?
                <Modal displayModal={showModal} closeModal={hideInfo} mainData={moviesdata} bannerData={movie} />
            : null}
            <div className="banner_main">
                
                <img className="banner_header_img" src={movie.bannerImage} alt={movie.title} />
                <div className="title">
                    <h1>{movie.title}</h1>
                    <h4>{movie.synopsis}</h4>
                    <div className="btn_div">
                        <button className="btn-1" onClick={()=> window.location.href = movie.video}>▶️ Play</button>
                        <button className="btn-2" onClick={() => moreInfo()}>❕More Info</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
