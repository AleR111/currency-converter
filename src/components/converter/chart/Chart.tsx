import {FC} from 'react';
import {timeParse, scaleTime, extent, max, scaleLinear, min, line} from 'd3';

import {useAppSelector} from '../../../hooks';
import {
    heightChart,
    innerHeight,
    innerWidth,
    margin,
    widthChart,
} from '../../../settings';
import {Path, TimeSeriesConverterData} from '../../../types';
import {Error, Skeleton} from '../../ui-component';
import classes from './chart.module.scss';
import {DateAxis} from './date-axis';
import {RateAxis} from './rate-axis';
import {Tooltip} from './tooltip';

interface ChartContProps {
    data: TimeSeriesConverterData;
}

const Chart: FC<ChartContProps> = ({data}) => {
    const parseTime = timeParse('%Y-%m-%d');

    const convertedData = Object.keys(data.rates).map((d) => {
        const code = Object.keys(data.rates[d])[0];
        return {
            date: parseTime(d) as Date,
            value: +data.rates[d][code].toFixed(3),
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
    const dPath = line<Path>()
        .x((d) => d.x)
        .y((d) => d.y)(coords) as string;

    return (
        <div>
            <svg
                height={heightChart}
                width={widthChart}
            >
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <RateAxis
                        yScale={yScale}
                        innerWidth={innerWidth}
                    />
                    <DateAxis
                        xScale={xScale}
                        innerHeight={innerHeight}
                    />
                    <path
                        className={classes.chartLine}
                        d={dPath}
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

export const ChartContainer = () => {
    const {data, isLoading, error} = useAppSelector(
        (state) => state.timeSeriesRates
    );

    if (isLoading) {
        return (
            <Skeleton
                height={heightChart}
                width={widthChart}
            />
        );
    }

    if (error) return <Error value={error} />;

    if (!data) return null;

    return <Chart data={data} />;
};
