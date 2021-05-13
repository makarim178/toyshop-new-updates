using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entity;

namespace API.Interfaces
{
    public interface ICountryRepository
    {
        Task<Country> Save(Country country);
        void Update(Country country);
        void Remove(Country country);

        Task<bool> SaveAllAsync();

        Task<bool> ExistsByName(string countryname);

        Task<IEnumerable<Country>> GetAll();

        Task<Country> GetById(int id);

        Task<Country> GetByName(string countryname);
    }
}