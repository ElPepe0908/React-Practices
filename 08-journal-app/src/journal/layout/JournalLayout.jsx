import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { NavBar, SideBar } from "../components";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate__fadeIn animte__faster"
    >
      <NavBar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} />

      {/* Navbar drawerWidth */}

      {/* SideBar drawerWidth */}

      <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};
