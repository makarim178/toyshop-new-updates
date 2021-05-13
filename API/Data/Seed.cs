using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager
            , RoleManager<AppRole> roleManager)
        {
            if(await userManager.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            if(users == null) return;

            var roles = new List<AppRole> 
            {
                new AppRole{Name="Member"},
                new AppRole{Name="Admin"},
                new AppRole{Name="Moderator"},
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
                
            }

            foreach (var user in users) 
            {
                //using var hmac = new HMACSHA512();

                user.UserName = user.FirstName.ToLower();
                //user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));

                //user.PasswordSalt = HMAC.key;

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");
            }

            var admin = new AppUser
            {
                UserName = "admin"
            };
            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"});
            
        }

        public static async Task SeedProducts(DataContext context)
        {
            if(await context.Products.AnyAsync()) return;

            var prodData = await System.IO.File.ReadAllTextAsync("Data/ProductsSeedData.json");
            var products = JsonSerializer.Deserialize<List<Product>>(prodData);

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            await context.SaveChangesAsync();


        }

        public static async Task SeedBrands(DataContext context)
        {
            if(await context.Brand.AnyAsync()) return;

            var brandData = await System.IO.File.ReadAllTextAsync("Data/BrandSeedData.json");
            var brands = JsonSerializer.Deserialize<List<Brand>>(brandData);

            foreach (var brand in brands)
            {
                context.Brand.Add(brand);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedCategory(DataContext context)
        {
            if(await context.Category.AnyAsync()) return;

            var categoryData = await System.IO.File.ReadAllTextAsync("Data/CategorySeedData.json");
            var categories = JsonSerializer.Deserialize<List<Category>>(categoryData);

            foreach (var category in categories)
            {
                context.Category.Add(category);
            }
            await context.SaveChangesAsync();
        }

        public static async Task SeedCity(DataContext context)
        {
            if(await context.City.AnyAsync()) return;

            var cityData = await System.IO.File.ReadAllTextAsync("Data/CitySeedData.json");
            var cities = JsonSerializer.Deserialize<List<City>>(cityData);

            foreach (var city in cities)
            {
                context.City.Add(city);
            }
            await context.SaveChangesAsync();
        }
        public static async Task SeedCountry(DataContext context)
        {
            if(await context.Country.AnyAsync()) return;

            var countryData = await System.IO.File.ReadAllTextAsync("Data/CountrySeedData.json");
            var countries = JsonSerializer.Deserialize<List<Country>>(countryData);

            foreach (var country in countries)
            {
                context.Country.Add(country);
            }
            await context.SaveChangesAsync();
        }
        public static async Task SeedProvince(DataContext context)
        {
            if(await context.Province.AnyAsync()) return;

            var provinceData = await System.IO.File.ReadAllTextAsync("Data/ProvinceSeedData.json");
            var provinces = JsonSerializer.Deserialize<List<Province>>(provinceData);

            foreach (var province in provinces)
            {
                context.Province.Add(province);
            }
            await context.SaveChangesAsync();
        }
    }
}