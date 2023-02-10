namespace Task_List_Backend.Repositories;

public class UserTasksRepository : BaseRepository<UserTask>, IUserTasksRepositoryContract
{
    public UserTasksRepository(MySQLDbContext context) : base(context) { }

    public void SetUserTaskCompleted(int id)
    {
        var userTask = new UserTask() { Id = id, IsCompleted = true };
        Entities.Attach(userTask);
        Entities.Entry(userTask).Property(x => x.IsCompleted).IsModified = true;
        _context.SaveChanges();
    }

    public void SetUserTaskNotCompleted(int id)
    {
        var userTask = new UserTask() { Id = id, IsCompleted = false };
        Entities.Attach(userTask);
        Entities.Entry(userTask).Property(x => x.IsCompleted).IsModified = true;
        _context.SaveChanges();
    }

    protected IQueryable<IGrouping<UserTaskDateHourGroup, UserTask>> GroupTasksByDateAndTime(
        IQueryable<UserTask> query
    )
    {
        IQueryable<IGrouping<UserTaskDateHourGroup, UserTask>> groupedQuery = query
            .OrderBy(t => t.TimeStart)
            .GroupBy(
                t =>
                    new UserTaskDateHourGroup() { Date = t.TimeStart.Date, Hour = t.TimeStart.Hour }
            );
        return groupedQuery;
    }

    public async Task<List<IGrouping<UserTaskDateHourGroup, UserTask>>> GetPastsTasks(
        DateTime today
    )
    {
        var query = Entities.Where(t => t.TimeStart.Date < today.Date);
        var groupedQuery = GroupTasksByDateAndTime(query);
        return await groupedQuery.ToListAsync();
    }

    public async Task<List<IGrouping<UserTaskDateHourGroup, UserTask>>> GetTodaysTasks(
        DateTime today
    )
    {
        var query = Entities.Where(t => t.TimeStart.Date == today.Date);
        var groupedQuery = GroupTasksByDateAndTime(query);
        return await groupedQuery.ToListAsync();
    }

    public async Task<List<IGrouping<UserTaskDateHourGroup, UserTask>>> GetUpcomingTasks(
        DateTime today
    )
    {
        var query = Entities.Where(t => t.TimeStart.Date > today.Date);
        var groupedQuery = GroupTasksByDateAndTime(query);
        return await groupedQuery.ToListAsync();
    }
}
