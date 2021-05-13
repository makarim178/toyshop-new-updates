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
    public class ProvinceController : BaseApiController
    {
        private readonly IProvinceRepository _provinceRepository;
        public ProvinceController(IProvinceRepository provinceRepository)
        {
            _provinceRepository = provinceRepository;
        }

        [HttpPost("province")]
        public async Task<ActionResult<Province>> Addprovince(Province province)
        {
            if (await provinceExists(province.Provincename)) return BadRequest(province.Provincename + " already exists");

            await _provinceRepository.Save(province);
            
            return province;
        }

        [HttpPut("province")]
        public async Task<ActionResult> Updateprovince(Province province)
        {
            _provinceRepository.Update(province);
            if(await _provinceRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed To Update province");
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<Province>> Removeprovince(int id)
        {
            Province province = await _provinceRepository.GetById(id);

            if(province != null) {
                _provinceRepository.Remove(province);
                if(await _provinceRepository.SaveAllAsync()) return NoContent();
            }

            return BadRequest("province doesn't exist");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Province>>> Getcountries()
        {
            return Ok(await _provinceRepository.GetAll());
        }

        [HttpGet("{id}", Name="GetprovinceById")]
        public async Task<ActionResult<Province>> GetprovinceById(int id)
        {
            Province province = await _provinceRepository.GetById(id);

            return await _provinceRepository.GetByName(province.Provincename);
        }

        [HttpGet("provincename/{provincename}", Name = "GetprovincesByName")]
        public async Task<ActionResult<Province>> GetprovincesByName(string provincename)
        {
            return await _provinceRepository.GetByName(provincename);
        }


        public async Task<bool> provinceExists(string provincename)
        {
            return await _provinceRepository.ExistsByName(provincename);
        }
    }
}