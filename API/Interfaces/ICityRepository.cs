using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entity;

namespace API.Interfaces
{
    public interface ICityRepository
    {
        Task<City> Save(City city);
        void Update(City city);
        void Remove(City city);

        Task<bool> SaveAllAsync();

        Task<bool> ExistsByName(string cityname);

        Task<IEnumerable<City>> GetAll();

        Task<City> GetById(int id);

        Task<City> GetByName(string cityname);
    }
}