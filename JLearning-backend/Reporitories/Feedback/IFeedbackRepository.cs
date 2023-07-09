using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public interface IFeedbackRepository
    {
        Feedback FindFeedBackById(int courseId, string email);
        void CreateFeedback(Feedback fb);
        void UpdateFeedback(Feedback fb);
    }
}
