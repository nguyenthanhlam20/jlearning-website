using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class ChapterDAO
    {
        public static Chapter FindChapterById(int id)
        {
            Chapter chapter = new Chapter();
            try
            {
                using (var context = new JlearningContext())
                {
                    chapter = context.Chapters.SingleOrDefault(x => x.ChapterId == id);
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return chapter;
        }
        public static void CreateChapter(Chapter chapter)
        {
            try
            {
                using (var context = new JlearningContext())
                {
                    context.Chapters.Add(chapter);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
        public static void UpdateChapter(Chapter chapter)
        {

            try
            {
                using (var context = new JlearningContext())
                {
                    context.Entry<Chapter>(chapter).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
        public static void DeleteChapter(Chapter chapter)
        {
            try
            {
                using (var context = new JlearningContext())
                {
                    // delete all test have same chapterId
                    var test = context.Tests.Where(x => x.ChapterId == chapter.ChapterId).ToList();
                    foreach (var item in test)
                    {
                        // find testdone have same test id and remove
                        var testdone = context.TestDones.Where(x => x.TestId == item.TestId).ToList();
                        context.TestDones.RemoveRange(testdone);
                        // find question have same test id and remove
                        var question = context.Questions.Where(x => x.TestId == item.TestId).ToList();
                        context.Questions.RemoveRange(question);
                    }
                    context.Tests.RemoveRange(test);

                    // delete lesson have same chapter id
                    var lesson = context.Lessons.Where(x => x.ChapterId == chapter.ChapterId).ToList();
                    foreach (var item in lesson)
                    {
                        // find lesson done and remove
                        var lessionDone = context.LessonDones.Where(x => x.LessonId == item.LessonId).ToList();
                        context.LessonDones.RemoveRange(lessionDone);
                    }
                    context.Lessons.RemoveRange(lesson);

                    var chap = context.Chapters.SingleOrDefault(x => x.ChapterId == chapter.ChapterId);
                    context.Chapters.Remove(chap);
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
