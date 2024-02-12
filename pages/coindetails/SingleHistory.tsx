import dynamic from 'next/dynamic';
import React, { useCallback, useEffect } from 'react'
import { Box, Container } from '@mui/material';
import SelectInterval from '../../components/IntervalSelector';
import { useState } from 'react';
import { useRouter } from 'next/router';
import isEqual from 'react-fast-compare';
const Graph = dynamic(() => import('./Graph'), {
    ssr: false
});


interface SingleDataInterface {
    id: string | string[] | undefined;
}

const SingleHistory = ({ handleChange, historyData, interval, options }: any) => {

    const { data, isLoading, isError, error }: any = historyData || {}

    console.log("history");



    const [chartData, setChartData] = useState<{ xAxis: number[], yAxis: number[] }>({
        xAxis: [1, 2, 3],
        yAxis: [1, 2, 3]
    })


    useEffect(() => {
        if (data && !isLoading) {
            let xAxis: number[] = []
            let yAxis: number[] = []
            data?.map((item: { time: number, priceUsd: string }) => {
                xAxis.push(item.time)
                yAxis.push(Number(item.priceUsd))
            })
            setChartData({
                xAxis,
                yAxis
            })
            // console.table(xAxis)
            // console.table(yAxis)
        }

    }, [interval, options, data, isLoading]);

    console.log("interval",interval)

    return (
        <Container>
            <Box
                display="flex"
                flexDirection="column"
                sx={{
                    paddingTop: "10px",
                    paddingBottom: "10px"
                }}
            >
                <SelectInterval options={options} interval={interval} handleChange={(v) => handleChange(v)} />

                <Graph xAxis={chartData.xAxis} yAxis={chartData.yAxis} />

            </Box>
        </Container>
    );
}

export default React.memo(SingleHistory,isEqual)
