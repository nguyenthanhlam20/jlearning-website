using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class PaymentDAO
    {
        public static List<Payment> GetPayments()
        {
            var listPayments = new List<Payment>();
            try
            {
                using (var context = new JlearningContext())
                {
                    listPayments = context.Payments.ToList();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return listPayments;
        }
        public static List<Payment> GetPaymentsByUser(string email)
        {
            var listPayments = new List<Payment>();
            try
            {
                using (var context = new JlearningContext())
                {
                    listPayments = context.Payments.Where(p => p.Email == email).ToList();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return listPayments;
        }

        public static bool InsertPayment(Payment payment)
        {
            bool insertStatus = false;
            try
            {
                using (var context = new JlearningContext())
                {
                    context.Payments.Add(payment);
                    if (context.SaveChanges() > 0)
                    {
                        insertStatus = true;
                    }
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return insertStatus;
        }
    }
}
