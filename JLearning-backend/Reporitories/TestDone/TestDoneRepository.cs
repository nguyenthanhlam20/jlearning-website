using BusinessObjects.Models;
using DataAccess;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public class TestDoneRepository : ITestDoneRepository
    {
        public void CreateTestDone(TestDone testDone) =>TestDoneDAO.CreateTestDone(testDone);

        public TestDone GetTestDone(int course_id, string email, int test_id) =>TestDoneDAO.GetTestDone(course_id, email, test_id); 

        public ArrayList GetTestDones(int course_id, string email)=> TestDoneDAO.GetTestDones(course_id, email);    
    }
}
