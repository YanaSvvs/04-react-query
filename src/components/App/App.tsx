import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Pagination from '../Pagination';
import { fetchMovies } from '../../services/movieService'; 
import type { Movie } from '../../types/movie'; 
import './App.module.css';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess, error, isFetching } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    if (isSuccess && data?.results?.length === 0 && query) {
      toast.error('No movies found for your request.');
    }
  }, [isSuccess, data, query]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const movies = data?.results || [];

  return (
    <div className='app'>
      <h1>Movie Search</h1>
      <SearchBar onSubmit={handleSearch} />
      {isError && <ErrorMessage message={error.message} />}
      {(isLoading || isFetching) && <Loader />}
      {isSuccess && movies.length > 0 && <MovieGrid movies={movies} onMovieSelect={setSelectedMovie} />}
      {isSuccess && movies.length === 0 && query && !isLoading && (
        <p className='no-movies-message'>No movies found for your request.</p>
      )}
      {isSuccess && movies.length > 0 && <Pagination 
        currentPage={page} 
        totalPages={data?.total_pages || 0} 
        onPageChange={setPage} 
      />}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
  );
}

export default App;
