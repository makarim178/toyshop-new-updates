using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entity;

namespace API.Interfaces
{
    public interface IOrderDetailRepository
    {
        Task<OrderDetails> Save(OrderDetails orderDetails);
        void Update(OrderDetails orderDetails);
        Task<bool> SaveAllAsync();

        Task<IEnumerable<OrderDetails>> GetAll();

        Task<OrderDetails> GetById(int id);
        Task<IEnumerable<OrderDetails>> GetByOrderId(int orderId);


        

    }
}