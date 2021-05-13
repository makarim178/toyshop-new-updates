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
    public class CountryController : BaseApiController
    {
        private readonly ICountryRepository _countryRepository;
        public CountryController(ICountryRepository countryRepository)
        {
            _countryRepository = countryRepository;
        }

        [HttpPost("country")]
        public async Task<ActionResult<Country>> Addcountry(Country country)
        {
            if (await countryExists(country.Countryname)) return BadRequest(country.Countryname + " already exists");

            await _countryRepository.Save(country);
            
            return country;
        }

        [HttpPut("country")]
        public async Task<ActionResult> Updatecountry(Country country)
        {
            _countryRepository.Update(country);
            if(await _countryRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed To Update country");
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<Country>> Removecountry(int id)
        {
            Country country = await _countryRepository.GetById(id);

            if(country != null) {
                _countryRepository.Remove(country);
                if(await _countryRepository.SaveAllAsync()) return NoContent();
            }

            return BadRequest("country doesn't exist");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Country>>> Getcountries()
        {
            return Ok(await _countryRepository.GetAll());
        }

        [HttpGet("{id}", Name="GetcountryById")]
        public async Task<ActionResult<Country>> GetcountryById(int id)
        {
            Country country = await _countryRepository.GetById(id);

            return await _countryRepository.GetByName(country.Countryname);
        }

        [HttpGet("countryname/{countryname}", Name = "GetcountrysByName")]
        public async Task<ActionResult<Country>> GetcountrysByName(string countryname)
        {
            return await _countryRepository.GetByName(countryname);
        }


        public async Task<bool> countryExists(string countryname)
        {
            return await _countryRepository.ExistsByName(countryname);
        }
    }
}