import List from '@mui/material/List';
import { deleteTask, getUpcomingTasks, setTaskCompleted, setTaskNotCompleted } from '../../../../Services/UserTasksService';
import { UserTask } from '../../../../Models/UserTask';
import TaskListItem from '../TaskListItem/TaskListItem';
import { UserTasksGrouped } from '../../../../Models/UserTasksGrouped';
import { Box, ListItem } from '@mui/material';
import GroupTaskItem from '../GroupTaskItem/GroupTaskItem';
export default function UpcomingTaskList() {
    const {
        data: upcomingTasks,
        status: tasksStatus,
        error: tasksError,
        refetch: getUpcomingTasksRefetch
    } = getUpcomingTasks(new Date(Date.now()));
    const { mutate: setTaskCompletedMutate } = setTaskCompleted();
    const { mutate: setTaskNotCompletedMutate } = setTaskNotCompleted();
    const { mutate: deleteTaskMutate } = deleteTask();

    const handleDelete = (task: UserTask, userTasksGrouped?: UserTasksGrouped) => {
        if (!task.id) {
            return;
        }
        deleteTaskMutate(task.id);
        userTasksGrouped?.userTasks?.splice(userTasksGrouped?.userTasks?.indexOf(task), 1);
    };

    const handleToggle = (task: UserTask) => {
        if (!task.id) {
            return;
        }
        task.isCompleted = !task.isCompleted;

        task.isCompleted ? setTaskCompletedMutate(task.id) : setTaskNotCompletedMutate(task.id);
    };

    return (
        <List className='TaskList' sx={{ width: '100%', maxWidth: 500, margin: 'auto', bgcolor: 'background.paper' }}>
            {upcomingTasks?.map((userTasksGrouped: UserTasksGrouped) => {
                return (
                    <Box key={userTasksGrouped.date.toString() + userTasksGrouped.hour.toString()}>
                        <GroupTaskItem userTasksGrouped={userTasksGrouped} />
                        <List className='TaskList' sx={{ width: '100%', maxWidth: 500, margin: 'auto', bgcolor: 'background.paper' }}>
                            {userTasksGrouped.userTasks.map((task: UserTask) => {
                                return (
                                    <TaskListItem
                                        key={task.id}
                                        onClickToggle={handleToggle}
                                        onClickDelete={handleDelete}
                                        task={task}
                                        userTasksGrouped={userTasksGrouped}
                                    ></TaskListItem>
                                );
                            })}
                        </List>
                    </Box>
                );
            })}
        </List>
    );
}
