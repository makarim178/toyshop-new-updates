using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entity;

namespace API.Interfaces
{
    public interface ICategoryRepository
    {
        Task<Category> Save(Category category);
        void Update(Category category);
        void Remove(Category category);
        Task<bool> SaveAllAsync();
        Task<bool> CategoryExistsByName(string categoryName);
        Task<IEnumerable<Category>> GetAllCategories();
        Task<Category> GetCategoryById(int id);
        Task<Category> GetCategoryByName(string categoryName);
    }
}