using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entity;
using API.Helpers;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        void Update(Product product);
        void Delete(Product product);
        Task<Product> Save(Product product);

        Task<bool> SaveAllAsync();

        Task<bool> ProductExistsBySkn(string Skn);
        //Task<bool> ProductExistsById(int id);

        Task<PagedList<ProductDto>> GetProductsAsync(ProductParams productParams);
        Task<ProductDto> GetProductById(int id);
        Task<Product> GetProductByIdDelete(int id);
        Task<ProductDto> GetProductBySkn(string Skn);

        
    }
}