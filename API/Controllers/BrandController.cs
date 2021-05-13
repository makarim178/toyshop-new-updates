using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entity;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BrandController : BaseApiController
    {
        private readonly IBrandRepository _brandRepository;
        public BrandController(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }

        [HttpPost("brand")]
        public async Task<ActionResult<Brand>> AddBrand(Brand brand)
        {
            if (await BrandExists(brand.BrandName)) return BadRequest(brand.BrandName + " already exists");

            await _brandRepository.Save(brand);
            
            return brand;
        }

        [HttpPut("brand")]
        public async Task<ActionResult> UpdateBrand(Brand brand)
        {
            _brandRepository.Update(brand);
            if(await _brandRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed To Update Brand");
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<Brand>> RemoveBrand(int id)
        {
            Brand brand = await _brandRepository.GetBrandById(id);

            if(brand != null) {
                _brandRepository.Remove(brand);
                if(await _brandRepository.SaveAllAsync()) return NoContent();
            }

            return BadRequest("Brand doesn't exist");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Brand>>> GetBrands()
        {
            return Ok(await _brandRepository.GetAllBrands());
        }

        [HttpGet("{id}", Name="GetBrandById")]
        public async Task<ActionResult<Brand>> GetBrandById(int id)
        {
            Brand brand = await _brandRepository.GetBrandById(id);

            return await _brandRepository.GetBrandByName(brand.BrandName);
        }

        [HttpGet("brandname/{brandname}", Name = "GetBrandsByName")]
        public async Task<ActionResult<Brand>> GetBrandsByName(string brandname)
        {
            return await _brandRepository.GetBrandByName(brandname);
        }


        public async Task<bool> BrandExists(string brandname)
        {
            return await _brandRepository.BrandExistsByName(brandname);
        }
    }
}