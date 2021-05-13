using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entity;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ProductRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void Delete(Product product)
        {
            _context.Products.Remove(product);

        }

        public async Task<ProductDto> GetProductById(int id)
        {
            return await _context.Products
                .Where(x => x.Id == id)
                .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<Product> GetProductByIdDelete(int id)
        {
            return await _context.Products
                .Include(p => p.Photos)
                .Include(c => c.Category)
                .Include(b => b.Brand)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<ProductDto> GetProductBySkn(string Skn)
        {
            return await _context.Products
                .Where(x => x.Skn == Skn)
                .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<PagedList<ProductDto>> GetProductsAsync(ProductParams productParams)
        {
            var query = _context.Products.AsQueryable();

            // if(productParams.productName != "") query = query.Where(x => x.ProductName.ToLower().Contains(productParams.productName.ToLower()));
            // if(productParams.Skn != "") query = query.Where(x => x.Skn.ToLower().Contains(productParams.Skn.ToLower()));

            query= query.Where(x => 
                x.ProductName.ToLower().Contains(productParams.searchString.ToLower()) 
                || x.Skn.ToLower().Contains(productParams.searchString.ToLower()));
                
            if(productParams.brand != "All") query = query.Where(x=> x.Brand.BrandName == productParams.brand);
            if(productParams.category != "All") query = query.Where(x=> x.Category.CategoryName == productParams.category);
            if(productParams.Gender != "All") query = query.Where(x=> x.RecommendedGender.ToLower() == productParams.Gender.ToLower());
            query = query.Where(x=> 
                x.RecommendedMinimumAge >= int.Parse(productParams.MinAge) 
                && x.RecommendedMinimumAge <= int.Parse(productParams.MaxAge))
                ;

            query = productParams.OrderBy switch 
            {
                "nameDesc" => query.OrderBy(u => u.ProductName).Reverse(),
                "priceLow" => query.OrderBy(u => u.ProductPrice),
                "priceDesc" => query.OrderBy(u => u.ProductPrice).Reverse(),
                _ => query.OrderBy(u => u.ProductName)
            };


            return await PagedList<ProductDto>.CreateAsync(query.ProjectTo<ProductDto>(_mapper
                .ConfigurationProvider).AsNoTracking()
                    , productParams.PageNumber, productParams.PageSize);
        }

        // public Task<bool> ProductExistsById(int id)
        // {
        //     return (_context.Products.(x => x.Id == id));
        // }

        public Task<bool> ProductExistsBySkn(string Skn)
        {
            return _context.Products.AnyAsync(x => x.Skn == Skn);
        }

        public async Task<Product> Save(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Product product)
        {
            _context.Entry(product).State = EntityState.Modified;
        }
    }
}