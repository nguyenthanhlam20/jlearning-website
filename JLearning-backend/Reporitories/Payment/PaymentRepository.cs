using BusinessObjects.Models;
using BusinessObjects.DTO;
using DataAccess;
using Microsoft.Extensions.Configuration;

namespace Reporitories
{
    public class PaymentRepository : IPaymentRepository
    {
        public List<Payment> GetPaymentsByUser(string email) => PaymentDAO.GetPaymentsByUser(email);
        public List<Payment> GetPayments() => PaymentDAO.GetPayments();

        public bool InsertPayment(Payment payment) => PaymentDAO.InsertPayment(payment);

       
    }
}
