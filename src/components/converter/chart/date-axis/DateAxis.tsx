import {FC, useEffect, useRef} from 'react';
import {ScaleTime, select, axisBottom} from 'd3';

interface DateAxisProps {
    xScale: ScaleTime<number, number>;
    innerHeight: number;
}

export const DateAxis: FC<DateAxisProps> = ({xScale, innerHeight}) => {
    const ref = useRef<SVGRectElement>(null);

    useEffect(() => {
        const xAxisG = select(ref.current);
        const xAxis = axisBottom(xScale).tickPadding(8);
        xAxisG.call(xAxis);
    }, []);
    return (
        <g
            transform={`translate(0,${innerHeight})`}
            ref={ref}
        />
    );
};
