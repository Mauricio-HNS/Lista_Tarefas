namespace Task_List_Backend.Services;

public class UserTasksService
{
    private readonly IMapper _mapper;

    public UserTasksService(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task<List<UserTasksGroupedDTO>> MapToUserTasksGroupedDTO(
        List<IGrouping<UserTaskDateHourGroup, UserTask>> groupedUserTasks
    ) { 
        var result = new List<UserTasksGroupedDTO>();
        foreach (var group in groupedUserTasks) {
            var userTasksGroupedDTO = new UserTasksGroupedDTO();
            userTasksGroupedDTO.Date = group.Key.Date;
            userTasksGroupedDTO.Hour = group.Key.Hour;
            userTasksGroupedDTO.UserTasks = _mapper.Map<List<UserTaskDTO>>(group.ToList());
            result.Add(userTasksGroupedDTO);
        }
        return result;
    }
}
