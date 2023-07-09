using BusinessObjects.Models;
using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public class LessonRepository : ILessonRepository
    {
        public void CreateLesson(Lesson lesson)=>LessonDAO.CreateLesson(lesson);

        public void DeleteLesson(Lesson lesson)=> LessonDAO.DeleteLesson(lesson);

        public Lesson FindLessonById(int id) => LessonDAO.FindLessonById(id);   

        public void UpdateLesson(Lesson lesson) => LessonDAO.UpdateLesson(lesson);
    }
}
