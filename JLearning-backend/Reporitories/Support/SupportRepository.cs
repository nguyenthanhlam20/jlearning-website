using BusinessObjects.Models;
using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public class SupportRepository : ISupportRepository
    {
        public void CreateSupport(Support support) =>SupportDAO.CreateSupport(support);

        public void DeleteSupport(Support support) =>SupportDAO.DeleteSupport(support);

        public Support FindSupportById(int id) =>SupportDAO.FindSupportById(id);

        public List<Support> GetSupports() => SupportDAO.GetSupports();

        public void UpdateSupport(Support support) =>SupportDAO.UpdateSupport(support); 
    }
}
