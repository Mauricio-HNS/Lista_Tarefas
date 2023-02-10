var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers(options => { });

builder.Services.AddResponseCaching();

var mySQLConnectionString = builder.Configuration.GetConnectionString("MySQLDefaultConnection");

builder.Services.AddDbContext<MySQLDbContext>(
    opt => opt.UseMySql(mySQLConnectionString, ServerVersion.AutoDetect(mySQLConnectionString))
);

builder.Services.AddFluentValidationAutoValidation().AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssemblyContaining<UserTaskDTOValidator>();

builder.Services.AddRepositoriesModule();
builder.Services.AddServicesModule();
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var myAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: myAllowSpecificOrigins,
        builder =>
        {
            builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .SetIsOriginAllowed(origin => true)
                .AllowCredentials();
        }
    );
});

var app = builder.Build();



app.UseSwagger();
app.UseSwaggerUI();

app.UseMiddleware<Task_List_Backend.Middleware.ErrorHandlingMiddleware>();

app.UseHttpsRedirection();

app.UseCors(myAllowSpecificOrigins);

app.UseAuthorization();

app.UseResponseCaching();

app.MapControllers();

app.Run();
