import { Toolbar } from "@mui/material"
import { Box } from "@mui/system"
import { NavBar, SideBar } from "../components"

const drawerwidth = 280

export const JournalLayout = ({ children }) => {
  return (
      // Box es como un div
    <Box sx={{display: 'flex'}} className="animate__animated animate__fadeIn animate__faster">

        {/* Nav Bar  drawerWidth */}
        <NavBar drawerwidth={ drawerwidth } />


        {/* Side Bar drawerWidth */}
        <SideBar drawerwidth={ drawerwidth }/>

        <Box 
            component='main'
            sx={{ flexGrow:1, p: 3 }}
        >
             <Toolbar />

            { children }

        </Box>

    </Box>
  )
}
