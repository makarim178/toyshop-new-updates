using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entity;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DataContext _context;
        public CategoryRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> CategoryExistsByName(string categoryName)
        {
            return await _context.Category.AnyAsync(x => x.CategoryName == categoryName);
        }

        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            return await _context.Category.ToListAsync();
        }

        public async Task<Category> GetCategoryById(int id)
        {
            return await _context.Category.FindAsync(id);
        }

        public async Task<Category> GetCategoryByName(string categoryName)
        {
            return await _context.Category
                .SingleOrDefaultAsync(x => x.CategoryName == categoryName);
        }

        public void Remove(Category category)
        {
            _context.Category.Remove(category);
        }

        public async Task<Category> Save(Category category)
        {
            _context.Category.Add(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Category category)
        {
            _context.Entry(category).State = EntityState.Modified;
        }
    }
}