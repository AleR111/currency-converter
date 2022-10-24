import {FC, useCallback, useState} from 'react';
import {pointer, bisector, ScaleTime, ScaleLinear} from 'd3';
import {ConvertedData, CoordTooltipData} from '../../../../types';
import classes from './tooltip.module.scss';
import {format} from 'date-fns';

const bisectDate = bisector(function (d: any) {
    return d.date;
}).left;

const r = 5;

interface TooltipProps {
    xScale: ScaleTime<number, number>;
    yScale: ScaleLinear<number, number>;
    convertedData: ConvertedData[];
    innerWidth: number;
    innerHeight: number;
}

export const Tooltip: FC<TooltipProps> = ({
    xScale,
    yScale,
    convertedData,
    innerWidth,
    innerHeight,
}) => {
    const [coordTooltipData, setCoordTooltipData] =
        useState<CoordTooltipData | null>(null);
    console.log(
        '🚀 ~ file: Tooltip.tsx ~ line 26 ~ coordTooltipData',
        coordTooltipData
    );

    const mousemove = useCallback(
        (e) => {
            const x0 = xScale.invert(pointer(e)[0]);

            const i = bisectDate(convertedData, x0, 1);

            const d0 = convertedData[i - 1];
            const d1 = convertedData[i];
            const {date, value} =
                +x0.toISOString() - +d0.date.toISOString() >
                +d1.date.toISOString() - +x0.toISOString()
                    ? d1
                    : d0;

            const xCoord = xScale(date);
            const yCoord = yScale(value);
            if (coordTooltipData?.xCoord !== xCoord) {
                setCoordTooltipData({date, value, xCoord, yCoord});
            }
        },
        [xScale, yScale, convertedData, coordTooltipData]
    );

    return (
        <>
            <rect
                className={classes.selectorBox}
                height={innerHeight}
                width={innerWidth}
                onMouseMove={mousemove}
                onMouseLeave={() => setCoordTooltipData(null)}
            />
            {coordTooltipData && (
                <g>
                    <line
                        x1={coordTooltipData.xCoord}
                        y1={0}
                        x2={coordTooltipData.xCoord}
                        y2={innerHeight}
                        className={classes.line}
                    />
                    <g
                        transform={`translate(${coordTooltipData.xCoord},${coordTooltipData.yCoord})`}
                        fill="none"
                        pointerEvents="none"
                    >
                        <rect
                            className={classes.tooltip}
                            width={100}
                            height={50}
                            x={10}
                            y={-22}
                            rx={4}
                            ry={4}
                            fill="white"
                            stroke="#000"
                        />
                        <text stroke="#000"  x={10}
                            y={24}>
                            {Math.round(coordTooltipData.value)}
                        </text>
                        <text stroke="#000" x={10} y={4}>
                            {format(coordTooltipData.date, 'yyyy-MMM-dd')}
                        </text>

                        <circle
                            className={classes.circle}
                            r={r}
                        />
                    </g>
                </g>
            )}
        </>
    );
};
