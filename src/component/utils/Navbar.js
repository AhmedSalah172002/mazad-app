import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/mazady-logo-white.png";
import userLogo from '../../images/assets/images/avatars/avatar_25.jpg'
import MenuIcon from '@mui/icons-material/Menu';
import { Icon } from "@iconify/react";
import { Button, IconButton } from "@mui/material";



function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState({name: 'Test'});

  React.useEffect(() => {
    if(localStorage.user && localStorage.user != 'undefined'){
      setUser(JSON.parse(localStorage.user))
    }
  }, [])


  const navigate = useNavigate();
  let auth;
  if (localStorage.getItem("user") !== null) {
    auth = JSON.parse(localStorage.getItem("user"));
  }

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const settings =
    auth && auth?.role === "user"
      ? [
          { link: "الصفحة الشخصية", event: () => navigate("/dashboard/profile") },
          { link: "تسجيل خروج", event: () => logout() },
        ]
      : auth && auth.role === "merchant"
      ? [
          { link: "الصفحة الشخصية", event: () => navigate("/dashboard/profile") },
          { link: "تسجيل خروج", event: () => logout() },
        ]
      : auth && auth.role === "admin"
      ? [
          { link: "لوجة التحكم", event: () => navigate("/dashboard/overview") },
          { link: "تسجيل خروج", event: () => logout() },
        ]
      : null;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [isScrolled, setIsScrolled] = React.useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 5);
  };
  const pages = [{name:'التصنيفات',id:'cat'},{name:'لماذا نحن ؟',id:'why_us'},{name:'أحدث المنتجات',id:'new_prod'},{name:'كيفية الاستخدام',id:'how_use'}];
  
    const [anchorElNav, setAnchorElNav] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };

  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
 
  
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const location = useLocation();

  return (
    <AppBar
      sx={{
        direction: "rtl",
        backgroundColor:
          location.pathname !== "/"
            ? "#442DB9"
            : isScrolled
            ? "#442DB9"
            : "transparent",
        paddingX: { xs: "1rem", sm: "2rem", lg: "6rem" },
        paddingY: "2px",
        boxShadow: isScrolled
          ? "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
          : "none",
      }}
    >
      <Toolbar
        disableGutters
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Link className="navbar-brand" to="/">
          <img src={logo} style={{ width: "70px" }} alt="logo" />
        </Link>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" sx={{color:'white'}}>{page?.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } , justifyContent:'center' }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={()=> document.getElementById(`${page.id}`).scrollIntoView({behavior: 'smooth'})}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page?.name}
              </Button>
            ))}
          </Box>
        {settings ? (
          <Box>
            <img
              src={auth?.image || userLogo}
              alt="user"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={handleOpenUserMenu}
            />
            <Menu
              sx={{ mt: "55px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={setting.event}>
                    {setting.link}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ) : (
          <Icon
            icon="streamline:login-1"
            width={35}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          />
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
