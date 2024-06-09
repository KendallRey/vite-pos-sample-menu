import { AUTH_ROUTES } from "@/constant/route";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Tooltip,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const AuthHeader = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
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
            component="a"
            href="/"
            sx={{
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            APP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleOpenNavMenu} color="inherit">
              <GiHamburgerMenu />
            </IconButton>
            <Drawer open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
              <List>
                {AUTH_ROUTES.map((route) => (
                  <ListItem key={route.id} disablePadding>
                    <ListItemButton>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary={route.title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </Box>
          <Typography
            variant="h5"
            component="a"
            href="/"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
            }}
          >
            APP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {AUTH_ROUTES.map((route) => (
              <Button key={route.id} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                {route.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="KenRey" />
              </IconButton>
            </Tooltip>
            <Drawer open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} anchor="right">
              <List>
                {AUTH_ROUTES.map((route) => (
                  <ListItem key={route.id} disablePadding>
                    <ListItemButton>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary={route.title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AuthHeader;
