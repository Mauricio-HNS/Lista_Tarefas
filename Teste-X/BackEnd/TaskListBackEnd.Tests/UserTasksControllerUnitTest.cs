using Task_List_Backend.Controllers;
using Task_List_Backend.Infrastructure;
using Task_List_Backend.Models;
using Task_List_Backend.Models.DTOs;
using Task_List_Backend.Repositories.Contracts;
using Task_List_Backend.Services;
using Task_List_Backend.Validators;

namespace Task_List_Backend.Tests;

public class UserTasksControllerUnitTest
{
    private UserTasksController _userTasksController;

    public UserTasksControllerUnitTest()
    {
        _userTasksController = UserTaskControllerFactory();
    }

    private UserTasksController UserTaskControllerFactory()
    {
        var mockRepo = new Mock<IUserTasksRepositoryContract>();
        mockRepo.Setup(repo => repo.GetAll()).ReturnsAsync(GetTestUserTasks());
        mockRepo.Setup(repo => repo.GetById(1)).ReturnsAsync(GetTestUserTask());
        var mockLogger = new Mock<ILogger<UserTasksController>>();
        MapperConfiguration autoMapperConfig = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile(new AutoMapperProfile());
        });
        var mapper = new Mapper(autoMapperConfig);
        var mockUserTasksService = new UserTasksService(mapper);
        var userTasksController = new UserTasksController(
            mockLogger.Object,
            mockRepo.Object,
            mapper,
            mockUserTasksService
        );
        return userTasksController;
    }

    [Fact]
    public async void TestGetAllMethod()
    {
        // Act
        var result = await _userTasksController.GetAll();

        // Assert
        var resultType = Assert.IsAssignableFrom<IEnumerable<UserTaskDTO>>(result.Value);
        Assert.Equal(2, result.Value.Count());
    }

    [Fact]
    public async void TestGetByIdMethod()
    {
        // Act
        var result = await _userTasksController.Get(1);

        // Assert
        var resultType = Assert.IsAssignableFrom<UserTaskDTO>(result.Value);
        Assert.NotNull(result.Value);
    }

    [Fact]
    public async Task Post_UserTask_WhenModelStateIsInvalid()
    {
        // Arrange
        var userTaskDTO = new UserTaskDTO()
        {
            TimeStart = new DateTime(2022, 11, 25, 10, 0, 0),
            TimeEnd = new DateTime(2022, 11, 21, 11, 0, 0)
        };

        var validator = new UserTaskDTOValidator();
        validator.Validate(userTaskDTO);

        // Act
        var result = validator.Validate(userTaskDTO);
        var postResult = await _userTasksController.Post(userTaskDTO);

        // Assert
        Assert.Equal(result.IsValid, false);
    }

    [Fact]
    public async Task Post_UserTask_WhenModelStateIsValid()
    {
        // Arrange
        var userTaskDTO = new UserTaskDTO()
        {
            Subject = "New Task",
            Description = "Task that should pass.",
            TimeStart = new DateTime(2022, 11, 25, 10, 0, 0),
            TimeEnd = new DateTime(2022, 11, 26, 11, 0, 0)
        };

        _userTasksController = UserTaskControllerFactory();

        var validator = new UserTaskDTOValidator();
        validator.Validate(userTaskDTO);

        // Act
        var result = validator.Validate(userTaskDTO);
        var postResult = await _userTasksController.Post(userTaskDTO);

        // Assert
        Assert.Equal(result.IsValid, true);
        Assert.IsType<CreatedAtActionResult>(postResult.Result);
    }

    [Fact]
    public async Task Put_UserTask_WhenModelStateIsValid()
    {
        // Arrange
        var userTaskDTO = new UserTaskDTO()
        {
            Id = 7,
            Subject = "New Task",
            Description = "Task that should pass.",
            TimeStart = new DateTime(2022, 11, 25, 10, 0, 0),
            TimeEnd = new DateTime(2022, 11, 26, 11, 0, 0)
        };

        _userTasksController = UserTaskControllerFactory();

        var validator = new UserTaskDTOValidator();
        validator.Validate(userTaskDTO);

        // Act
        var result = validator.Validate(userTaskDTO);
        var putResult = await _userTasksController.Put(1, userTaskDTO);

        // Assert
        Assert.Equal(result.IsValid, true);
        Assert.IsType<CreatedAtActionResult>(putResult.Result);
    }

    private UserTask GetTestUserTask()
    {
        return new UserTask()
        {
            Id = 1,
            UserId = "1",
            TimeStart = new DateTime(2022, 11, 25, 11, 00, 00),
            TimeEnd = new DateTime(2022, 11, 25, 13, 00, 00),
            IsCompleted = false
        };
    }

    private List<UserTask> GetTestUserTasks()
    {
        var result = new List<UserTask>();

        result.Add(
            new UserTask()
            {
                Id = 1,
                UserId = "1",
                TimeStart = new DateTime(2022, 11, 25, 11, 00, 00),
                TimeEnd = new DateTime(2022, 11, 25, 13, 00, 00),
                IsCompleted = false
            }
        );

        result.Add(
            new UserTask()
            {
                Id = 1,
                UserId = "1",
                TimeStart = new DateTime(2022, 11, 25, 11, 00, 00),
                TimeEnd = new DateTime(2022, 11, 25, 13, 00, 00),
                IsCompleted = false
            }
        );

        return result;
    }
}
