using BusinessObjects.Models;


namespace Reporitories
{
    public interface IPaymentRepository
    {
        List<Payment> GetPayments();
        List<Payment> GetPaymentsByUser(string email);

        bool InsertPayment(Payment payment);
    }
}
