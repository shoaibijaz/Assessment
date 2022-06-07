using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Assessment.Domain;
using Microsoft.AspNetCore.Identity;

namespace Assessment.Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                HttpClient client = new HttpClient();
                string url = "https://raw.githubusercontent.com/Finclutech/finclutech_interview/main/customer_info.json";
                HttpResponseMessage response = await client.GetAsync(url);
                string content = await response.Content.ReadAsStringAsync();
                var firstToken = ((Newtonsoft.Json.Linq.JContainer)((Newtonsoft.Json.Linq.JContainer)Newtonsoft.Json.JsonConvert.DeserializeObject(content)).First).First;
                var users = firstToken.ToObject<List<AppUser>>();

                users.Add(new AppUser
                {
                    FirstName = "Super",
                    LastName = "User",
                    Email = "super@joe.com",
                    UserName = "super",
                });

                foreach (var user in users)
                {
                    await userManager.CreateAsync(new AppUser()
                    {
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        City = user.City,
                        State = user.State,
                        Gender = user.Gender,
                        StudentStatus = user.StudentStatus,
                        Major = user.Major,
                        Country = user.Country,
                        Age = user.Age,
                        SAT = user.SAT,
                        Grade = user.Grade,
                        Height = user.Height,
                        Email = string.IsNullOrEmpty(user.Email) ? user.Id + "_me@joe.com" : user.Email,
                        UserName = string.IsNullOrEmpty(user.UserName) ? user.Id + "_me" : user.UserName


                    }, "Pa$$w0rd");
                }

                await context.SaveChangesAsync();
            }
        }
    }
}
