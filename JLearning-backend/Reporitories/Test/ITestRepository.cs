using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public interface ITestRepository
    {
        List<Test> GetTests();
        Test FindTestById(int id);
        void CreateTest(Test test);
        void UpdateTest(Test test);
        void DeleteTest(Test test);
    }
}
