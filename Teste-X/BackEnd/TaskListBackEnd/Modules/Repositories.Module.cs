namespace Task_List_Backend.Modules;

public static class RepositoriesModule
{
    public static IServiceCollection AddRepositoriesModule(this IServiceCollection services)
    {
        services.AddScoped<IUserTasksRepositoryContract, UserTasksRepository>();
        return services;
    }
}
