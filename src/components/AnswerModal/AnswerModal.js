import { CloseButton } from '../utility/CloseButton/CloseButton';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectGameStatus, selectGuessData, selectIsAnswerModal, selectNumGuesses, selectPlayerAnswer } from '../../features/appSlice';

import './AnswerModal.css';
import { CSSTransition } from 'react-transition-group';

export const AnswerModal = () => {
    const { name, photo } = useSelector(selectPlayerAnswer);
    
    const gameStatus = useSelector(selectGameStatus);
    const isAnswerModal = useSelector(selectIsAnswerModal);
    const guessData = useSelector(selectGuessData);
    const numGuesses = useSelector(selectNumGuesses);

    const [showCopied, setShowCopied] = useState(false);

    const timeToMidnight = () => {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);

        let diff = midnight - now;
        const hoursConversion = 60 * 60 * 1000;
        const minutesConversion = 60 * 1000;
        const secondsConversion = 1000;

        let hours = Math.floor(diff / hoursConversion);
        hours = hours < 10 ? '0' + hours : hours;
        diff %= hoursConversion;
        let minutes = Math.floor(diff / minutesConversion);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        diff %= minutesConversion;
        let seconds = Math.floor(diff / secondsConversion);
        seconds = seconds < 10 ? '0' + seconds : seconds;

        if (hours === minutes === seconds === 0) {
            window.location.reload();
        }

        return `${hours}:${minutes}:${seconds}`;
    }

    const getShare = () => {
        const tod = new Date();
        const dd = String(tod.getDate());
        const mm = String(tod.getMonth());
        const yyyy = tod.getFullYear();

        const date = `${mm}/${dd}/${yyyy}`;

        const nGuesses = numGuesses < 9 ? numGuesses - 1 : 'X';
        let guessRep = '';
        for (let i = 0; i < numGuesses - 1; i++) {
            const row = guessData[i].cntry + guessData[i].height + guessData[i].age + guessData[i].debut + guessData[i].owgr + guessData[i].fedex;
            guessRep += row + '\n';
        }

        return `Golfle ${date} - ${nGuesses}/8\n\n${guessRep}`;
    }

    const copyShare = () => {
        const shareText = getShare();
        navigator.clipboard.writeText(shareText);
        setShowCopied(true);

        setTimeout(() => {
            setShowCopied(false);
        }, 6000);
    }

    const [timeLeft, setTimeLeft] = useState(timeToMidnight());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(timeToMidnight());
        }, 1000);

        return timer;
    });

    return (
        <CSSTransition in={isAnswerModal}
                       timeout={300}
                       classNames="fader"
                       unmountOnExit
        >
            <div className="AnswerModal" id={gameStatus}>
                <CloseButton type="Answer"/>
                <div className="img-container">
                    <img src={photo} className='player-photo' alt="player"></img>
                </div>
                <div className="message-container">
                    <p>{gameStatus === 'win' ? 'Yes! T' : 'Sorry, t'}he correct answer is</p>
                    <h3>{name}</h3>
                    <p>{gameStatus === 'win' ? 'Get it' : 'Try'} again tomorrow!</p>
                    <div>
                        <button className="share-btn" onClick={copyShare}>SHARE SCORE</button>
                        <CSSTransition in={showCopied} timeout={300} classNames="fader" unmountOnExit>
                            <span>Copied!</span>
                        </CSSTransition>
                    </div>
                    <p>New mystery golfer in</p>
                    <h4>{timeLeft}</h4>
                </div>
            </div>
        </CSSTransition>
    );
}