import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Banner from "./Banner";
import logo from "../images/logo.png";
import MovieList from "./MovieList";

function MainPage() {
  const [movie, setMovie] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [dramaMovies, setDramaMovies] = useState([]);
  const [completed, setCompleted] = useState(undefined);
  const [loading, setLoading] = useState(undefined);

  async function fetchActionMovies() {
    const res = await fetch("http://localhost:8080/api/movie/category/action");
    res.json().then((res) => setActionMovies(res.data));
  }
  async function fetchDramaMovies() {
    const res = await fetch("http://localhost:8080/api/movie/category/drama");
    res.json().then((res) => setDramaMovies(res.data));
  }
  async function fetchMovie() {
    const res = await fetch("http://localhost:8080/api/movie/banner");
    res.json().then((res) => setMovie(res.data));
  }

  useEffect(() => {
    setTimeout(() => {
      fetchMovie();
      fetchActionMovies();
      fetchDramaMovies();
      setLoading(true);
      setTimeout(() => {
        setCompleted(true);
      }, 1000);
    }, 2000);
  }, []);
  return (
    <div>
      {!completed ? (
        <div className="preloader">
          {!loading ? (
            <div className="spinner">
              <div className="half_spinner"></div>
            </div>
          ) : (
            <div className="completed">
              <span>
                <img src={logo} />
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="main">
          <Header />
          <Banner data={movie} />
          <MovieList cat1={actionMovies} cat2={dramaMovies} />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default MainPage;
