using BusinessObjects.Models;
using System;

namespace DataAccess
{
    public class DashboardDAO
    {
        public static object GetData()
        {
            using (var context = new JlearningContext())
            {
                int totalCourse = context.Courses.Count();
                int totalBlog = context.Blogs.Count();
                int totalUser = context.Accounts.Where(x => x.RoleId != 1).Count();
                double totalAmount = (double)context.Payments.Sum(x => x.Amount);

                List<Payment> topPayment = context.Payments.OrderByDescending(x => x.Amount).ToList();


                List<Course> courses = context.Courses.ToList();
                List<object> totalMoneyByCourses = new List<object>();

                foreach (Course course in courses)
                {
                    double total = (double)context.Payments.Where(x => x.CourseId == course.CourseId).Sum(x => x.Amount);

                    var co = new
                    {
                        course_name = course.CourseName,
                        total_amount = total,
                    };

                    totalMoneyByCourses.Add(co);
                }

                var result = new
                {
                    total_blog = totalBlog,
                    total_course = totalCourse,
                    total_user = totalUser,
                    total_amount = totalAmount,
                    top_orders = topPayment,
                    total_money_by_course = totalMoneyByCourses,
                };

                return result;
            }
        }
    }
}
