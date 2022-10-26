import {FC, useCallback, useState} from 'react';
import {pointer, bisector, ScaleTime, ScaleLinear} from 'd3';
import {ConvertedData, CoordTooltipData} from '../../../../types';
import classes from './tooltip.module.scss';
import {differenceInMinutes, format} from 'date-fns';

const bisectDate = bisector(function (d: ConvertedData) {
    return d.date;
}).left;

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

    const mousemove = useCallback(
        (e) => {
            const hoverDate = xScale.invert(pointer(e)[0]);

            const index = bisectDate(convertedData, hoverDate, 1);

            const prevData = convertedData[index - 1];
            const nextData = convertedData[index];

            const {date, value} =
                differenceInMinutes(hoverDate, prevData.date) >
                differenceInMinutes(nextData.date, hoverDate)
                    ? nextData
                    : prevData;

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
                        className={classes.tooltip}
                        transform={`translate(${coordTooltipData.xCoord},${coordTooltipData.yCoord})`}
                    >
                        <TooltipLabel
                            value={coordTooltipData.value}
                            date={coordTooltipData.date}
                        />

                        <circle
                            className={classes.circle}
                            r={5}
                        />
                    </g>
                </g>
            )}
        </>
    );
};

interface TooltipLabelProps {
    value: number;
    date: Date;
}

const TooltipLabel: FC<TooltipLabelProps> = ({value, date}) => {
    return (
        <>
            <rect
                className={classes.tooltipBox}
                x={10}
                y={-22}
                rx={4}
                ry={4}
            />
            <text
                className={classes.text}
                x={16}
                y={-2}
            >
                {value.toFixed(3)}
            </text>
            <text
                className={classes.textDate}
                x={16}
                y={22}
            >
                {format(date, 'yyyy-MMM-dd')}
            </text>
        </>
    );
};
