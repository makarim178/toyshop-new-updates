using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entity;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ContactDetailRepository : IContactDetailRepository
    {
        private readonly DataContext _context;
        public ContactDetailRepository(DataContext context)
        {
            _context = context;
        }

        public async  Task<IEnumerable<ContactDetail>> GetAllContactDetails()
        {
            return await _context.ContactDetail.ToListAsync();
        }

        public async Task<ContactDetail> GetByContactDetailId(int id)
        {
            return await _context.ContactDetail.FindAsync(id);
        }

        public async Task<ContactDetail> Save(ContactDetail contactDetail)
        {
            _context.ContactDetail.Add(contactDetail);
            await _context.SaveChangesAsync();
            return contactDetail;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(ContactDetail contactDetail)
        {
            _context.Entry(contactDetail).State = EntityState.Modified;
        }
    }
}