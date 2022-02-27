import React,{useState, useEffect} from 'react'

function Preloader() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(undefined);
    const [completed, setCompleted] = useState(undefined);

    async function fetchActionMovies(){
        const res = await fetch("http://localhost:8080/api/movie/category/action");
        res.json().then(res => setData(res.data));
        setLoading(true);

        setTimeout(() => {
            setCompleted(true);
        }, 1000);
    };

    useEffect(() => {
        setTimeout(() => {
            fetchActionMovies();
        }, 2000);
    }, []);
    return (
        <div className="preloader">
            {!completed ? (
                <div>
                    {!loading ? (
                        <div className="spinner">
                            <span>Loading...</span>
                            <div className="half_spinner"></div>
                        </div>
                    ):
                    <div className="completed">
                        &#x2713;  
                    </div>}
                </div>
            ): <div>
                    {data.map(data => (
                        <p>{data.title}</p>
                    ))}
                </div>}
        </div>
    )
}

export default Preloader
