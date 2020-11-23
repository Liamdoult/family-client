import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
import InboxIcon from "@material-ui/icons/Inbox";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

import "./App.css";

import Storage from "./storage";
import Shopping from "./shopping";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function App() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link to="/storage" style={{ textDecoration: "none" }}>
          <IconButton aria-label="go to storage" color="inherit">
            <Badge badgeContent={0} color="secondary">
              <InboxIcon style={{ color: "white" }} />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </Link>
      </MenuItem>
      {/* <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
    </Menu>
  );

  return (
    <Router>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
            <Typography className={classes.title} variant="h6" noWrap>
              My Family
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Link to="/banking" style={{ textDecoration: "none" }}>
                <IconButton aria-label="go to storage" color="inherit">
                  <Badge badgeContent={0} color="secondary">
                    <AccountBalanceIcon style={{ color: "white" }} />
                  </Badge>
                </IconButton>
              </Link>
              <Link to="/vehicles" style={{ textDecoration: "none" }}>
                <IconButton aria-label="go to storage" color="inherit">
                  <Badge badgeContent={0} color="secondary">
                    <DirectionsCarIcon style={{ color: "white" }} />
                  </Badge>
                </IconButton>
              </Link>
              <Link to="/shopping" style={{ textDecoration: "none" }}>
                <IconButton aria-label="go to storage" color="inherit">
                  <Badge badgeContent={0} color="secondary">
                    <AssignmentTurnedInIcon style={{ color: "white" }} />
                  </Badge>
                </IconButton>
              </Link>
              <Link to="/storage" style={{ textDecoration: "none" }}>
                <IconButton aria-label="go to storage" color="inherit">
                  <Badge badgeContent={0} color="secondary">
                    <InboxIcon style={{ color: "white" }} />
                  </Badge>
                </IconButton>
              </Link>
              {/* <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton> */}
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        <Switch>
          <Route path="/Banking">
            <>Banking</>
          </Route>
          <Route path="/vehicles">
            <>Vehicles</>
          </Route>
          <Route path="/shopping">
            <Shopping />
          </Route>
          <Route path="/storage">
            <Storage />
          </Route>
          <Route path="/">
            <>HOME</>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
