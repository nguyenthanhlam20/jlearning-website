using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public class DashboardRepository : IDashboardRepository
    {
        public object GetData()
        {
            return DashboardDAO.GetData();
        }
    }
}
