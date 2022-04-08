import { CloseButton } from '../utility/CloseButton/CloseButton';
import { useSelector } from 'react-redux';
import { selectIsSilhouetteModal, selectPlayerAnswer } from '../../features/appSlice';

import './SilhouetteModal.css';
import { CSSTransition } from 'react-transition-group';

export const SilhouetteModal = () => {
    const { photo } = useSelector(selectPlayerAnswer);
    const isSilhouetteModal = useSelector(selectIsSilhouetteModal);

    return (
        <CSSTransition in={isSilhouetteModal}
                       timeout={300}
                       classNames="fader"
                       unmountOnExit
        >
            <div className="SilhouetteModal">
                <CloseButton type="Silhouette"/>
                <div className="img-container">
                    <img src={photo} className='player-photo' alt="hint" />
                </div>
                <div className="message-container">
                    <p>Who is this</p>
                    <h3>Mystery Golfer?</h3>
                    <p>Do you know?</p>
                </div>
            </div>
        </CSSTransition>
    );
}