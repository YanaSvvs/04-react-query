import axios from 'axios';
import type { Movie } from '../types/movie';

export interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (query: string, page: number = 1): Promise<FetchMoviesResponse> => {
  const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;

  if (!tmdbToken) {
    throw new Error("TMDB token is not configured.");
  }

  try {
    const response = await axios.get<FetchMoviesResponse>(`/api/movies`, {
      params: { 
        query, 
        page 
      },
      headers: {
        Authorization: `Bearer ${tmdbToken}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in fetchMovies (client-side):", error);
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data?.error;
      const status = error.response?.status;

      if (status === 401) {
        throw new Error(`Authentication failed. Please check your VITE_TMDB_TOKEN and server configuration.`);
      } else if (status === 400) {
        throw new Error(`Invalid request: ${apiError || 'Query missing.'}`);
      } else if (status === 500) {
        throw new Error(`Server error: ${apiError || 'Please try again later.'}`);
      }
      throw new Error(`Failed to fetch movies: ${apiError || error.message || 'Unknown error.'}`);
    } else {
      throw new Error('An unexpected error occurred while fetching movies.');
    }
  }
};