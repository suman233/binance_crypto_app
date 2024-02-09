import React from 'react'
import Header from '../Header/Header';
import { Box } from '@mui/material';

interface wrapperProps {
    children: JSX.Element | JSX.Element[];
}
const Wrapper = (props: wrapperProps) => {
    const { children } = props;

    return (
        <>
            <Header />
            <Box className="body_content">{children}</Box>
            
        </>
    )
}

export default Wrapper