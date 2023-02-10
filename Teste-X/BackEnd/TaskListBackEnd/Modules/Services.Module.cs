namespace Task_List_Backend.Modules;

public static class ServicesModule
{
    public static IServiceCollection AddServicesModule(this IServiceCollection services)
    {
        services.AddScoped<UserTasksService>();
        return services;
    }
}
