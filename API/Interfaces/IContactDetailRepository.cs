using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entity;

namespace API.Interfaces
{
    public interface IContactDetailRepository
    {
        Task<ContactDetail> Save(ContactDetail contactDetail);
        void Update(ContactDetail contactDetail);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<ContactDetail>> GetAllContactDetails();
        
        Task<ContactDetail> GetByContactDetailId(int id);
    }
}