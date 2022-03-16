import './Shader.css';
import { CSSTransition } from 'react-transition-group';

export const Shader = ({ isShader }) => {
    return (
        <CSSTransition in={isShader}
                       timeout={300}
                       classNames="Shader"
                       unmountOnExit
        >
            <div className="Shader"></div>
        </CSSTransition>
    );
}