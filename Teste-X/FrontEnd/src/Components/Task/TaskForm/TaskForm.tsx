import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { UserTask } from '../../../Models/UserTask';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import './TaskForm.css';
import React from 'react';

const defaultInitialValues: UserTask = {
    id: 1,
    subject: '',
    description: '',
    timeStart: new Date(),
    timeEnd: new Date(),
    isCompleted: false
};

const schema = yup
    .object({
        subject: yup.string().required(),
        description: yup.string().required(),
        timeStart: yup.date().required(),
        timeEnd: yup.mixed().test('test-endDate', 'End date should be after initial date', function checkEnd() {
            const { timeStart } = this.parent;
            const { timeEnd } = this.parent;
            if (dayjs(timeEnd).isAfter(dayjs(timeStart)) || dayjs(timeEnd).isSame(dayjs(timeStart))) {
                return true;
            }
            return false;
        })
    })
    .required();

export default function TaskForm({ onSubmit = (e: any) => {}, initialValues = defaultInitialValues }) {
    const [values, setValues] = React.useState(initialValues);

    const setValue = (field: any, value: any) => setValues((old) => ({ ...old, [field]: value }));

    const {
        register,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        setValue: setValueForm,
        control,
        reset
    } = useForm<UserTask>({
        resolver: yupResolver(schema)
    });

    const handleSubmit = (e: any) => {
        setValues(initialValues);
        if (schema.isValidSync(values)) {
            onSubmit(values);
        }
        console.log(errors);
    };

    React.useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    return (
        <Container component='main' maxWidth='xs' data-testid='task-form'>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: '#e91e63' }}>
                    <ListAltIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Task
                </Typography>
                <Box component='form' onSubmit={handleSubmitForm(handleSubmit)} sx={{ mt: 3 }}>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete='given-subject'
                                    required
                                    fullWidth
                                    id='subject'
                                    label='Subject'
                                    autoFocus
                                    {...register('subject')}
                                    value={values.subject}
                                    onChange={(e) => {
                                        setValue('subject', e.target.value);
                                        setValueForm('subject', e.target.value);
                                    }}
                                    data-testid='control-subject'
                                />
                                <p className='error'>{errors.subject?.message}</p>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete='given-description'
                                    required
                                    fullWidth
                                    id='description'
                                    label='Description'
                                    {...register('description')}
                                    value={values.description}
                                    onChange={(e) => {
                                        setValue('description', e.target.value);
                                        setValueForm('description', e.target.value);
                                    }}
                                    data-testid='control-description'
                                />
                                <p className='error'>{errors.description?.message}</p>
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        renderInput={(props) => (
                                            <TextField
                                                {...props}
                                                value={values.timeStart}
                                                onChange={(e) => {
                                                    setValue('timeStart', new Date(e.target.value));
                                                    setValueForm('timeStart', new Date(e.target.value));
                                                }}
                                            />
                                        )}
                                        label='Start Date and Time *'
                                        {...register('timeStart')}
                                        value={values.timeStart}
                                        data-testid='control-timeStart'
                                        onChange={(newValueStart) => {
                                            setValue('timeStart', newValueStart);
                                            if (newValueStart) {
                                                setValueForm('timeStart', newValueStart);
                                            }
                                        }}
                                    />
                                </LocalizationProvider>
                                <p className='error'>{errors.timeStart?.message}</p>
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        renderInput={(props) => (
                                            <TextField
                                                {...props}
                                                value={values.timeEnd}
                                                onChange={(e) => {
                                                    setValue('timeEnd', new Date(e.target.value));
                                                    setValueForm('timeEnd', new Date(e.target.value));
                                                }}
                                            />
                                        )}
                                        {...register('timeEnd')}
                                        label='End Date and Time *'
                                        value={values.timeEnd}
                                        onChange={(newValueEnd) => {
                                            setValue('timeEnd', newValueEnd);
                                            if (newValueEnd) {
                                                setValueForm('timeEnd', newValueEnd);
                                            }
                                        }}
                                        data-testid='control-time-end'
                                    />
                                </LocalizationProvider>
                                <p className='error'>{errors.timeEnd?.message}</p>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={values.isCompleted}
                                            {...register('isCompleted')}
                                            onChange={(newValue, checked) => {
                                                setValue('isCompleted', checked);
                                            }}
                                            color='primary'
                                        />
                                    }
                                    label='Is Completed?'
                                />
                                <p className='error'>{errors.isCompleted?.message}</p>
                            </Grid>
                        </Grid>
                        <Button
                            type='submit'
                            onClick={() => {
                                // prevent bind issues
                                setValueForm('subject', values.subject);
                                setValueForm('description', values.description);
                                setValue('timeStart', values.timeStart);
                                setValueForm('timeStart', values.timeStart);
                                setValue('timeEnd', values.timeEnd);
                                setValueForm('timeEnd', values.timeEnd);
                            }}
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
