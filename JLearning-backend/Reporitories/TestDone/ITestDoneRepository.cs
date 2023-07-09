using BusinessObjects.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public interface ITestDoneRepository
    {
        ArrayList GetTestDones(int course_id, string email);
        void CreateTestDone(TestDone testDone);
        TestDone GetTestDone(int course_id, string email, int test_id);
    }
}
