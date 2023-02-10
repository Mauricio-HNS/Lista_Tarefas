namespace Task_List_Backend.Repositories.Contracts;

public interface IUserTasksRepositoryContract : IRepositoryContract<UserTask>
{
    void SetUserTaskCompleted(int id);
    void SetUserTaskNotCompleted(int id);
    Task<List<IGrouping<UserTaskDateHourGroup, UserTask>>> GetTodaysTasks(DateTime today);
    Task<List<IGrouping<UserTaskDateHourGroup, UserTask>>> GetUpcomingTasks(DateTime today);
    Task<List<IGrouping<UserTaskDateHourGroup, UserTask>>> GetPastsTasks(DateTime today);
}
