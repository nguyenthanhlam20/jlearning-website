using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class QuestionDAO
    {
        public static Question FindQuestionById(int id)
        {
            Question question = new Question();
            try
            {
                using (var context = new JlearningContext())
                {
                    question = context.Questions.SingleOrDefault(x => x.QuestionId == id);
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return question;
        }
        public static void CreateQuestion(Question question)
        {
            try
            {
                using (var context = new JlearningContext())
                {
                    context.Questions.Add(question);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
        public static void UpdateQuestion(Question question)
        {

            try
            {
                using (var context = new JlearningContext())
                {
                    context.Entry<Question>(question).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }
        public static void DeleteQuestion(Question question)
        {
            try
            {
                using (var context = new JlearningContext())
                {
                    var ques = context.Questions.SingleOrDefault(x => x.QuestionId == question.QuestionId);
                    context.Questions.Remove(ques);
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
