namespace Task_List_Backend.Models.DTOs;

public class UserTasksGroupedDTO : UserTaskDateHourGroup
{
    public List<UserTaskDTO> UserTasks { get; set; }
}
