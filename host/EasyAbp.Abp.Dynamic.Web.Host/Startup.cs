﻿using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace EasyAbp.Abp.Dynamic
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplication<DynamicWebHostModule>();
        }

        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            app.InitializeApplication();
        }
    }
}
