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
import './chart.scss';

export const Chart = () => {
    const {data} = useAppSelector((state) => state.timeSeriesRates);
    if (!data) return null;

    return <ChartCont data={data} />;
};

interface ChartContProps {
    data: TimeSeriesConverterData;
}

export const ChartCont: FC<ChartContProps> = ({data}) => {
    const ref = useRef(null);
    const refL = useRef(null);
    const rect = useRef(null);

    const ratesArr = Object.keys(data.rates);

    const parseTime = timeParse('%Y-%m-%d');

    const dataArray = Object.keys(data.rates).map((d) => {
        return {
            date: parseTime(d) as Date,
            value: data.rates[d].EUR,
        };
    });
    console.log('🚀 ~ file: Chart.tsx ~ line 15 ~ data ~ data', dataArray);

    const xExtent = extent(dataArray, (d) => d.date) as [Date, Date];

    const xScale = scaleTime().domain(xExtent).range([0, 500]);

    const yMax = max(dataArray, (d) => d.value) as number;
    const yMin = min(dataArray, (d) => d.value) as number;

    const yScale = scaleLinear().domain([yMin, yMax]).range([300, 0]);

    const coords = dataArray.map((el) => {
        return {
            x: xScale(el.date),
            y: yScale(el.value),
            //   vessel: el.vessel,
            //   color: color(el.vessel),
        };
    });
    const dPath = line<{
        x: number;
        y: number;
    }>()
        .x((d) => d.x)
        .y((d) => d.y)(coords) as string;
    console.log('🚀 ~ file: Chart.tsx ~ line 39 ~ Chart ~ dPath', dPath);
    var axisPad = 6;
    // const dateFormatter = time.format("%m/%d/%y")

    var xAxis = axisBottom(xScale)
        .tickSizeOuter(axisPad * 2)
        .tickSizeInner(axisPad * 2);
    // var xAxis = axisBottom(xScale).tickFormat(parseTime);
    // var yAxis = d3.axisLeft(yScale).ticks(10, 's').tickSize(-width); //horizontal ticks across svg width

    useEffect(() => {
        if (!ref.current && !refL.current) return;

        const xAxisG = select(ref.current);
        const xAxis1 = axisBottom(xScale);
        // .tickSizeOuter(axisPad * 2)
        // .tickSizeInner(axisPad * 2);
        xAxisG.call(xAxis1);

        const yAxisG = select(refL.current);
        const yAxis1 = axisLeft(yScale).tickSize(-500);
        yAxisG.call(yAxis1);
    }, []);
    const bisectDate = bisector(function (d: any) {
        return d.date;
    }).left;
    const mousemove = useCallback((e) => {
        const x0 = xScale.invert(pointer(e)[0]);
        // const y = yScale.invert(pointer(e)[1]);
        const i = bisectDate(dataArray, x0, 1);

        const d0 = dataArray[i - 1];
        const d1 = dataArray[i];
        const d = +x0.toISOString() - +d0.date.toISOString() > +d1.date.toISOString() - +x0.toISOString() ? d1 : d0;
        console.log('🚀 ~ file: Chart.tsx ~ line 98 ~ mousemove ~ x', x0, d1, d0);
    }, []);

    return (
        <div>
            <svg
                height={600}
                width={600}
            >
                <g transform={`translate(${64}, ${24})`}>
                    <path
                        fill="none"
                        d={dPath}
                        stroke="yellowgreen"
                    />
                    <g
                        ref={ref}
                        transform={`translate(${0}, ${300})`}
                    ></g>
                    <g
                        ref={refL}
                        className={'root'}
                    ></g>
                    <rect
                        height={300}
                        width={500}
                        ref={rect}
                        onMouseMove={mousemove}
                    />
                </g>
            </svg>
        </div>
    );
};
