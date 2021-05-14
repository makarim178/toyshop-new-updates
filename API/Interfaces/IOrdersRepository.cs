using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entity;

namespace API.Interfaces
{
    public interface IOrdersRepository
    {
        Task<Orders> Save(Orders orders);
        void Update(Orders orders);
        void Remove(Orders orders);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<OrdersDto>> GetAll();
        Task<Orders> GetById(int id);
        Task<IEnumerable<Orders>> GetByUserId(int id);
    }
}