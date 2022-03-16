import { useDispatch } from 'react-redux';
import { toggleModal } from '../../features/appSlice';

import './Header.css';

export const Header = () => {
    const dispatch = useDispatch();

    return (
        <div className="Header">
            <button onClick={() => dispatch(toggleModal('Stats'))}>STATS</button>
            <button onClick={() => dispatch(toggleModal('HowToPlay'))}>HOW TO PLAY</button>
        </div>
    );
}