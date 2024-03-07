/**
 * Searching component
 */
import Button from "./Button"

const SearchInput = ({ onSearch }) => {
    return (
        <div className="button-container">
            <input
                type="text"
                className="search-input"
                placeholder="Search by city"
                onKeyDown={(e) => e.key === "Enter" && onSearch(e.target.value)}
            />
            <Button onClickFunc={() => onSearch(document.querySelector('.search-input').value)}
                    buttonText={"Go!"}/>
        </div>
    );
};

export default SearchInput