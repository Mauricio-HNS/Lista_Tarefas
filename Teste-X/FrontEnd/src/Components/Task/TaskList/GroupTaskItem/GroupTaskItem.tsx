import './GroupTaskItem.css';
import { UserTasksGrouped } from '../../../../Models/UserTasksGrouped';
import { ListItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import Moment from 'moment';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';

type TaskListItemProps = {
    userTasksGrouped: UserTasksGrouped;
};

export default function GroupTaskItem(props: TaskListItemProps) {
    const hour = dayjs(props.userTasksGrouped.date).add(props.userTasksGrouped.hour, 'hours');

    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2014-08-18T21:11:54'));

    const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);
    };

    return (
        <ListItem key={'lt' + props.userTasksGrouped.date.toString() + props.userTasksGrouped.hour.toString()}>
            <Box
                sx={{
                    width: '100%'
                }}
            >
                <div className='group-div'>
                    <Typography variant='body2' gutterBottom>
                        <ArrowForwardIosIcon sx={{ color: '#e91e63' }} />
                        <span>&nbsp;</span>
                        <CalendarMonthIcon className='group-div-icon' />
                        <span>&nbsp;</span>
                        <span>{Moment(props.userTasksGrouped.date).format('MMMM DD, yyyy')}</span>
                        <span>&nbsp;</span>
                        <AccessTimeIcon className='group-div-icon' />
                        <span>&nbsp;</span>
                        <span>{hour.format('HH:mm:ss')}</span>
                    </Typography>
                </div>
            </Box>
        </ListItem>
    );
}
