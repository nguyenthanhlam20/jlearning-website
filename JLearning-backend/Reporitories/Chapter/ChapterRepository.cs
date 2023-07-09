using BusinessObjects.Models;
using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public class ChapterRepository : IChapterRepository
    {
        public void CreateChapter(Chapter chapter) =>ChapterDAO.CreateChapter(chapter);

        public void DeleteChapter(Chapter chapter) => ChapterDAO.DeleteChapter(chapter);

        public Chapter FindChapterById(int id) => ChapterDAO.FindChapterById(id);

        public void UpdateChapter(Chapter chapter) => ChapterDAO.UpdateChapter(chapter);
    }
}
