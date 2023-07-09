using BusinessObjects.Models;
using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public class TestRepository : ITestRepository
    {
        public void CreateTest(Test test) => TestDAO.CreateTest(test);

        public void DeleteTest(Test test) => TestDAO.DeleteTest(test);

        public Test FindTestById(int id) => TestDAO.FindTestById(id);

        public List<Test> GetTests() => TestDAO.GetTests();

        public void UpdateTest(Test test) =>TestDAO.UpdateTest(test);
    }
}
