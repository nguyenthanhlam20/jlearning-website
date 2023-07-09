using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public interface ILessonRepository
    {
        Lesson FindLessonById(int id);
        void CreateLesson(Lesson lesson);
        void UpdateLesson(Lesson lesson);
        void DeleteLesson(Lesson lesson);
    }
}
