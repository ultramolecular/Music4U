/**
 * Button component
 */

const Button = ({ onFeaturedClick, onJustAnnouncedClick, onThisWeekendClick }) => {
    return (
        <div className="button-container">
            {/* TODO: Refactor this entire component such that there is only one button and can 
                      pass in any function for the onClick; will need to figure out how to align
                      the three buttons side-by-side; probably wrap it in this div but in App.jsx */}
            <button className="button" onClick={onFeaturedClick}>Featured Events</button>
            <button className="button" onClick={onJustAnnouncedClick}>Just Announced</button>
            <button className="button" onClick={onThisWeekendClick}>This Weekend</button>
        </div>
    );
};

export default Button