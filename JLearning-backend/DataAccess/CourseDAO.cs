using BusinessObjects.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class CourseDAO
    {
        public static List<Course> GetCourses()
        {
            var listCourses = new List<Course>();
            try
            {
                using (var context = new JlearningContext())
                {
                    listCourses = context.Courses
                        .Include(x => x.Chapters)
                        .ToList();
                    foreach (var list in listCourses)
                    {
                        foreach (var chaps in list.Chapters)
                        {
                            chaps.Lessons = context.Lessons.Where(x => x.ChapterId == chaps.ChapterId).ToList();
                            chaps.Tests = context.Tests.Where(x => x.ChapterId == chaps.ChapterId).ToList();
                            foreach (var item in chaps.Tests)
                            {
                                item.Questions = context.Questions.Where(x => x.TestId == item.TestId).ToList();
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return listCourses;
        }
        public static Course FindCourseById(int id)
        {
            Course course;
            try
            {
                using (var context = new JlearningContext())
                {
                    course = context.Courses.Include(u => u.Chapters).SingleOrDefault(x => x.CourseId == id);
                    foreach (var chaps in course.Chapters)
                    {
                        chaps.Lessons = context.Lessons.Where(x => x.ChapterId == chaps.ChapterId).ToList();
                        chaps.Tests = context.Tests.Where(x => x.ChapterId == chaps.ChapterId).ToList();
                        foreach (var item in chaps.Tests)
                        {
                            item.Questions = context.Questions.Where(x => x.TestId == item.TestId).ToList();
                        }
                    }
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return course;
        }
        public static void CreateCourse(Course c)
        {
            try
            {
                using (var context = new JlearningContext())
                {
                    context.Courses.Add(c);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
        public static void UpdateCourse(Course c)
        {

            try
            {
                using (var context = new JlearningContext())
                {
                    context.Entry<Course>(c).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
        public static List<Course> FindCoursesByEmail(string email)
        {
            var listCourses = new List<Course>();
            try
            {
                using (var context = new JlearningContext())
                {
                    var usercourse = context.UserCourses
                   .Where(x => x.Email == email)
                   .ToList();

                    var courseIds = usercourse.Select(x => x.CourseId).ToList();

                    listCourses = context.Courses
                        .Where(x => courseIds.Contains(x.CourseId))
                        .ToList();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return listCourses;
        }

        public static void CreateUserCourse(UserCourse uc)
        {
            try
            {
                using (var context = new JlearningContext())
                {
                    context.UserCourses.Add(uc);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {

                Console.WriteLine("Error while trying to add new user course: " + e.Message);
            }
        }
    }
}
