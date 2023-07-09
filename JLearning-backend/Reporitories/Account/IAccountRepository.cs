using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessObjects.DTO;
using BusinessObjects.Models;

namespace Reporitories
{
    public interface IAccountRepository
    {
        Account SignIn(Account account);
        bool SignUp(Account account);
        bool ChangePassword(Account account);
        void UpdateAccount(Account account);
        Account FindAccountByEmail(string email);
    }
}
