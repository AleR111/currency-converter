import {FC, useEffect, useState} from 'react';

import {useAppSelector} from '../../../hooks';
import {fixNumber} from '../../../utils';
import {Divider, Error, Skeleton, Input} from '../../ui-component';

export const CurrencyAmount: FC = () => {
    const {data, isLoading, error} = useAppSelector(
        (state) => state.latestConverter
    );

    const symbolName = Object.keys(data?.rates ?? {})[0];
    const rate = data ? fixNumber(data?.rates[symbolName]) : 0;

    const [baseAmount, setBaseAmount] = useState(1);
    const [symbolAmount, setSymbolAmount] = useState(rate);

    const baseHandler = (value: string | number) => {
        setBaseAmount(+value);
        setSymbolAmount(fixNumber(+value * rate));
    };

    const symbolHandler = (value: number | string) => {
        setBaseAmount(fixNumber(+value / rate));
        setSymbolAmount(+value);
    };

    useEffect(() => {
        setSymbolAmount(fixNumber(baseAmount * rate));
    }, [rate]);

    if (isLoading)
        return (
            <Skeleton
                height={40}
                width={396}
            />
        );

    if (error) return <Error value={error} />;

    return (
        <>
            <Input
                value={baseAmount}
                setValue={baseHandler}
            />
            <Divider />
            <Input
                value={symbolAmount}
                setValue={symbolHandler}
            />
        </>
    );
};
