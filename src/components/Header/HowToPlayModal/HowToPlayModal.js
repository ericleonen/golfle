import { useSelector } from 'react-redux';
import { selectIsHowToPlayModal } from '../../../features/appSlice';
import { CloseButton } from '../../utility/CloseButton/CloseButton';

import './HowToPlayModal.css';
import { CSSTransition } from 'react-transition-group';

export const HowToPlayModal = () => {
    const isHowToPlayModal = useSelector(selectIsHowToPlayModal);

    return (
        <CSSTransition in={isHowToPlayModal}
                       timeout={300}
                       classNames="fader"
                       unmountOnExit
        >
            <div className="HowToPlayModal">
                <CloseButton type="HowToPlay"/>
                <h3>Guess the mystery PGA tour golfer!</h3>
                <ul>
                    <li>You get eight guesses, try any PGA tour player with a Fedex Cup ranking!</li>
                    <li><span className="green">Green</span> in any column means a match!</li>
                    <li><span className="yellow">Yellow</span> in any column indicates this attribute is within 2 <em>(inches, years, positions)</em> of the mystery player</li>
                    <li>Arrows indicate this attribute is too high or too low for the mystery player <em>(up arrows for rankings means the mystery player is higher ranked)</em></li>
                </ul>
            </div>
        </CSSTransition>
    );
}