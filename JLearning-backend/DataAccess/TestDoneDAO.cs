using BusinessObjects.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class TestDoneDAO
    {
        public static ArrayList GetTestDones(int course_id, string email)
        {
            ArrayList listIdTestDone = new ArrayList();
            var listTestDones = new List<TestDone>();
            try
            {
                using (var context = new JlearningContext())
                {
                    listTestDones = context.TestDones
                        .Where(x=>x.CourseId== course_id && x.Email == email).ToList();
                    foreach (var item in listTestDones)
                    {
                        listIdTestDone.Add(item.TestId);
                    }
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return listIdTestDone;
        }
        public static TestDone GetTestDone(int course_id, string email, int test_id)
        {
            TestDone testDone = new TestDone();
            try
            {
                using (var context = new JlearningContext())
                {
                    testDone = context.TestDones
                        .SingleOrDefault(x => x.CourseId == course_id 
                        && x.Email == email 
                        && x.TestId == test_id);
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return testDone;
        }
        public static void CreateTestDone(TestDone testDone)
        {
            try
            {
                using (var context = new JlearningContext())
                {
                    context.TestDones.Add(testDone);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
    }
}
