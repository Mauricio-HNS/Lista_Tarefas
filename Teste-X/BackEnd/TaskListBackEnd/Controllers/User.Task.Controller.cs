namespace Task_List_Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserTasksController
    : BaseController<UserTask, IUserTasksRepositoryContract, UserTaskDTO, UserTasksController>
{
    private UserTasksService _userTasksService;

    public UserTasksController(
        ILogger<UserTasksController> logger,
        IUserTasksRepositoryContract userTasksRepository,
        IMapper mapper,
        UserTasksService userTasksService
    ) : base(logger, userTasksRepository, mapper)
    {
        _userTasksService = userTasksService;
    }

    [HttpPut("{id}")]
    public override async Task<ActionResult<UserTaskDTO>> Put(int id, UserTaskDTO entityDTO)
    {
        UserTask entity = _mapper.Map<UserTask>(entityDTO);
        entity.Id = id;
        entity.UserId = "1";
        return await base.UpdateEntity(id, entity);
    }

    [HttpPost]
    public override async Task<ActionResult<UserTaskDTO>> Post(UserTaskDTO entityDTO)
    {
        UserTask entity = _mapper.Map<UserTask>(entityDTO);
        entity.UserId = "1";
        return await base.CreateEntity(entity, "Post");
    }

    [HttpPut("{id}/completed")]
    public virtual async Task<IActionResult> SetUserTaskCompleted(int id)
    {
        try
        {
            _repository.SetUserTaskCompleted(id);
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_repository.Exists(id))
            {
                return NotFound();
            }
            throw;
        }

        return Ok();
    }

    [HttpPut("{id}/notCompleted")]
    public virtual async Task<IActionResult> SetUserTaskNotCompleted(int id)
    {
        try
        {
            _repository.SetUserTaskNotCompleted(id);
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_repository.Exists(id))
            {
                return NotFound();
            }
            throw;
        }

        return Ok();
    }

    [HttpGet("todayTasks/{today}")]
    [ResponseCache(VaryByHeader = "User-Agent", Duration = 3)]
    public async Task<ActionResult<IEnumerable<UserTasksGroupedDTO>>> GetTodaysTasks(DateTime today)
    {
        var entities = await _repository.GetTodaysTasks(today);
        if (entities == null)
        {
            return NotFound();
        }
        var mappedEntities = _userTasksService.MapToUserTasksGroupedDTO(entities);
        return await mappedEntities;
    }

    [HttpGet("upcomingTasks/{today}")]
    [ResponseCache(VaryByHeader = "User-Agent", Duration = 3)]
    public async Task<ActionResult<IEnumerable<UserTasksGroupedDTO>>> GetTUpcomingTasks(
        DateTime today
    )
    {
        var entities = await _repository.GetUpcomingTasks(today);
        if (entities == null)
        {
            return NotFound();
        }
        var mappedEntities = _userTasksService.MapToUserTasksGroupedDTO(entities);
        return await mappedEntities;
    }

    [HttpGet("pastsTasks/{today}")]
    [ResponseCache(VaryByHeader = "User-Agent", Duration = 3)]
    public async Task<ActionResult<IEnumerable<UserTasksGroupedDTO>>> GetPastsTasks(DateTime today)
    {
        var entities = await _repository.GetPastsTasks(today);
        if (entities == null)
        {
            return NotFound();
        }
        var mappedEntities = _userTasksService.MapToUserTasksGroupedDTO(entities);
        return await mappedEntities;
    }
}
