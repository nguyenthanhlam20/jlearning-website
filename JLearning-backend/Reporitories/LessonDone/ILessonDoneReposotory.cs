using BusinessObjects.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public interface ILessonDoneReposotory
    {
        ArrayList GetLessonDones(int course_id, string email);
        LessonDone FindLessonDone(int course_id, string email, int lesson_id);
        void CreateLessonDone(LessonDone lessonDone);
    }
}
