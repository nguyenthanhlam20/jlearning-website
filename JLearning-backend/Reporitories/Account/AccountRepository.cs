using BusinessObjects.DTO;
using BusinessObjects.Models;
using DataAccess;


namespace Reporitories
{
    public class AccountRepository : IAccountRepository
    {
        public bool ChangePassword(Account account) => AccountDAO.ChangePassword(account);

        public Account FindAccountByEmail(string email)=>AccountDAO.FindAccountByEmail(email);

        public Account SignIn(Account account) => AccountDAO.SignIn(account);
        public bool SignUp(Account account) => AccountDAO.SignUp(account);

        public void UpdateAccount(Account account)=> AccountDAO.UpdateAccount(account);
    }
}
