import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Outlet, Link } from 'react-router-dom';

export default function AddTaskButton() {
    return (
        <Link to='/task'>
            <Fab color='primary' aria-label='add' sx={{ position: 'absolute', right: '25px', bottom: '25px' }}>
                <AddIcon />
            </Fab>
        </Link>
    );
}
