
import React from 'react';
import './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination-container">
      <button 
        className="pagination-button"
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        Previous
      </button>

      {pages.map(pageNumber => (
        <button
          key={pageNumber}
          className={`pagination-button ${pageNumber === currentPage ? 'active' : ''}`}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className="pagination-button"
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;