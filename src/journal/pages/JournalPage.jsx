import { AddOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal/thunks"
import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView, NoteView } from "../views"

export const JournalPage = () => {

  const { isSaving, active } = useSelector(state => state.journal)
  const dispatch = useDispatch()

  const onClickNewNote = ( ) => {
    dispatch( startNewNote() )
  };

  return (
    // * tipografy se usa para hacer textos, por componente podemos elegir que etiqueta use, ej: h1, h2, p
    // * por variant le mandamos el estilo de texto sin modificar la etiqueta
    <JournalLayout>
 
      { !!active
        ?<NoteView />
        :<NothingSelectedView />
      }

      <IconButton
      onClick={onClickNewNote}
      disabled={isSaving}
      size='large'
      sx={{
        color: 'white',
        backgroundColor: 'error.main',
        ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
        position:'fixed',
        right: 50,
        bottom: 50
      }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </JournalLayout>
  )
}
