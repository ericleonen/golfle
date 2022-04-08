import { Header } from '../components/Header/Header';
import { StatsModal } from '../components/Header/StatsModal/StatsModal';
import { HowToPlayModal } from '../components/Header/HowToPlayModal/HowToPlayModal';
import { Title } from '../components/Title/Title';
import { Input } from '../components/Input/Input';
import { Guesses } from '../components/Guesses/Guesses';
import { AnswerModal } from '../components/AnswerModal/AnswerModal';
import { Shader } from '../components/Shader/Shader';

import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayerData, selectIsDataReady } from '../features/playerDataSlice';
import { fetchPlayerAnswer, selectGameStatus, selectIsAnswerModal, selectIsHowToPlayModal, selectIsSilhouetteModal, selectIsStatsModal, setDailyData, setPlayerAnswer, toggleModal } from '../features/appSlice';
import { SilhouetteModal } from '../components/SilhouetteModal/SilhouetteModal';
import { Loader } from '../components/Loader/Loader'; 

const App = () => {
    const dispatch = useDispatch();

    const isAnswerModal = useSelector(selectIsAnswerModal);
    const isStatsModal = useSelector(selectIsStatsModal);
    const isHowToPlayModal = useSelector(selectIsHowToPlayModal);
    const isSilhouetteModal = useSelector(selectIsSilhouetteModal);
    const isDataReady = useSelector(selectIsDataReady);
    const gameStatus = useSelector(selectGameStatus);

    const isShader = isAnswerModal || isStatsModal || isHowToPlayModal || isSilhouetteModal;

    useEffect(() => {
        dispatch(fetchPlayerData());
        dispatch(fetchPlayerAnswer());

        if (localStorage.hasOwnProperty('lastPlayed')) {
            const lastPlayed = new Date(localStorage.getItem('lastPlayed'));
            const now = new Date();

            if (lastPlayed.getFullYear() !== now.getFullYear() ||
                lastPlayed.getMonth() !== now.getMonth() ||
                lastPlayed.getDate() !== now.getDate()) {
                localStorage.removeItem('guesses');
                localStorage.removeItem('gameStatus');
            }
        }

        else {
            dispatch(toggleModal('HowToPlay'));
        }

        dispatch(setDailyData());
    }, [dispatch]);

    return isDataReady ? (
        <div className="App">
            <Header />

            <Shader isShader={isShader} />
            <StatsModal />
            <HowToPlayModal />
            <AnswerModal />
            <SilhouetteModal />

            <div className="content">
                <Title />
                <Input />
                {
                    gameStatus === 'still playing' ? <button className="toggle-silhouette-btn" onClick={() => dispatch(toggleModal('Silhouette'))}>SHOW SILHOUETTE</button> : 
                                                     <button className="toggle-silhouette-btn" onClick={() => dispatch(toggleModal('Answer'))}>SHOW RESULT</button>
                }
                <Guesses />
            </div>
        </div>
    ) : <Loader />;
}

export default App;