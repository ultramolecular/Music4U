/**
 * Button component
 */

const Button = ({ onClickFunc, buttonText}) => {
    return (
        <>
            <button className="button" onClick={onClickFunc}>{buttonText}</button>
        </>
    );
};

export default Button