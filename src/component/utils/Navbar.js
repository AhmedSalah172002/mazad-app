import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/mazady-logo-white.png";
import { Icon } from "@iconify/react";

function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
    auth && auth.role === "user"
      ? [
          { link: "الصفحة الشخصية", event: () => navigate("/login") },
          { link: "تسجيل خروج", event: () => logout() },
        ]
      : auth && auth.role === "merchant"
      ? [
          { link: "الصفحة الشخصية", event: () => navigate("/login") },
          { link: "تسجيل خروج", event: () => logout() },
        ]
      : auth && auth.role === "admin"
      ? [
          { link: "لوجة التحكم", event: () => navigate("/login") },
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

        {settings ? (
          <Box>
              <Box
                sx={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background:
                    " linear-gradient(178.1deg, rgb(60, 55, 106) 8.5%, rgb(23, 20, 69) 82.4%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "22px",
                }}
                onClick={handleOpenUserMenu}
              >
                <Icon
                  icon="fa-solid:user"
                  width={23}
                  style={{ cursor: "pointer" }}
                />
              </Box>
            <Menu
              sx={{ mt: "45px" }}
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
