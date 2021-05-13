using Braintree;

namespace API.Interfaces
{
    public interface IBraintreeGate
    {
        IBraintreeGateway CreateGateway();

        IBraintreeGateway GetGateWay();

    }
}