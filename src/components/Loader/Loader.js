import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Loader.css';

export const Loader = () => {
    return (
        <div className="Loader">
            Loading your round... <br />
            <FontAwesomeIcon icon={faSpinner} className="loader"/>
        </div>
    )
}