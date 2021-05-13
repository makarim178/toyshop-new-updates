using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entity;

namespace API.Interfaces
{
    public interface IProvinceRepository
    {
        Task<Province> Save(Province province);
        void Update(Province province);
        void Remove(Province province);

        Task<bool> SaveAllAsync();

        Task<bool> ExistsByName(string provincename);

        Task<IEnumerable<Province>> GetAll();

        Task<Province> GetById(int id);

        Task<Province> GetByName(string provincename);
    }
}