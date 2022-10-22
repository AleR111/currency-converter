import {FC} from 'react';
import {Converter} from './components';
import './styles/index.scss';

const App: FC = () => {
    return (
        <div className="app">
            <Converter />
        </div>
    );
};

export default App;
