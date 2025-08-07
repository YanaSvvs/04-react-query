
import React, { useRef } from 'react';
import { toast } from 'react-hot-toast';
import './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = (formData: FormData) => {
    const query = formData.get('query') as string;
    if (query.trim() === '') {
      toast.error('Please enter a search query.');
      return;
    }
    onSubmit(query);
    formRef.current?.reset();
  };

  return (
    <form ref={formRef} action={handleAction}>
      <input
        type="text"
        name="query"
        placeholder="Search movies..."
        aria-label="Search movies"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;