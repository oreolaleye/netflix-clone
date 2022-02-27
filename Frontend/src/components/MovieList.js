import {React,useState,useEffect} from 'react'
import data from '../data'
import Modal from './Modal';

function MovieList(props) {
    const [moviesData, setMoviesData] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [dramaMovies, setDramaMovies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    
    const moreInfo= () => setShowModal(true);
    const hideInfo =()=> setShowModal(false);
    
    // async function fetchActionMovies(){
    //     const res = await fetch("http://localhost:8080/api/movie/category/action");
    //     res.json().then(res => setActionMovies(res.data));
    // };
    // async function fetchDramaMovies(){
    //     const res = await fetch("http://localhost:8080/api/movie/category/drama");
    //     res.json().then(res => setDramaMovies(res.data));
    // };
    async function fetchMovies(){
        const res = await fetch("http://localhost:8080/api/movie");
        res.json().then(res => setMoviesData(res.data));
    };

    useEffect(() => {
            // fetchActionMovies();
            // fetchDramaMovies();
            setActionMovies(props.cat1);
            setDramaMovies(props.cat2);
            fetchMovies();
    },[]);
    return (
        <div>
               <div className="div_card">
                   <h3>Action & Adventure</h3>
                   <div className="div_card_row">
                    <ul className="card_row">
                           {actionMovies.map(action => (
                               <a onClick={moreInfo}>
                                <li className="card_list">
                                    {showModal ?
                                        <Modal displayModal={showModal} closeModal={hideInfo} mainData={moviesData} bannerData={action} />
                                    : null}
                                    <div className="card">
                                        <img className="card_img" src={action.smallImage} alt="" />
                                    </div>
                                </li>
                                </a>
                            ))}
                        </ul>
                   </div>
            </div> 
               <div className="div_card">
                    <h3>Comedies</h3>
                     <div className="div_card_row">
                     <ul className="card_row">
                             {data.comedies.map(comedy => (
                                <li className="card_list">
                                    <div className="card">
                                        <img className="card_img" src={comedy.smallImage} alt="" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div> 
                <div className="div_card">
                    <h3>Drama</h3>
                    <div className="div_card_row">
                    <ul className="card_row">
                            {dramaMovies.map(drama => (
                                <li className="card_list">
                                    <div className="card">
                                        <img className="card_img" src={drama.smallImage} alt="" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div> 
            </div>
    )
}

export default MovieList
