import { useDispatch, useSelector } from 'react-redux';
import { selectPlayerData } from '../../../features/playerDataSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './Guess.css';
import { addGuessData } from '../../../features/appSlice';

export const Guess = ({ player, playerAnswer, fail, n }) => {
    const dispatch = useDispatch();
    const {cntry, height, age, debut, owgr, fedex} = useSelector(selectPlayerData(player));

    const getHint = (category, value) => {
        if (playerAnswer[category] === value) {
            dispatch(addGuessData({category, value: '🟩', n}));
            return 'correct';
        }
        else if ((category === 'age' ||
                  category === 'debut' ||
                  category === 'owgr' ||
                  category === 'fedex') &&
                  Math.abs(value - playerAnswer[category]) <= 2
                ) {
            dispatch(addGuessData({category, value: '🟨', n}));
            return 'close';
        }
        else if (category === 'height') {
            const guessIn = height[0] * 12 + height[1];
            const answerIn = playerAnswer.height[0] * 12 + playerAnswer.height[1];
            if (guessIn === answerIn) {
                dispatch(addGuessData({category, value: '🟩', n}));
                return 'correct';
            }
            else if (Math.abs(guessIn - answerIn) <= 2) {
                dispatch(addGuessData({category, value: '🟨', n}));
                return 'close';
            }
        }
        dispatch(addGuessData({category, value: '⬛', n}));
    }

    const getArrow = (category, value) => {
        if (category === 'height') {
            const guessIn = height[0] * 12 + height[1];
            const answerIn = playerAnswer.height[0] * 12 + playerAnswer.height[1];

            if (answerIn > guessIn) {
                return <FontAwesomeIcon icon={faArrowUp} className="arrow"/>
            }
            else if (answerIn < guessIn) {
                return <FontAwesomeIcon icon={faArrowDown} className="arrow"/>
            }
        }
        else if (category === 'owgr' || category === 'fedex') {
            if (playerAnswer[category] < value) {
                return <FontAwesomeIcon icon={faArrowUp} className="arrow"/>
            }
            else if (playerAnswer[category] > value) {
                return <FontAwesomeIcon icon={faArrowDown} className="arrow"/>
            }
        }
        else {
            if (playerAnswer[category] > value) {
                return <FontAwesomeIcon icon={faArrowUp} className="arrow"/>
            }
            else if (playerAnswer[category] < value) {
                return <FontAwesomeIcon icon={faArrowDown} className="arrow"/>
            }
        }
    }

    return (
        <div className={fail ? 'Guess failure' : 'Guess'}>
            <h3 className="name">{player}</h3>
            <div className={getHint('cntry', cntry) + " cntry"}>
                <p>{cntry}</p>
            </div>
            <div className={getHint('height', height) + " height"}>
                <p>{height[0]}' {height[1]}''</p>
                {getArrow('height', height)}
            </div>
            <div className={getHint('age', age) + " age"}>
                <p>{age}</p>
                {getArrow('age', age)}
            </div>
            <div className={getHint('debut', debut) + " debut"}>
                <p>{debut}</p>
                {getArrow('debut', debut)}
            </div>
            <div className={getHint('owgr', owgr) + " owgr"}>
                <p>{(owgr) ? owgr : 'N/A'}</p>
                {getArrow('owgr', owgr)}
            </div>
            <div className={getHint('fedex', fedex) + " fedex"}>
                <p>{(fedex) ? fedex : 'N/A'} </p>
                {getArrow('fedex', fedex)}
            </div>
        </div>     
    );
}