/**
 * Searching component
 */

const SearchInput = ({ onSearch }) => {
    return (
        <div className="button-container">
            <input
                type="text"
                className="search-input"
                placeholder="Search by city"
                onKeyDown={(e) => e.key === "Enter" && onSearch(e.target.value)}
            />
            <button className="button" onClick={() => onSearch(document.querySelector('.search-input').value)}>
                Go!
            </button>
        </div>
    );
};

export default SearchInput