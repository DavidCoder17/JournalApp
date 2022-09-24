import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal";

export const SideBarItem = ({ title = '', body, id, date, imageUrls = []}) => {

    const dispatch = useDispatch()

    const onClickNote = () => {
        dispatch(setActiveNote({ title, body, id, date, imageUrls }))
    };

    // Revisa si hay un cambio en el titulo y es largo lo corta y agrega los 3 puntos
    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title;
    }, [title])

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onClickNote}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={'Lorem ipsum dolor sit amet consectetur.'} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
