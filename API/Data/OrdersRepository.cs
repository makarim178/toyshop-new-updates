using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entity;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class OrdersRepository : IOrdersRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public OrdersRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<OrdersDto>> GetAll()
        {

            var orders = await _context.Orders
                .Include(c => c.ContactDetail)
                // .Join(_context.OrderDetails,
                //     entryPoint => entryPoint.Id,
                //     entry => entry.Id,
                //     (entryPoint, entry) => new{entryPoint, entry}
                //     )
                .ProjectTo<OrdersDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return orders;

        }

        public async Task<Orders> GetById(int id)
        {
            var query = _context.Orders.AsQueryable();

            return await _context.Orders
                .Where(x => x.Id == id)
                .Include(c => c.ContactDetail)
                .Include(a => a.AppUser)
                .Include(o => o.OrderDetails)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Orders>> GetByUserId(int id)
        {
            return await _context.Orders
                .Where(x => x.AppUserId == id)
                .Include(c => c.ContactDetail)
                .Include(a => a.AppUser)
                .Include(o => o.OrderDetails)
                .ToListAsync();
        }

        public void Remove(Orders orders)
        {
            _context.Orders.Remove(orders);
        }

        public async Task<Orders> Save(Orders orders)
        {
            _context.Orders.Add(orders);
            await _context.SaveChangesAsync();
            return orders;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Orders orders)
        {
            _context.Entry(orders).State = EntityState.Modified;
        }

    }
}