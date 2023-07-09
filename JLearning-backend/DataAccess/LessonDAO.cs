using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class LessonDAO
    {
        public static Lesson FindLessonById(int id)
        {
            Lesson lesson = new Lesson();
            try
            {
                using (var context = new JlearningContext())
                {
                    lesson = context.Lessons.SingleOrDefault(x => x.LessonId == id);
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return lesson;
        }
        public static void CreateLesson(Lesson lesson)
        {
            try
            {
                using (var context = new JlearningContext())
                {
                    context.Lessons.Add(lesson);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
        public static void UpdateLesson(Lesson lesson)
        {

            try
            {
                using (var context = new JlearningContext())
                {
                    context.Entry<Lesson>(lesson).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
        public static void DeleteLesson(Lesson lesson)
        {
            try
            {
                using (var context = new JlearningContext())
                {
                    // find lesson done and remove
                    var lessionDone = context.LessonDones.Where(x => x.LessonId == lesson.LessonId).ToList();
                    context.LessonDones.RemoveRange(lessionDone);
                    var less = context.Lessons.SingleOrDefault(x => x.LessonId == lesson.LessonId);
                    context.Lessons.Remove(less);
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
