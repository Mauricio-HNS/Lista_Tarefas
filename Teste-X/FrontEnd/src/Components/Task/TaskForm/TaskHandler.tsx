import { useParams } from 'react-router-dom';
import { createTask, getTask, updateTask } from '../../../Services/UserTasksService';
import { SubmitHandler } from 'react-hook-form';
import { UserTask } from '../../../Models/UserTask';
import TaskForm from './TaskForm';
import { useNavigate } from 'react-router-dom';

export default function TaskHandler() {
    const navigate = useNavigate();
    const params = useParams();
    const taskId = params?.taskId;
    const { data: task, error: taskError, status: taskStatus } = getTask(Number(params.taskId));
    const { mutate: createTaskMutate, error: createError, status: createStatus } = createTask();
    const { mutate: updateTaskMutate, error: updateError, status: updateStatus } = updateTask();

    const onSubmit: SubmitHandler<UserTask> = (data) => {
        if (!taskId) {
            data.id = undefined;
            console.log('post', data);
            createTaskMutate(data);

            setTimeout(() => {
                navigate('/', { replace: true });
            }, 50);

            if (createStatus === 'success') {
                console.log(createError);
            }
            return;
        }
        console.log('put', data);
        updateTaskMutate(data);
        setTimeout(() => {
            navigate('/', { replace: true });
        }, 50);
        if (updateStatus === 'success') {
            console.log(updateError);
        }
    };

    return (
        <TaskForm initialValues={task} onSubmit={onSubmit}/>
    );
}
