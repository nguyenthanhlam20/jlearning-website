using BusinessObjects.Models;
using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public class QuestionRepository : IQuestionRepository
    {
        public void CreateQuestion(Question question) => QuestionDAO.CreateQuestion(question);

        public void DeleteQuestion(Question question) =>QuestionDAO.DeleteQuestion(question);

        public Question FindQuestionById(int id) => QuestionDAO.FindQuestionById(id);

        public void UpdateQuestion(Question question) =>QuestionDAO.UpdateQuestion(question);
    }
}
