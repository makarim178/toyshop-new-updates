using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entity;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CountryRepository : ICountryRepository
    {
        private readonly DataContext _context;
        public CountryRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> ExistsByName(string countryname)
        {
            return await _context.Country.AnyAsync(x => x.Countryname == countryname);
        }

        public async Task<IEnumerable<Country>> GetAll()
        {
            return await _context.Country.ToListAsync();
        }

        public async Task<Country> GetById(int id)
        {
            return await _context.Country.FindAsync(id);
        }

        public async Task<Country> GetByName(string countryname)
        {
            return await _context.Country
                .SingleOrDefaultAsync(x => x.Countryname == countryname);
        }

        public void Remove(Country country)
        {
            _context.Country.Remove(country);
        }

        public async Task<Country> Save(Country country)
        {
            _context.Country.Add(country);
            await _context.SaveChangesAsync();
            return country;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0; 
        }

        public void Update(Country country)
        {
            _context.Entry(country).State = EntityState.Modified;
        }
    }
}