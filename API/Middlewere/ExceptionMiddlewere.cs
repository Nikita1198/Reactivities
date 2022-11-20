using System.Net;
using System.Text.Json;
using Application.Core;

namespace API.Middlewere
{
    public class ExceptionMiddlewere
    {
        public readonly IHostEnvironment _env;
        public readonly RequestDelegate _next;
        public readonly ILogger<ExceptionMiddlewere> _logger;
        
        public ExceptionMiddlewere(RequestDelegate next, ILogger<ExceptionMiddlewere> logger, 
            IHostEnvironment env)
        {
            _logger = logger;
            _next = next;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment()
                    ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace.ToString())
                    : new AppException(context.Response.StatusCode, "Server Error");

                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}