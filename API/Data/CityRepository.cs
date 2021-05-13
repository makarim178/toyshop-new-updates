using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entity;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext _context;
        public CityRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> ExistsByName(string cityname)
        {
            return await _context.City.AnyAsync(x => x.Cityname == cityname);
        }

        public async Task<IEnumerable<City>> GetAll()
        {
            return await _context.City.ToListAsync();
        }

        public async Task<City> GetById(int id)
        {
            return await _context.City.FindAsync(id);
        }

        public async Task<City> GetByName(string cityname)
        {
            return await _context.City
                .SingleOrDefaultAsync(x => x.Cityname == cityname);
        }

        public void Remove(City City)
        {
            _context.City.Remove(City);
        }

        public async Task<City> Save(City City)
        {
            _context.City.Add(City);
            await _context.SaveChangesAsync();
            return City;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0; 
        }

        public void Update(City City)
        {
            _context.Entry(City).State = EntityState.Modified;
        }
    }
}