using BusinessObjects.Models;
using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reporitories
{
    public class CourseRepository : ICourseRepository
    {
        public void CreateCourse(Course c) =>CourseDAO.CreateCourse(c);

        public void CreateUserCourse(UserCourse uc)=> CourseDAO.CreateUserCourse(uc);

        public Course FindCourseById(int id) =>CourseDAO.FindCourseById(id);

        public List<Course> FindCoursesByEmail(string email) => CourseDAO.FindCoursesByEmail(email);

        public List<Course> GetCourses() =>CourseDAO.GetCourses();

        public void UpdateCourse(Course c) =>CourseDAO.UpdateCourse(c);
    }
}
