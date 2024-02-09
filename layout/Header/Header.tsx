import React, { useMemo, useState } from 'react'
// import AppBar from '@mui/material/AppBar';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import AdbIcon from '@mui/icons-material/Adb';
import assest from '@/json/assest';
import { createTheme, styled } from '@mui/material';
import { Brightness4, Brightness7, Home, Menu } from '@mui/icons-material';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/mui_theme/mui_palette';

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Home', 'Rate', 'Market', 'Exchange'];
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));



export default function Header(props: Props) {
    const { window } = props;
    // const [mobileOpen, setMobileOpen] = React.useState(false);

    // const handleDrawerToggle = () => {
    //     setMobileOpen((prevState) => !prevState);
    // };
    const [open, setOpen] = useState(false);
    const [dark, setDark] = useState(true);

    const darkTheme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: dark ? 'dark' : 'light',
                },
            }),
        [dark]
    );
    const handleDrawerOpen = () => {
        setOpen((prevState) => !prevState);
    };


    const drawer = (
        <Box onClick={handleDrawerOpen} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mx: 2, my: 2, color: '#ebba34', fontWeight: 'bold' }}>
                CRYPTO
            </Typography>
            <Divider />
            <List>
                {navItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <Link style={{ textDecoration: 'none' }} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}><ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText sx={{ color: 'black' }} primary={item} />
                        </ListItemButton></Link>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <ThemeProvider theme={darkTheme ? darkTheme : theme}>
            <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position='fixed' sx={{ backgroundColor: 'white', boxShadow: 'none' }}>

                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerOpen}
                                sx={{
                                    mr: 2,

                                }}
                            >
                                {/* <MenuIcon sx={{ color: 'black' }} /> */}

                                <img src={assest.logo} alt="logo" height={30} />

                            </IconButton>

                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 0, display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', color: '#ebba34', mx: 1 }}
                            >
                                CRYPTO
                            </Typography>
                            <Box sx={{ display: { xs: 'none', sm: 'block' }, flexGrow:1 }}>
                                {navItems.map((item) => (
                                    <Link href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}><Button key={item} sx={{ color: '#000', fontWeight: 'bold', '&:hover': { color: 'brown' } }}>
                                        {item}
                                    </Button></Link>
                                ))}
                            </Box>
                            <Box sx={{ flexGrow: 0 }}>
                                <IconButton onClick={() => setDark(!dark)}>
                                    {dark ? <Brightness7 sx={{ color: 'black' }} /> : <Brightness4 />}
                                </IconButton>
                            </Box>

                        </Toolbar>

                    </AppBar>


                <nav>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={open}
                        onClose={handleDrawerOpen}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
                <Box component="main" sx={{ p: 3 }}>

                </Box>
            </Box>
        </ThemeProvider >
    );
}