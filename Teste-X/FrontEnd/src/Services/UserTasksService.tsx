import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { UserTask } from '../Models/UserTask';
import { UserTasksGrouped } from '../Models/UserTasksGrouped';

const queryKeys = ['task', 'tasks', 'todayTasks', 'pastsTasks', 'upcomingTasks'];

export function getTask(taskId: number | undefined) {
    if (!taskId) {
        console.log('task', taskId);
        return useQuery<UserTask, Error>(['tasks'], () => new UserTask());
    }
    return useQuery<UserTask, Error>(['tasks'], () => axios.get<UserTask>(`${import.meta.env.VITE_API_URL}/api/UserTasks/${taskId}`).then((res) => res.data));
}

export function getAllTasks() {
    return useQuery(['tasks'], () => axios.get<UserTask[]>(`${import.meta.env.VITE_API_URL}/api/UserTasks`).then((res) => res.data));
}

export function getTodayTasks(date: Date) {
    return useQuery(['todayTasks'], () =>
        axios.get<UserTasksGrouped[]>(`${import.meta.env.VITE_API_URL}/api/UserTasks/todayTasks/${date.toJSON()}`).then((res) => res.data)
    );
}

export function getPastsTasks(date: Date) {
    return useQuery(['pastsTasks'], () =>
        axios.get<UserTasksGrouped[]>(`${import.meta.env.VITE_API_URL}/api/UserTasks/pastsTasks/${date.toJSON()}`).then((res) => res.data)
    );
}

export function getUpcomingTasks(date: Date) {
    return useQuery(['upcomingTasks'], () =>
        axios
            .get<UserTasksGrouped[]>(`${import.meta.env.VITE_API_URL}/api/UserTasks/upcomingTasks/${date.toJSON()}`)
            .then((res) => res.data)
    );
}

export function setTaskCompleted() {
    return useMutation((taskId: number) =>
        axios.put(`${import.meta.env.VITE_API_URL}/api/UserTasks/${taskId.toString()}/completed`).then((res) => res.data)
    );
}

export function setTaskNotCompleted() {
    return useMutation((taskId: number) =>
        axios.put(`${import.meta.env.VITE_API_URL}/api/UserTasks/${taskId.toString()}/notCompleted`).then((res) => res.data)
    );
}

export function deleteTask() {
    return useMutation((taskId: number) =>
        axios.delete(`${import.meta.env.VITE_API_URL}/api/UserTasks/${taskId.toString()}`).then((res) => res.data)
    );
}

export function createTask() {
    return useMutation((task: UserTask) => axios.post(`${import.meta.env.VITE_API_URL}/api/UserTasks`, task).then((res) => res.data));
}

export function updateTask() {
    return useMutation((task: UserTask) =>
        axios.put<UserTask>(`${import.meta.env.VITE_API_URL}/api/UserTasks/${task.id?.toString()}`, task).then((res) => res.data)
    );
}
