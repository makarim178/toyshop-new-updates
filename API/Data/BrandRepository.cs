using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entity;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class BrandRepository : IBrandRepository
    {
        private readonly DataContext _context;
        public BrandRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> BrandExistsByName(string brandName)
        {
            return await _context.Brand.AnyAsync(x => x.BrandName == brandName);

        }

        public async Task<IEnumerable<Brand>> GetAllBrands()
        {
            return await _context.Brand.ToListAsync();
        }

        public async Task<Brand> GetBrandById(int id)
        {
            return await _context.Brand
                .FindAsync(id);
        }

        public async Task<Brand> GetBrandByName(string brandName)
        {
            return await _context.Brand
                .SingleOrDefaultAsync(x => x.BrandName == brandName);
        }

        public void Remove(Brand brand)
        {
            _context.Brand.Remove(brand);
        }

        public async Task<Brand> Save(Brand brand)
        {
            _context.Brand.Add(brand);
            await _context.SaveChangesAsync();
            return brand;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Brand brand)
        {
            _context.Entry(brand).State = EntityState.Modified;
        }
    }
}