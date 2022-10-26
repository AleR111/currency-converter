import {FC} from 'react';

import {Converter} from '../converter';
import classes from './layout.module.scss';

export const Layout: FC = () => {
    return (
        <div className={classes.container}>
            <h2 className={classes.header}>Currency converter</h2>
            <Converter />
        </div>
    );
};
