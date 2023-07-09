using AutoMapper;
using BusinessObjects.DTO;
using BusinessObjects.Models;

namespace WebApi.Config
{
    public class AutoMapperConfig
    {
        public static IMapper Initialize()
        {
            var mapperConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<AccountDTO, Account>()
                 .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.Gender == 1 ? true : false));

                config.CreateMap<Account, AccountDTO>();

                config.CreateMap<InsertAccountDTO, Account>();
                config.CreateMap<GetAccountDTO, Account>();
                config.CreateMap<UpdateAccountDTO, Account>();

                config.CreateMap<BlogDetailDTO, BlogDetail>();
                config.CreateMap<BlogDetail, BlogDetailDTO>();

                config.CreateMap<BlogCategoryDTO, BlogCategory>();
                config.CreateMap<BlogCategory, BlogCategoryDTO>();

                config.CreateMap<BlogDTO, Blog>();
                config.CreateMap<Blog, BlogDTO>().ForMember(dest => dest.BlogDetails, opt => opt.MapFrom(src => src.BlogDetails));

                config.CreateMap<ContactDTO, Contact>();
                config.CreateMap<Contact, ContactDTO>();

                config.CreateMap<FeedbackDTO, Feedback>();
                config.CreateMap<Feedback, FeedbackDTO>();

                // Support
                config.CreateMap<SupportDTO, Support>();
                config.CreateMap<Support, SupportDTO>();

                // Question
                config.CreateMap<QuestionDTO, Question>();
                config.CreateMap<Question, QuestionDTO>();

                // Chapter
                config.CreateMap<ChapterDTO, Chapter>();
                config.CreateMap<DeleteChapterDTO, Chapter>();
                config.CreateMap<UpdateChapterDTO, Chapter>();
                config.CreateMap<InsertChapterDTO, Chapter>();
                config.CreateMap<Chapter, ChapterDTO>();

                // Test
                config.CreateMap<TestDTO, Test>();
                config.CreateMap<GetTestDTO, Test>();
                config.CreateMap<UpdateTestDTO, Test>();
                config.CreateMap<InsertTestDTO, Test>();
                config.CreateMap<DeleteTestDTO, Test>();
                config.CreateMap<Test, TestDTO>();
                config.CreateMap<TestDoneDTO, TestDone>();
                config.CreateMap<TestDone, TestDoneDTO>();

                // Lesson
                config.CreateMap<LessonDTO, Lesson>();
                config.CreateMap<InsertLessonDTO, Lesson>();
                config.CreateMap<UpdateLessonDTO, Lesson>();
                config.CreateMap<DeleteLessonDTO, Lesson>();
                config.CreateMap<Lesson, LessonDTO>();

                config.CreateMap<LessonDoneDTO, LessonDone>();
                config.CreateMap<LessonDone, LessonDoneDTO>();


                // Course
                config.CreateMap<CourseDTO, Course>();
                config.CreateMap<UpdateCourseDTO, Course>();
                config.CreateMap<InsertCourseDTO, Course>();
                config.CreateMap<Course, CourseDTO>();

                config.CreateMap<UserCourseDTO, UserCourse>();
                config.CreateMap<UserCourse, UserCourseDTO>();

                // Payment
                config.CreateMap<PaymentDTO, Payment>();
                config.CreateMap<Payment, PaymentDTO>();

            });

            return mapperConfig.CreateMapper();
        }
    }
}
