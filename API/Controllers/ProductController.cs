using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entity;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductController : BaseApiController
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public ProductController(IProductRepository productRepository, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _mapper = mapper;
            _productRepository = productRepository;
        }

        [Authorize]
        [HttpPost("addProduct")]
        public async Task<ActionResult<Product>> AddBrand(NewProduct newProd)
        {
            if (await ProductExists(newProd.Skn)) return BadRequest("This Product already exists");

            var prod = new Product
            {
                Skn = newProd.Skn,
                ProductName = newProd.ProductName,
                ProductDesc = newProd.ProductDesc,
                CategoryId = newProd.Category.Id,
                BrandId = newProd.Brand.Id,
                RecommendedMinimumAge = newProd.RecommendedMinimumAge,
                RecommendedGender = newProd.RecommendedGender,
                ProductPrice = newProd.ProductPrice,
                AvailableQty = newProd.AvailableQty,
                MinOrderQty = newProd.MinOrderQty,
                ProductCreatedDate = DateTime.Now,
                LastUpdatedDate = DateTime.Now
            };

            return await _productRepository.Save(prod);
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetAllProducts([FromQuery]ProductParams productParams)
        {
            if(productParams.brand == null) productParams.brand = "All";
            if(productParams.category == null) productParams.category = "All";

            var products = await _productRepository.GetProductsAsync(productParams);

            Response.AddPaginationHeader(products.CurrentPage, products.pageSize
                , products.TotalCount, products.TotalPages);
            // var prodToReturn = _mapper.Map<IEnumerable<ProductDto>>(product);
            return Ok(products);
        }

        [HttpGet("{id}", Name = "GetproductById")]
        public async Task<ActionResult<ProductDto>> GetproductById(int id)
        {
            var product = await _productRepository.GetProductById(id);
            return _mapper.Map<ProductDto>(product);
        }

        [HttpGet("skn/{skn}", Name = "GetProductBySkn")]
        public async Task<ActionResult<ProductDto>> GetProductBySkn(string skn)
        {
            var product = await _productRepository.GetProductBySkn(skn);
            return _mapper.Map<ProductDto>(product);
        }

        // [Authorize]
        [HttpPut("product")]
        public async Task<ActionResult> UpdateProduct(Product product)
        {
            _productRepository.Update(product);
            product.LastUpdatedDate = DateTime.Now;
            if (await _productRepository.SaveAllAsync()) return NoContent();

            return BadRequest("product doesn't exists");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _productRepository.GetProductByIdDelete(id);
            if (product != null)
            {
                _productRepository.Delete(product);
                if (await _productRepository.SaveAllAsync()) return NoContent();
            }

            return BadRequest("product doesn't exists");

        }

        [HttpPost("add-photo/{id}")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file, int id)
        {
            var product = await _productRepository.GetProductByIdDelete(id);

            var result = await _photoService.AddPhotoAsync(file);

            if(result.Error != null)  return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if(product.Photos.Count == 0) 
            {
                photo.IsMain = true;
            }

            product.Photos.Add(photo);

            if(await _productRepository.SaveAllAsync())
            {
                // return _mapper.Map<PhotoDto>(photo);
                return Created("GetproductById", _mapper.Map<PhotoDto>(photo));
                
            }


            return BadRequest("Problem adding photos");
        }

        public async Task<bool> ProductExists(string Skn)
        {
            return await _productRepository.ProductExistsBySkn(Skn);
        }

        [HttpPut("set-main-photo")]
        public async Task<ActionResult> SetMainPhoto(UpdatePhotoProdDto updatePhotoProdDto)
        {
            var product = await _productRepository.GetProductByIdDelete(updatePhotoProdDto.ProductId);
            var photo = product.Photos.FirstOrDefault(x => x.id == updatePhotoProdDto.PhotoId);

            if(photo.IsMain) return BadRequest("This is already your main photo");

            var currentMain = product.Photos.FirstOrDefault(x => x.IsMain);

            if(currentMain != null) currentMain.IsMain = false;
            Console.WriteLine("\nI am here");
            photo.IsMain = true;
            product.LastUpdatedDate = DateTime.Now;

            // _productRepository.Update(product);

            if(await _productRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to set main pohoto");

        }

        [HttpDelete("delete-photo/{photoId}/{prodId}")]
        public async Task<ActionResult> DeletePhoto(int photoId, int prodId)
        {
            var product = await _productRepository.GetProductByIdDelete(prodId);
            var photo = product.Photos.FirstOrDefault(x => x.id == photoId);
            if(photo == null) return NotFound();
            if(photo.IsMain) return BadRequest("You cannot remove your main photo!");
            if(photo.PublicId != null) {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if(result.Error != null) return BadRequest(result.Error.Message);
            }

            product.Photos.Remove(photo);
            if(await _productRepository.SaveAllAsync() ) return NoContent();

            return BadRequest("Failed to remove photo");
        }
    }
}