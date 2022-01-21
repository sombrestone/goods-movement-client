import React, {useContext,useEffect, useState}  from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Context} from '../../App';
import {availableMenu, availableRoutes, routes} from '../../Navigation/Pages'
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import {Link} from "react-router-dom";



const pages = ['Справочники', 'Операции', 'Отчеты'];

function AppMenu(props) {
    const {user, setUser, UserFunc} = useContext(Context);


    let settings = (user.isAuth) ?
        [
            /*{
                name: 'Профиль',
                route: '/profile'
            },*/
            {
                name: 'Выход',
                route: '/',
                onclick: ()=>{
                    setUser({
                    isAuth: false,
                    role: null,
                    firstname: null,
                    lastname: null,
                    patronymic: null
                });
                    localStorage.removeItem('token');
                }

            },]
        :
        [{
                name: 'Войти',
                route: '/login'
            },
            /*{
                name: 'Зарегистрироваться',
                route: '/registration'
            }*/];

    let menus = availableMenu(user.role);
    let mobMenus=availableRoutes(user.role);


    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                    >
                        КП Журавский

                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {mobMenus.map((menu) => (
                                <Link to={menu.route}
                                      style={{textDecoration: 'inherit', color: 'inherit'}}>
                                <MenuItem key={menu} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{menu.name}</Typography>
                                </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
                    >
                        КП Журавский
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {menus.map((menu) => (
                            <PopupState popupId={menu.name}>
                                {(popupState) => (
                                    <React.Fragment>
                                        <Button key={menu}
                                                sx={{my: 2, color: 'white', display: 'block'}}
                                                {...bindTrigger(popupState)}>
                                            {menu.name}
                                        </Button>
                                        <Menu {...bindMenu(popupState)}>
                                            {menu.submenus.map((submenu) => (
                                                <Link to={submenu.route}
                                                      style={{textDecoration: 'inherit', color: 'inherit'}}>
                                                    <MenuItem
                                                        onClick={() => popupState.close}
                                                    >
                                                        {submenu.name}
                                                    </MenuItem>
                                                </Link>
                                            ))}
                                        </Menu>
                                    </React.Fragment>
                                )}
                            </PopupState>
                        ))}
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <Link to={setting.route}
                                      style={{textDecoration: 'inherit', color: 'inherit'}}>
                                    <MenuItem
                                        key={setting}
                                        onClick={(setting.onclick!=undefined)?
                                            setting.onclick:
                                            handleCloseNavMenu}
                                    >
                                        <Typography textAlign="center">{setting.name}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default AppMenu;