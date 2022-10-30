import {FC} from 'react';

import classes from './calculateLayout.module.scss';

interface CalculateLayoutProps {
    pickComponent: JSX.Element;
    amountComponent: JSX.Element;
}

export const CalculateLayout: FC<CalculateLayoutProps> = ({
    pickComponent,
    amountComponent,
}) => {
    return (
        <div>
            <div className={classes.calcBox}>{pickComponent}</div>
            <div className={classes.calcBox}>{amountComponent}</div>
        </div>
    );
};
