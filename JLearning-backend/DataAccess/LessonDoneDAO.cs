using BusinessObjects.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class LessonDoneDAO
    {
        public static ArrayList GetLessonDones(int course_id, string email)
        {
            ArrayList listIdLessonDone = new ArrayList();
            var listLessonDones = new List<LessonDone>();
            try
            {
                using (var context = new JlearningContext())
                {
                    listLessonDones = context.LessonDones
                        .Where(x => x.CourseId == course_id && x.Email == email).ToList();
                    foreach (var item in listLessonDones)
                    {
                        listIdLessonDone.Add(item.LessonId);
                    }
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return listIdLessonDone;
        }
        public static LessonDone FindLessonDone(int course_id, string email, int lesson_id)
        {
            LessonDone lessonDone = new LessonDone();
            try
            {
                using (var context = new JlearningContext())
                {
                    lessonDone = context.LessonDones
                        .SingleOrDefault(x => x.CourseId == course_id
                        && x.Email == email
                        && x.LessonId == lesson_id);
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return lessonDone;
        }
        public static void CreateLessonDone(LessonDone lessonDone)
        {
            try
            {
                using (var context = new JlearningContext())
                {
                    context.LessonDones.Add(lessonDone);
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
