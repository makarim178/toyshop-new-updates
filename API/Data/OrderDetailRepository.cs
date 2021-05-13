using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entity;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class OrderDetailRepository : IOrderDetailRepository
    {
        private readonly DataContext _context;
        public OrderDetailRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<OrderDetails>> GetAll()
        {
            return await _context.OrderDetails.ToListAsync();
        }

        public async Task<OrderDetails> GetById(int id)
        {
            return await _context.OrderDetails.FindAsync(id);
        }

        public async Task<IEnumerable<OrderDetails>> GetByOrderId(int orderId)
        {
            IEnumerable<OrderDetails> od = new List<OrderDetails>();
            od = await _context.OrderDetails.ToListAsync();
            //return await _context.OrderDetails.Where(x=>x.OrdersId == orderId).ToListAsync();
            return od;
        }

        public async Task<OrderDetails> Save(OrderDetails orderDetails)
        {
            _context.OrderDetails.Add(orderDetails);
            await _context.SaveChangesAsync();
            return orderDetails;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0; 
        }

        public void Update(OrderDetails orderDetails)
        {
            _context.Entry(orderDetails).State = EntityState.Modified;
        }
    }
}