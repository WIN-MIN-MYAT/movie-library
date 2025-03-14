import  {useEffect, useState} from 'react'
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import{useDebounce} from "react-use";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    }
}
const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
    useDebounce(() => setDebouncedSearchTerm(searchTerm),500,[searchTerm]);
    const fetchMovies = async (query='') => {
        setIsLoading(true);
        try{
            const endpoint= query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`: `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint,API_OPTIONS);
            if(!response.ok){
                throw Error("Failed to fetch movies.");
            }
            const movies = await response.json();
            console.log(movies);
            if(movies.response==='False'){
                setErrorMessage(movies.Error || "Failed to fetch movies" );
                setMovieList([]);
                return
            }
            setMovieList(movies.results ||[]);
        }catch (e) {
            console.error(e)
            setErrorMessage("Error fetching movies.")
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchMovies(debouncedSearchTerm)
    }, [debouncedSearchTerm]);
    return (
        <main>
            <div className="pattern"/>
            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="Hero Banner"/>
                    <h1>Find <span className='text-gradient'>Movies</span> You&#39;ll enjoy</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>
                <section className="all-movies">
                    <h2 className='mt-[20px]'>{searchTerm? searchTerm : 'All Movies'}</h2>
                    {isLoading ?(
                        <Spinner />
                    ):errorMessage ? (
                        <p className='text-red'>{errorMessage}</p>
                    ):(
                        <ul>{movieList.map((movie)=>(
                            <MovieCard key={movie.id} movie={movie}/>
                        ))}</ul>
                    )}
                </section>
            </div>
        </main>

    )
}
export default App
