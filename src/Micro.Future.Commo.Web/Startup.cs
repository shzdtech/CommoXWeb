using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Micro.Future.Commo.Web.Services;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using Serilog;
using Micro.Future.Business.MatchMaker.Commo;
using Micro.Future.Commo.Business.Requirement.Handler;
using Micro.Future.Commo.Business.Requirement;
using Micro.Future.Commo.Business.Abstraction.BizInterface;
using Micro.Future.Business.MatchMaker.Commo.Config;
using Micro.Future.Commo.Web.Data;
using Micro.Future.Commo.Web.Models;
using Micro.Future.Commo.Web.MiddleWare;

namespace Micro.Future.Commo.Web
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.Configure<CommoSettings>(Configuration.GetSection("CommoSettings"));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Add framework services.
            services.AddMvc().AddJsonOptions(options=>
            {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Serialize;
                options.SerializerSettings.PreserveReferencesHandling = PreserveReferencesHandling.None;
            });

            services.AddCors(options => options.AddPolicy("AllowAll", p => {
                    p.AllowAnyOrigin();
                    p.AllowAnyHeader();
                    p.AllowAnyMethod();
                    p.AllowCredentials();
                }));

            services.AddSignalR(options =>
            {
                options.Hubs.EnableJavaScriptProxies = false;
            });

            // Add application services.
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();

            services.AddMatchMakerSystem(new MatcherConfig());
            services.AddBizServices(new Business.Abstraction.BizObject.BizServiceOptions() { ConnectionString = Configuration.GetConnectionString("DefaultConnection") });
            services.AddSingleton<IMatchMakerManager, MatchMakerManager>();
            services.AddSingleton<IRequirementManager, RequirementManager>();
            services.AddSingleton<IChainManager, ChainManager>();
            services.AddSingleton<IEnterpriseManager, EnterpriseManager>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            loggerFactory.AddSerilog();

            Log.Logger = new LoggerConfiguration().Enrich.FromLogContext().WriteTo.Seq(Configuration["Logging:Serilog"]).CreateLogger();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseIdentity();
            app.UseWebSockets();
            app.UseMiddleware<HttpExceptionMiddleware>();

            app.Map("/signalr", map =>
            {
                map.UseCors("AllowAll");
                map.RunSignalR();
            });
            app.UseSignalR();
      
            // Add external authentication middleware below. To configure them please see http://go.microsoft.com/fwlink/?LinkID=532715

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
                routes.MapRoute(
                    "NotFound",
                    "{*PathInfo}",
                    new { controller = "Home", action = "Index" });
            });
        }
    }
}
