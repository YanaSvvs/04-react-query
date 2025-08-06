
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'; 
import ReactPaginate from 'react-paginate'; 
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

import { Toaster } from 'react-hot-toast';
import css from './App.module.css';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, error } = useQuery({
    
    queryKey: ['movies', query, page], 
    queryFn: () => fetchMovies(query, page), 
    enabled: !!query, 
    placeholderData: (previousData) => previousData, 
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const movies = data?.results || [];
  const totalPages = data?.total_pages || 0;

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error.message} />}

      {movies.length > 0 && !isLoading && (
        <>
          <MovieGrid movies={movies} onSelect={openModal} />
          {/* Рендеримо пагінацію, якщо сторінок більше однієї */}
          {totalPages > 1 && (
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              forcePage={page - 1} 
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}

      <Toaster position="top-right" />
    </div>
  );
}

export default App;