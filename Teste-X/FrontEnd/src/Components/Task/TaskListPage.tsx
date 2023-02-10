import './TaskListPage.css';
import ResponsiveAppBar from '../ResponsiveAppBar/ResponsiveAppBar';
import AddTaskButton from '../AddTaskButton/AddTaskButton';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

export default function TaskListPage() {
    return (
        <Box>
            <ResponsiveAppBar></ResponsiveAppBar>
            <AddTaskButton></AddTaskButton>
            <div className='main-container'>
                <Outlet />
            </div>
        </Box>
    );
}
