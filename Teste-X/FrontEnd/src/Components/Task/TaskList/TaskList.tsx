import './TaskList.css';
import List from '@mui/material/List';
import { UserTask } from '../../../Models/UserTask';
import TaskListItem from './TaskListItem/TaskListItem';
import PastsTaskList from './PastsTaskList/PastsTaskList';
import TodayTaskList from './TodayTaskList/TodayTaskList';
import UpcomingTaskList from './UpcomingTaskList/UpcomingTaskList';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';

const lineStyle = { width: '100%', maxWidth: 500, margin: 'auto', bgcolor: 'primary.dark' };

export default function TaskList() {
    return (
        <Box>
            <ListItem sx={lineStyle}>
                <ListItemText primary='Upcoming Tasks'></ListItemText>
            </ListItem>
            <UpcomingTaskList></UpcomingTaskList>
            <ListItem sx={lineStyle}>
                <ListItemText primary='Today`s Tasks'></ListItemText>
            </ListItem>
            <TodayTaskList></TodayTaskList>
            <ListItem sx={lineStyle}>
                <ListItemText primary='Pasts Tasks'></ListItemText>
            </ListItem>
            <PastsTaskList></PastsTaskList>
        </Box>
    );
}
