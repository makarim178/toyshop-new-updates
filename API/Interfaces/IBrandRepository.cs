using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entity;

namespace API.Interfaces
{
    public interface IBrandRepository
    {
        Task<Brand> Save(Brand brand);
        void Update(Brand brand);
        void Remove(Brand brand);

        Task<bool> SaveAllAsync();

        Task<bool> BrandExistsByName(string brandName);

        Task<IEnumerable<Brand>> GetAllBrands();

        Task<Brand> GetBrandById(int id);

        Task<Brand> GetBrandByName(string brandName);
        
    }
}