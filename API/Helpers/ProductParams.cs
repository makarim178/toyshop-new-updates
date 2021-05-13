namespace API.Helpers
{
    public class ProductParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;

        public int PageSize {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public string brand { get; set; }
        public string category { get; set; }
        public string searchString { get; set; } = "";
        public string MinAge { get; set; } = "0";
        public string MaxAge { get; set; } = "100";
        public string Gender { get; set; } = "All";

        public string OrderBy { get; set; } 
        
    }
}