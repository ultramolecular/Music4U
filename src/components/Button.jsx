/**
 * Button - A reusable button component for triggering actions.
 *
 * This component renders a button element that executes a function when clicked.
 * The button's label and the action to be performed upon clicking (onClick event handler)
 * are passed as props.
 *
 * Props:
 * - onClickFunc (function): A callback function that is called when the button is clicked.
 * - buttonText (string): The text that will be displayed on the button. Allows the button
 *                        to be used in various contexts with appropriate labels.
 *
 * Example Usage:
 * <Button
 *   onClickFunc={() => console.log('Button was clicked')}
 *   buttonText="Click Me"
 * />
 */

const Button = ({ onClickFunc, buttonText}) => {
    return (
        <>
            <button className="button" onClick={onClickFunc}>{buttonText}</button>
        </>
    );
};

export default Button