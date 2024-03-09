/**
 * SearchInput - A component that renders a text input field for searches with a "Go!" button.
 *
 * This component provides a user interface for entering search queries (city names) and
 * submitting them. The search is executed either by pressing the "Enter" key
 * while focused on the text input or by clicking the "Go!" button.
 *
 * Props:
 * - onSearch: A callback function that is called when the user submits a search query.
 *             It receives the search query string as its only argument.
 *
 * Example Usage:
 * <SearchInput onSearch={(query) => handleSearch(query)} />
 *
 * Where `handleSearch` is a function defined in the parent component that processes the query.
 */

import Button from "./Button"

const SearchInput = ({ onSearch }) => {
    return (
        <>
            <input
                type="text"
                className="search-input"
                placeholder="Search by city"
                onKeyDown={(e) => e.key === "Enter" && onSearch(e.target.value)}
            />
            <Button onClickFunc={() => onSearch(document.querySelector('.search-input').value)}
                    buttonText={"Go!"}/>
        </>
    );
};

export default SearchInput