using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public interface IChapterRepository
    {
        Chapter FindChapterById(int id);
        void CreateChapter(Chapter chapter);
        void UpdateChapter(Chapter chapter);
        void DeleteChapter(Chapter chapter);
    }
}
