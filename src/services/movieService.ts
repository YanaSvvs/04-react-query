import axios from 'axios';
import type { FetchMoviesResponse } from '../types/movie';

export const fetchMovies = async (query: string, page: number): Promise<FetchMoviesResponse> => {
  try {
   
    const response = await axios.get<FetchMoviesResponse>('/api/movies', {
      params: { 
        query,
        page 
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in fetchMovies (client-side):", error);
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data?.error;
      const status = error.response?.status;

      let errorMessage = `Failed to fetch movies: ${apiError || error.message || 'Unknown error.'}`;
      if (status === 401) {
        errorMessage = `Authentication failed. Please check your VITE_TMDB_TOKEN and server configuration.`;
      } else if (status === 400) {
        errorMessage = `Invalid request: ${apiError || 'Query missing.'}`;
      } else if (status === 500) {
        errorMessage = `Server error: ${apiError || 'Please try again later.'}`;
      }
      throw new Error(errorMessage);
    } else {
      throw new Error('An unexpected error occurred while fetching movies.');
    }
  }
};
