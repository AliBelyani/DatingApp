using System;
using System.Security.Claims;
using System.Threading.Tasks;
using DatingApp.API.Repository;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace DatingApp.API.Utilities
{
    public class LogUserActivity : IAsyncActionFilter
    {
        //ActionExecutingContext: vaghti action ejra mishavad
        //ActionExecutionDelegate: vaghti action ejra shode ast
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();
            var userId = int.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var datingRepository = resultContext.HttpContext.RequestServices.GetService<IDatingRepository>();
            var user = await datingRepository.GetUser(userId);
            user.ModifyDate = DateTime.Now;
            await datingRepository.SaveAll();
        }
    }
}