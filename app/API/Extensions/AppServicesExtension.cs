using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Services;
using API.Helpers;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class AppServicesExtension
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext.DataContext>(opt => {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IProductService, ProductService>();

            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            
            services.AddCors();

            return services;
        }
    }
}