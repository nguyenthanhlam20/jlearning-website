using BusinessObjects.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class TestDAO
    {
        public static List<Test> GetTests()
        {
            var listTests = new List<Test>();
            try
            {
                using (var context = new JlearningContext())
                {
                    listTests = context.Tests
                        .Include(x => x.Questions)
                        .ToList();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return listTests;
        }
        public static Test FindTestById(int id)
        {
            Test test = new Test();
            try
            {
                using (var context = new JlearningContext())
                {
                    test = context.Tests.Include(u => u.Questions).SingleOrDefault(x => x.TestId == id);
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return test;
        }
        public static void CreateTest(Test test)
        {
            try
            {
                using (var context = new JlearningContext())
                {
                    context.Tests.Add(test);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
        public static void UpdateTest(Test test)
        {

            try
            {
                using (var context = new JlearningContext())
                {
                    context.Entry<Test>(test).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
        public static void DeleteTest(Test t)
        {
            try
            {
                using (var context = new JlearningContext())
                {

                    var test = context.Tests.SingleOrDefault(x => x.TestId == t.TestId);
                        // find test done have same test id and remove    
                        var testdone = context.TestDones.Where(x => x.TestId == test.TestId).ToList();
                        context.TestDones.RemoveRange(testdone);
                        // find question have same test id and remove
                        var question = context.Questions.Where(x => x.TestId == test.TestId).ToList();
                        context.Questions.RemoveRange(question);

                    context.Tests.Remove(test);
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
