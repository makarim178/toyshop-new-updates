using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entity;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ProvinceRepository : IProvinceRepository
    {
        private readonly DataContext _context;
        public ProvinceRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> ExistsByName(string provincename)
        {
            return await _context.Province.AnyAsync(x => x.Provincename == provincename);
        }

        public async Task<IEnumerable<Province>> GetAll()
        {
            return await _context.Province.ToListAsync();
        }

        public async Task<Province> GetById(int id)
        {
            return await _context.Province.FindAsync(id);
        }

        public async Task<Province> GetByName(string provincename)
        {
            return await _context.Province
                .SingleOrDefaultAsync(x => x.Provincename == provincename);
        }

        public void Remove(Province province)
        {
            _context.Province.Remove(province);
        }

        public async Task<Province> Save(Province province)
        {
            _context.Province.Add(province);
            await _context.SaveChangesAsync();
            return province;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0; 
        }

        public void Update(Province province)
        {
            _context.Entry(province).State = EntityState.Modified;
        }
    }
}