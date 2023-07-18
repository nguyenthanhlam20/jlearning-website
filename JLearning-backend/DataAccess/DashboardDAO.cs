using BusinessObjects.DTO;
using BusinessObjects.Models;
using Newtonsoft.Json;
using System.Xml;

namespace DataAccess
{
    public class DashboardDAO
    {
        public static string GetData()
        {
            using (var context = new JlearningContext())
            {
                int totalCourse = context.Courses.Count();
                int totalBlog = context.Blogs.Count();
                int totalUser = context.Accounts.Where(x => x.RoleId != 1).Count();
                List<Payment> topPayment = context.Payments.OrderByDescending(x => x.Amount).ToList();



                double totalAmount = (double)topPayment.Sum(x => x.Amount);


                List<Course> courses = context.Courses.Where(x => x.CourseId != 31).ToList();
                List<object> totalMoneyByCourses = new List<object>();

                foreach (Course course in courses)
                {
                    double total = (double)topPayment.Where(x => x.CourseId == course.CourseId).Sum(x => x.Amount);

                    var co = new
                    {
                        course_name = course.CourseName,
                        total_amount = total,
                    };

                    totalMoneyByCourses.Add(co);
                }


                List<object> payments = new List<object>();
                foreach(Payment p in topPayment)
                {
                    var pt = new 
                    {
                        course_id = p.CourseId,
                        course_name = p.CourseName,
                        payment_id = p.PaymentId,
                        email =p.Email,
                        address = p.Address,
                        emount = (double)p.Amount,
                        created_date = p.CreatedDate,
                        name = p.Name,
                        phone = p.Phone,
                    };
                    payments.Add(pt);
                }

                var result = new
                {
                    total_blog = totalBlog,
                    total_course = totalCourse,
                    total_user = totalUser,
                    total_amount = totalAmount,
                    top_orders = payments,
                    total_money_by_course = totalMoneyByCourses,
                };

                var jsonSerializerSettings = new JsonSerializerSettings
                {
                    MaxDepth = 500 // Set the MaxDepth to a larger value, you can adjust it based on your requirements
                };

                string jsonResult = JsonConvert.SerializeObject(result, Newtonsoft.Json.Formatting.Indented, jsonSerializerSettings);

                return jsonResult;
            }
        }
    }
}
