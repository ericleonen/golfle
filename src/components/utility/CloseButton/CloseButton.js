import './CloseButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../../../features/appSlice';

export const CloseButton = ({ type }) => {
    const dispatch = useDispatch();

    return (
        <button className='CloseButton' onClick={() => dispatch(toggleModal(type))}>
            <FontAwesomeIcon icon={faXmark}/>
        </button>
    );
}