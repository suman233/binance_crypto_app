import * as React from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface ChartInterface {
    yAxis: number[],
    xAxis: number[]
}

function Graph({ yAxis, xAxis }: ChartInterface) {

    const state = {
        options: {
            name: 'History Chart',
            chart: {
                id: "rangeArea"
            },
            xaxis: {
                categories: xAxis
            }
        },
        series: [
            {
                name: "Area",
                data: yAxis
            }
        ]
    }
    return (

        <Chart
            options={state.options}
            series={state.series}
            type="line"
            width="600"
        />
    )
}
export default React.memo(Graph, (prevProps, postProps) => prevProps === postProps)