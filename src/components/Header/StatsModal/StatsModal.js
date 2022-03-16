import { useSelector } from 'react-redux';
import { selectIsStatsModal } from '../../../features/appSlice';
import { CloseButton } from '../../utility/CloseButton/CloseButton';
import { CSSTransition } from 'react-transition-group';

import './StatsModal.css';

export const StatsModal = () => {
    const isStatsModal = useSelector(selectIsStatsModal);

    const getStat = (stat) => {
        return localStorage.hasOwnProperty(stat) ? localStorage.getItem(stat) : 0;
    }

    const getWinPercentage = () => {
        if (getStat('gamesPlayed') > 0) {
            return (getStat('wins') / getStat('gamesPlayed') * 100).toFixed(0);
        }
        else {
            return 0;
        }
    }

    return (
        <CSSTransition in={isStatsModal}
                       timeout={300}
                       classNames="fader"
                       unmountOnExit
        >
            <div className="StatsModal">
                <CloseButton type="Stats"/>
                <div className="games-played">
                    <h3>GAMES <br/> PLAYED</h3>
                    <p>{getStat('gamesPlayed')}</p>
                </div>
                <div className="win-percentage">
                    <h3>WIN <br /> PCT.</h3>
                    <p>{getWinPercentage()}%</p>
                </div>
            </div>
        </CSSTransition>
    );
}