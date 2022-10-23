import {FC, useEffect, useRef} from 'react';
import {ScaleLinear, select, axisLeft} from 'd3';

interface DateAxisProps {
    yScale: ScaleLinear<number, number>;
    innerWidth: number;
}

export const RateAxis: FC<DateAxisProps> = ({yScale, innerWidth}) => {
    const ref = useRef<SVGRectElement>(null);
    useEffect(() => {
        const yAxisG = select(ref.current);
        const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(8);
        yAxisG.call(yAxis);
    }, []);
    return <g ref={ref} />;
};
