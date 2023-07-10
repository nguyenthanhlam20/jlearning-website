using BusinessObjects.Models;


namespace DataAccess
{
    public class AccountDAO
    {

        public static Account SignIn(Account account)
        {
            try
            {
                using (var context = new JlearningContext())
                {
                    Account ac = context.Accounts.SingleOrDefault(x => x.Email == account.Email && x.Password == account.Password);

                    return ac;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                return null;
            }
            return null;
        }


        public static bool SignUp(Account account)
        {
            try
            {
                using (var context = new JlearningContext())
                {
                    context.Accounts.Add(account);

                    if (context.SaveChanges() > 0)
                    {
                        return true;
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                return false;
            }
            return false;
        }
        public static void UpdateAccount(Account a)
        {

            try
            {
                using (var context = new JlearningContext())
                {
                    context.Entry<Account>(a).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
        }
        public static bool ChangePassword(Account a)
        {
            bool status = false;
            try
            {
                using (var context = new JlearningContext())
                {
                    context.Entry<Account>(a).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    if (context.SaveChanges() > 0)
                    {
                        status = true;
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            return status;
        }
        public static Account FindAccountByEmail(string email)
        {
            Account account = new Account();
            try
            {
                using (var context = new JlearningContext())
                {
                    account = context.Accounts.SingleOrDefault(x => x.Email == email);
                }
            }
            catch (Exception e)
            {

                Console.WriteLine(e.ToString());
            }
            return account;
        }
    }
}
