using BusinessObjects.Models;
using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public class FeedbackRepository : IFeedbackRepository
    {
        public List<Feedback> GetFeebacks() => FeedBackDAO.GetFeebacks();
        public void CreateFeedback(Feedback fb) => FeedBackDAO.CreateFeedback(fb);

        public Feedback FindFeedBackById(int? courseId, string email) => FeedBackDAO.FindFeedBackById(courseId, email);

        public void UpdateFeedback(Feedback fb) => FeedBackDAO.UpdateFeedback(fb);
    }
}
