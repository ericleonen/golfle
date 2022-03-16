import { useSelector } from 'react-redux';
import { selectGuesses } from '../../../features/appSlice';
import './Suggestions.css';

export const Suggestions = ({ term, submit, players, selected, setText, setSuggestLength, setSelected }) => {

    const onClick = (name) => {
        submit(name);
    }

    const guesses = useSelector(selectGuesses);


    return term !== '' ? (
        <div className="Suggestions">
            <div className="suggestedNames">
                { 
                    players
                        .filter(name => name.toLowerCase().indexOf(term) === 0 && guesses.indexOf(name) === -1)
                        .slice(0, 5)
                        .map(
                            (name, i) => {
                                if (selected === i) {
                                    setText(name);
                                }

                                setSuggestLength(i);

                                return <button 
                                        className="suggestedName"
                                        id={selected === i ? 'selected' : null}
                                        key={'suggestion_' + i}
                                        onClick={() => onClick(name)}
                                        onMouseOver={() => setSelected(i)}
                                        onMouseOut={() => setSelected(-1)}
                                        >
                                        {name}
                                       </button>
                            }
                        )
                }
            </div>
        </div>
    ) : null;
}