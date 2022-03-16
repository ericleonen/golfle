import { Guess } from './Guess/Guess';
import { selectGameStatus, selectGuesses, selectPlayerAnswer } from '../../features/appSlice';
import { useSelector } from 'react-redux';

import './Guesses.css';
import { useEffect, useRef } from 'react';

export const Guesses = () => {
    const guesses = useSelector(selectGuesses);
    const playerAnswer = useSelector(selectPlayerAnswer);
    const gameStatus = useSelector(selectGameStatus);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [guesses])

    return (
        <>
            <div className="labels">
                <span>CNTRY</span>
                <span>HEIGHT</span>
                <span>AGE</span>
                <span>DEBUT</span>
                <span>OWGR</span>
                <span>FEDEX</span>
            </div>
            <div className="Guesses">
                <div>
                    { 
                        guesses.map(
                            (name, i) => <Guess player={name} 
                                                playerAnswer={playerAnswer}
                                                key={i}
                                                n={i}
                                        />
                        ) 
                    }
                    <div ref={bottomRef}></div>
                    {
                        gameStatus === 'lose' && <Guess player={playerAnswer.name} playerAnswer={playerAnswer} fail={true}/>
                    }
                </div>
            </div>
        </>
    );
}