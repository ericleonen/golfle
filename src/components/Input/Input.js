import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlayerNames } from '../../features/playerDataSlice';
import { selectGameStatus } from '../../features/appSlice';
import { selectNumGuesses } from '../../features/appSlice';
import { Suggestions } from './Suggestions/Suggestions';

import './Input.css';
import { addGuess } from '../../features/appSlice';

export const Input = () => {
    const dispatch = useDispatch();

    const [typed, setTyped] = useState('');
    const [text, setText] = useState('');
    const [selected, setSelected] = useState(-1);
    const [suggestLength, setSuggestLength] = useState(0);

    const players = useSelector(selectPlayerNames);
    const numGuesses = useSelector(selectNumGuesses);
    const gameStatus = useSelector(selectGameStatus);

    useEffect(() => {
        if (selected === -1) {
            setText(typed);
        }
    }, [selected, typed]);

    const onChange = ({ target }) => {
        setTyped(target.value);
        setText(target.value);
        setSuggestLength(0);
        setSelected(-1);
    }

    const onSubmit = (guess) => {
        if (players.indexOf(guess) !== -1) {
            dispatch(addGuess(guess));
            setText('');
            setTyped('');
            setSelected(-1);
        }
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSubmit(text);
        }

        if (e.key === 'ArrowDown') {
            if (selected === suggestLength) {
                setSelected(0);
            }
            else {
                setSelected(prev => prev + 1);
            }
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (selected > -1) {
                setSelected(prev => prev - 1);
            }
        }
    }

    return (
        <div className="Input">
            <input 
                type="text" 
                placeholder={gameStatus === 'still playing' ? "Guess " + numGuesses + " of 8" :
                             gameStatus === 'win' ? "You won!" : 'Game over' }
                onChange={onChange} 
                value={text}
                onSubmit={() => onSubmit(text)}
                disabled={gameStatus !== 'still playing'}
                onKeyDown={onKeyDown}
            />
            <Suggestions term={typed?.toLowerCase()}  
                         submit={onSubmit} 
                         players={players}
                         selected={selected}
                         setText={setText}
                         setSuggestLength={setSuggestLength}
                         setSelected={setSelected}
            />
        </div>
    );
}