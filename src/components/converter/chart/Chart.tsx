import {
    timeParse,
    scaleTime,
    extent,
    max,
    scaleLinear,
    min,
    line,
    axisBottom,
    svg,
    select,
    axisLeft,
    timeYear,
    pointer,
    bisector,
} from 'd3';
import {FC, useCallback, useEffect, useRef} from 'react';
import {useAppSelector} from '../../../hooks';
import {TimeSeriesConverterData} from '../../../types';
import classes from './chart.module.scss';
import {DateAxis} from './date-axis';
import {RateAxis} from './rate-axis';
import {Tooltip} from './tooltip';

const margin = {top: 40, right: 80, bottom: 80, left: 40};

const heightChart = 500;
const widthChart = 800;
const innerWidth = widthChart - margin.left - margin.right;
const innerHeight = heightChart - margin.top - margin.bottom;

export const Chart = () => {
    const {data} = useAppSelector((state) => state.timeSeriesRates);
    if (!data) return null;

    return <ChartCont data={data} />;
};

interface ChartContProps {
    data: TimeSeriesConverterData;
}

export const ChartCont: FC<ChartContProps> = ({data}) => {
    const parseTime = timeParse('%Y-%m-%d');

    const convertedData = Object.keys(data.rates).map((d) => {
        return {
            date: parseTime(d) as Date,
            value: data.rates[d].EUR,
        };
    });

    const xExtent = extent(convertedData, (d) => d.date) as [Date, Date];

    const xScale = scaleTime().domain(xExtent).range([0, innerWidth]);

    const yMax = max(convertedData, (d) => d.value) as number;
    const yMin = min(convertedData, (d) => d.value) as number;

    const yScale = scaleLinear().domain([yMin, yMax]).range([innerHeight, 0]);

    const coords = convertedData.map((el) => {
        return {
            x: xScale(el.date),
            y: yScale(el.value),
        };
    });
    const dPath = line<{
        x: number;
        y: number;
    }>()
        .x((d) => d.x)
        .y((d) => d.y)(coords) as string;

    return (
        <div>
            <svg
                height={heightChart}
                width={widthChart}
            >
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <path
                        className={classes.chartLine}
                        d={dPath}
                    />

                    <RateAxis
                        yScale={yScale}
                        innerWidth={innerWidth}
                    />

                    <DateAxis
                        xScale={xScale}
                        innerHeight={innerHeight}
                    />
                    <Tooltip
                        xScale={xScale}
                        yScale={yScale}
                        convertedData={convertedData}
                        innerWidth={innerWidth}
                        innerHeight={innerHeight}
                    />
                </g>
            </svg>
        </div>
    );
};
