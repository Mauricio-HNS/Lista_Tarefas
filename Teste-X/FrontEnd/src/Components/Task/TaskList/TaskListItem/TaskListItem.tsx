import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserTask } from '../../../../Models/UserTask';
import { Outlet, Link } from 'react-router-dom';
import Moment from 'moment';
import Stack from '@mui/material/Stack';
import { UserTasksGrouped } from '../../../../Models/UserTasksGrouped';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import React from 'react';

type TaskListItemProps = {
    task: UserTask;
    userTasksGrouped?: UserTasksGrouped;
    onClickToggle: (task: UserTask) => void;
    onClickDelete: (task: UserTask, userTasksGrouped?: UserTasksGrouped) => void;
};

export default function TaskListItem(props: TaskListItemProps) {
    return (
        <ListItem
            key={props.task.id}
            secondaryAction={
                <>
                    <Link to={`/task/${props.task?.id}`}>
                        <IconButton edge='end' aria-label='comments'>
                            <EditIcon />
                        </IconButton>
                    </Link>
                    <IconButton edge='end' aria-label='delete' onClick={() => props.onClickDelete(props.task, props.userTasksGrouped)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            }
            disablePadding
        >
            <ListItemButton
                role={undefined}
                onClick={() => {
                    props.onClickToggle(props.task);
                }}
                dense
            >
                <ListItemIcon>
                    <Checkbox
                        edge='start'
                        checked={props.task.isCompleted}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': `checkbox-list-label-${props.task.id?.toString()}` }}
                    />
                </ListItemIcon>

                <Card variant='outlined' sx={{width: '350px'}}>
                    <CardHeader
                        title={props.task.subject}
                        subheader={Moment(props.task.timeStart).format('MMMM D, yyyy hh:mm:ss')}
                    />
                    <CardContent>
                        <Stack spacing={1}>
                            <ListItemText
                                // sx={{ color: 'primary.dark' }}
                                primary={
                                    'Until : ' +
                                    Moment(props.task.timeEnd).format('MMMM D, yyyy hh:mm:ss')
                                }
                            />
                            <Divider />
                            <ListItemText primary={props.task.description} />
                        </Stack>
                    </CardContent>
                </Card>
            </ListItemButton>
        </ListItem>
    );
}
