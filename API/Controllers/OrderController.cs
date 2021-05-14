using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entity;
using API.Interfaces;
using AutoMapper;
using Braintree;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ordersController : BaseApiController
    {

        private readonly IBraintreeGate _brain;

        private readonly IOrdersRepository _ordersRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IProductRepository _productRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IUserRepository _userRepository;

        public ordersController(IBraintreeGate brain, IMapper mapper, IOrdersRepository ordersRepository, DataContext context, IProductRepository productRepository, IOrderDetailRepository orderDetailRepository, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _orderDetailRepository = orderDetailRepository;
            _productRepository = productRepository;
            _context = context;
            _mapper = mapper;
            _ordersRepository = ordersRepository;
            _brain = brain;
        }

        public class ClientToken
        {
            public string token { get; set; }
            public ClientToken(string token)
            {
                this.token = token;
            }

        }

        public class Nonce
        {
            public string nonce { get; set; }
            public decimal chargeAmount { get; set; }

            public Nonce(string nonce)
            {
                this.nonce = nonce;
                this.chargeAmount = chargeAmount;
            }
        }

        [HttpGet("getclienttoken")]
        public ActionResult<ClientToken> GetToken()
        {

            var getway = _brain.GetGateWay();
            var clientToken = getway.ClientToken.Generate();

            ClientToken ct = new ClientToken(clientToken);

            return Ok(ct);
        }

        public class resultDto
        {
            public string nonce { get; set; }
            public string status { get; set; }
        }


        [HttpPost("verifypayment")]
        public ActionResult<resultDto> VerifyPayment([FromBody] Nonce nonce)
        {
            Console.WriteLine("\n\nNonce: " + nonce);
            var getway = _brain.GetGateWay();
            var request = new TransactionRequest
            {
                Amount = Convert.ToDecimal(nonce.chargeAmount),
                PaymentMethodNonce = nonce.nonce,
                Options = new TransactionOptionsRequest
                {
                    SubmitForSettlement = true
                }
            };


            Result<Transaction> result = getway.Transaction.Sale(request);

            Console.WriteLine("\n\nresult: " + result.Target.ProcessorResponseText);
            if (result.Target.ProcessorResponseText == "Approved")
            {
                Console.WriteLine("\nis it approved? : " + nonce.nonce);
                var returnResult = new resultDto
                {
                    nonce = nonce.nonce,
                    status = "Approved"
                };

                return Ok(returnResult);

            }

            Console.WriteLine("\n it is not approved " + nonce.nonce);
            return BadRequest("Not approved");
        }

        [HttpPost("orders")]
        public async Task<ActionResult<Orders>> Addorders(Orders orders)
        {

            var appUser = await _userRepository.GetUserByIdAsync(orders.AppUserId);

            var orderDetails = orders.OrderDetails;

            //orders.OrderDetails = null;

            foreach (var od in orderDetails)
            {
                var pdid = od.ProductId;
                var product = await _productRepository.GetProductById(pdid);
                
            }
            

            var cd = new ContactDetail 
            {
                Street = orders.ContactDetail.Street,
                City = orders.ContactDetail.City,
                PostalCode = orders.ContactDetail.PhoneNumber,
                Province = orders.ContactDetail.Province,
                Country = orders.ContactDetail.Country,
                EmailAddress = orders.ContactDetail.EmailAddress,
                PhoneNumber = orders.ContactDetail.PhoneNumber
            };

            orders.CreatedDate = DateTime.Now;
            orders.LastUpdated = DateTime.Now;
            await _ordersRepository.Save(orders);


            orders.AppUser = appUser;

            orders.ContactDetail = cd;
            if (await _ordersRepository.SaveAllAsync()) {
                return orders;
            }

            // foreach (var od in orderDetails)
            // {
            //     OrderDetails odd = new OrderDetails{

            //     }
            // }

            return orders;
        }

        [HttpPost("orderDetails")]
        public async Task<ActionResult<OrderDetails>> SaveOrderDetails(OrderDetails orderDetails)
        {
            await _orderDetailRepository.Save(orderDetails);

            return orderDetails;
        }

        [HttpGet("orderdetails/{orderid}")]
        public async Task<ActionResult<IEnumerable<OrderDetails>>> GetOrdersByOrderId(int orderid)
        {
            return Ok(await _orderDetailRepository.GetByOrderId(orderid));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrdersDto>>> GetOrders()
        {
            return Ok(await _ordersRepository.GetAll());
        }

        [HttpGet("{id}", Name = "GetordersById")]
        public async Task<ActionResult<OrdersDto>> GetordersById(int id)
        {
            var order = await _ordersRepository.GetById(id);

            
            ICollection<OrderDetailsDto> odds =  new List<OrderDetailsDto>();

            foreach (var item in order.OrderDetails)
            {
                var product = await _productRepository.GetProductById(item.ProductId);
                //Console.WriteLine("###############################" + item.ProductId);
                OrderDetailsDto o = new OrderDetailsDto{
                    Id = item.Id,
                    Product = product,
                    CartQty = item.CartQty,
                    ProductPrice = item.productPrice
                };

                odds.Add(o);
            }

            OrdersDto newOrder = new OrdersDto{
                Id = order.Id,
                UserType = order.UserType,
                OrderDetails = odds,
                AppUser = order.AppUser,
                ContactDetails = order.ContactDetail,
                OrderStatus = order.OrderStatus,
                CreatedDate = order.CreatedDate,
                LastUpdated = order.LastUpdated
            };
            
            return newOrder;
        }
    }
}