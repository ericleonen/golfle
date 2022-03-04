import { Header } from '../components/Header/Header';
import { StatsModal } from '../components/Header/StatsModal';
import { HowToPlayModal } from '../components/Header/HowToPlayModal';
import { Title } from '../components/Title/Title';
import { Input } from '../components/Input';
import { Guesses } from '../components/Guesses/Guesses';
import { AnswerModal } from '../components/AnswerModal/AnswerModal';
import { Shader } from '../components/Shader/Shader';

import './App.css';

export const App = () => {
    return (
        <div className="App">
            <Header />
        
            <StatsModal />
            <HowToPlayModal />
            <AnswerModal />
            <Shader />

            <Title />
            <Input />

            <Guesses />
        </div>
    );
}