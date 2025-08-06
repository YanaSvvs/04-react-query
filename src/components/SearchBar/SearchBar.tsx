import React from 'react';
import { toast } from 'react-hot-toast';
import './SearchBar.module.css';

export interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('search') as string;

    if (query.trim() === '') {
      toast.error('Please enter your search query.');
      return;
    }
    onSubmit(query);
  };

  return (
    <form onSubmit={handleSearch} className='search-form'>
      <input
        type="text"
        name="search"
        placeholder="Search movies..."
        className='search-input'
      />
      <button type="submit" className='search-button'>
        Search
      </button>
    </form>
  );
}