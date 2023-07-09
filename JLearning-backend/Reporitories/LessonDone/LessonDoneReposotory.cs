using BusinessObjects.Models;
using DataAccess;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public class LessonDoneReposotory : ILessonDoneReposotory
    {
        public void CreateLessonDone(LessonDone lessonDone) =>
            LessonDoneDAO.CreateLessonDone(lessonDone);

        public LessonDone FindLessonDone
            (int course_id, string email, int lesson_id)=> 
            LessonDoneDAO.FindLessonDone(course_id, email, lesson_id);
        public ArrayList GetLessonDones(int course_id, string email)=>
            LessonDoneDAO.GetLessonDones (course_id, email);
    }
}
