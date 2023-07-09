using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class FeedBackDAO
    {
        public static Feedback FindFeedBackById(int courseId, string email)
        {
            Feedback fb = new Feedback();
            try
            {
                using (var context = new JlearningContext())
                {
                    fb = context.Feedbacks.SingleOrDefault(x => x.CourseId == courseId && x.Email== email);
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return fb;
        }
        public static void CreateFeedback(Feedback fb)
        {
            try
            {
                using (var context = new JlearningContext())
                {
                    context.Feedbacks.Add(fb);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
        public static void UpdateFeedback(Feedback fb)
        {

            try
            {
                using (var context = new JlearningContext())
                {
                    context.Entry<Feedback>(fb).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
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
