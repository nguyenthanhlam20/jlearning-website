using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public interface ISupportRepository
    {
        List<Support> GetSupports();
        Support FindSupportById(int id);
        void CreateSupport(Support support);
        void UpdateSupport(Support support);
        void DeleteSupport(Support support);
    }
}
