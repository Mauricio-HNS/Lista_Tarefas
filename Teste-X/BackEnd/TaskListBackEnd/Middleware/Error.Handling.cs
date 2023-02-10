using Newtonsoft.Json;

namespace Task_List_Backend.Middleware;

public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate next;
    private readonly ILogger<ErrorHandlingMiddleware> _logger;

    public ErrorHandlingMiddleware(ILogger<ErrorHandlingMiddleware> logger, RequestDelegate next)
    {
        this.next = next;
        _logger = logger;
    }

    public async Task Invoke(
        HttpContext context /* other dependencies */
    )
    {
        try
        {
            _logger.LogInformation("ErrorMiddleware");
            await next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error Logged by ErrorMiddleware");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var code = HttpStatusCode.InternalServerError; // 500 if unexpected

        if (exception is Exception)
            code = HttpStatusCode.NotFound;

        var result = JsonConvert.SerializeObject(new { error = exception.Message });
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)code;
        return context.Response.WriteAsync(result);
    }
}
