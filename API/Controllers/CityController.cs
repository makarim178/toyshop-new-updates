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
    public class CityController : BaseApiController
    {
        private readonly ICityRepository _cityRepository;
        public CityController(ICityRepository cityRepository)
        {
            _cityRepository = cityRepository;
        }

        [HttpPost("city")]
        public async Task<ActionResult<City>> Addcity(City city)
        {
            if (await cityExists(city.Cityname)) return BadRequest(city.Cityname + " already exists");

            await _cityRepository.Save(city);
            
            return city;
        }

        [HttpPut("city")]
        public async Task<ActionResult> Updatecity(City city)
        {
            _cityRepository.Update(city);
            if(await _cityRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed To Update city");
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<City>> Removecity(int id)
        {
            City city = await _cityRepository.GetById(id);

            if(city != null) {
                _cityRepository.Remove(city);
                if(await _cityRepository.SaveAllAsync()) return NoContent();
            }

            return BadRequest("city doesn't exist");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<City>>> Getcountries()
        {
            return Ok(await _cityRepository.GetAll());
        }

        [HttpGet("{id}", Name="GetcityById")]
        public async Task<ActionResult<City>> GetcityById(int id)
        {
            City city = await _cityRepository.GetById(id);

            return await _cityRepository.GetByName(city.Cityname);
        }

        [HttpGet("Cityname/{Cityname}", Name = "GetcitysByName")]
        public async Task<ActionResult<City>> GetcitysByName(string Cityname)
        {
            return await _cityRepository.GetByName(Cityname);
        }


        public async Task<bool> cityExists(string Cityname)
        {
            return await _cityRepository.ExistsByName(Cityname);
        }
    }
}