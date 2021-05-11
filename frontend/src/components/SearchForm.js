const SearchForm = () => {
  return (
    <form className="navbar-search-form">
      <input
        type="text"
        className="navbar-search-input"
        placeholder="Search..."
      />
      <button type="submit" className="navbar-search-button">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
