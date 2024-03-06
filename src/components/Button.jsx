/**
 * Button component
 */

const Button = ({ onFeaturedClick, onJustAnnouncedClick, onThisWeekendClick }) => {
    return (
        <div className="buttons-container">
            {/* TODO: the onClick funcs are just placeholders for now, will have to figure it out later */}
            <button className="button" onClick={onFeaturedClick}>Featured Events</button>
            <button className="button" onClick={onJustAnnouncedClick}>Just Announced</button>
            <button className="button" onClick={onThisWeekendClick}>This Weekend</button>
        </div>
    );
};

export default Button