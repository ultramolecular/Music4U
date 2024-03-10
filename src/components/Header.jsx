/**
 * Header - A visual component displaying the application's title "Music4U".
 *
 * This component renders the application's name in a stylized manner, using separate <span> elements to
 * highlight different parts of the name. It serves as the main header for the application, typically displayed
 * at the top of the UI. The "4" in "Music4U" is given a unique class for potential styling to distinguish it
 * from the rest of the text. This component is a key part of the application's branding and visual identity.
 *
 * Structure:
 * - The "Music", "4", and "U" parts of the title are wrapped in individual <span> elements to allow for
 *   specific styling. For example, the "4" could be styled differently to stand out.
 *
 * Example Usage:
 * <Header />
 */

import GuitarIcon from '../assets/guitar.svg'
import RockHandIcon from '../assets/rockHand.svg'

const Header = () => {
    return (
        <header className="header">
            <img src={GuitarIcon} alt="Guitar" className='header-icon' />
            <span>Music</span><span className="four">4</span><span>U</span>
            <img src={RockHandIcon} alt='Rock hand' className='header-icon' />
        </header>
    );
};

export default Header