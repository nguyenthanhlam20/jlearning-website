using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public interface ICourseRepository
    {
        List<Course> GetCourses();

        Course FindCourseById(int id);
        void CreateCourse(Course c);
        void UpdateCourse(Course c);
        List<Course> FindCoursesByEmail(string email);
        void CreateUserCourse(UserCourse uc);
    }
}
