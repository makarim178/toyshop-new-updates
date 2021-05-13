using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entity;

namespace API.Interfaces
{
    public interface IContactDetailRepository
    {
         Task<ContactDetail> Save(ContactDetail contactDetail);
         void Update (ContactDetail contactDetail);
         void Remove(ContactDetail contactDetail);

         Task<bool> SaveAllAsync();
         Task<bool> ContactsExistsByEmailAddress(string emailAddress);

         Task<IEnumerable<ContactDetail>> GetAllContactDetails();
 
         Task<ContactDetail> GetContactDetailById(int id);
         Task<ContactDetail> GetContactDetailsByEmailAddress(string emailAddress);
         
    }
}