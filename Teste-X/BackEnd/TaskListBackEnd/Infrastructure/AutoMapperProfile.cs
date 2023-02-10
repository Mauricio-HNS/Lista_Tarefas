namespace Task_List_Backend.Infrastructure;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<UserTask, UserTaskDTO>();
        CreateMap<UserTaskDTO, UserTask>();
    }
}
