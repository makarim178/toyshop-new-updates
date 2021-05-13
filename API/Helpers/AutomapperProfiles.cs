using System.Linq;
using API.DTOs;
using API.Entity;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutomapperProfiles : Profile
    {
        public AutomapperProfiles()
        {
            CreateMap<Product, ProductDto>()
                .ForMember(dest => dest.PhotoUrl, 
                    opt => opt.MapFrom(src =>src.Photos.FirstOrDefault(x=> x.IsMain).Url));
            CreateMap<Orders, OrdersDto> ();
            CreateMap<OrderDetails,OrderDetailsDto>();
            CreateMap<Photo, PhotoDto>();
            CreateMap<AppUser, UserDto>()
                .ForMember(dest => dest.Age, 
                    opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
        }
    }
}