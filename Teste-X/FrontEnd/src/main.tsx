import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TaskList from './Components/Task/TaskList/TaskList';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import TaskHandler from './Components/Task/TaskForm/TaskHandler';
import UpcomingTaskList from './Components/Task/TaskList/UpcomingTaskList/UpcomingTaskList';
import PastsTaskList from './Components/Task/TaskList/PastsTaskList/PastsTaskList';
import TodayTaskList from './Components/Task/TaskList/TodayTaskList/TodayTaskList';
import TaskListPage from './Components/Task/TaskListPage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import toast, { Toaster } from 'react-hot-toast';

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10,
            retry: false
        }
    },
    queryCache: new QueryCache({
        onError: (error: any) => {
            toast.error(`Something went wrong: ${error.message} ${error.response?.statusText}`);
            queryClient.invalidateQueries();
        }
    }),
    mutationCache: new MutationCache({
        onError: (error: any) => {
            var errors = '';
            if (error?.response?.data?.errors) {
                errors = JSON.stringify(error.response?.data?.errors);
            }
            toast.error(`Something went wrong: ${error.message} 
            ${error.response.statusText}
            ${errors}`);
            queryClient.invalidateQueries();
        },
        onSuccess: () => {
            toast.success(`Success`);
            queryClient.refetchQueries();
        }
    })
});

const router = createBrowserRouter([
    {
        path: '/',
        element: <TaskListPage />,
        children: [
            {
                path: '',
                element: <TaskList />,
                children: []
            },
            {
                path: 'pasts',
                element: <PastsTaskList />
            },
            {
                path: 'today',
                element: <TodayTaskList />
            },
            {
                path: 'upcoming',
                element: <UpcomingTaskList />
            },
            {
                path: 'task/:taskId',
                element: <TaskHandler />
            },
            {
                path: 'task',
                element: <TaskHandler />
            },
            {
                path: 'signIn',
                element: <SignIn />
            },
            {
                path: 'signUp',
                element: <SignUp />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <div>
                    <Toaster
                        toastOptions={{
                            duration: 5000,
                        }}
                    />
                </div>
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ThemeProvider>
    </React.StrictMode>
);
