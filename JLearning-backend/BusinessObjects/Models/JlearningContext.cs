using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace BusinessObjects.Models
{
    public partial class JlearningContext : DbContext
    {
        public JlearningContext()
        {
        }

        public JlearningContext(DbContextOptions<JlearningContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; } = null!;
        public virtual DbSet<Blog> Blogs { get; set; } = null!;
        public virtual DbSet<BlogCategory> BlogCategories { get; set; } = null!;
        public virtual DbSet<BlogDetail> BlogDetails { get; set; } = null!;
        public virtual DbSet<Chapter> Chapters { get; set; } = null!;
        public virtual DbSet<Contact> Contacts { get; set; } = null!;
        public virtual DbSet<Course> Courses { get; set; } = null!;
        public virtual DbSet<Feedback> Feedbacks { get; set; } = null!;
        public virtual DbSet<Lesson> Lessons { get; set; } = null!;
        public virtual DbSet<LessonDone> LessonDones { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<Question> Questions { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Support> Supports { get; set; } = null!;
        public virtual DbSet<Test> Tests { get; set; } = null!;
        public virtual DbSet<TestDone> TestDones { get; set; } = null!;
        public virtual DbSet<UserCourse> UserCourses { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var builder = new ConfigurationBuilder()
                                 .SetBasePath(Directory.GetCurrentDirectory())
                                 .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                IConfigurationRoot configuration = builder.Build();
                optionsBuilder.UseSqlServer(configuration.GetConnectionString("DB"));
            }

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(e => e.Email)
                    .HasName("PK__Account__AB6E6165C7723627");

                entity.ToTable("Account");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.Address)
                    .HasMaxLength(200)
                    .HasColumnName("address");

                entity.Property(e => e.AvatarUrl).HasColumnName("avatar_url");

                entity.Property(e => e.Gender).HasColumnName("gender");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");

                entity.Property(e => e.Password)
                    .HasMaxLength(100)
                    .HasColumnName("password");

                entity.Property(e => e.Phone)
                    .HasMaxLength(10)
                    .HasColumnName("phone");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.YearOfBirth).HasColumnName("year_of_birth");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Account__role_id__398D8EEE");
            });

            modelBuilder.Entity<Blog>(entity =>
            {
                entity.ToTable("Blog");

                entity.Property(e => e.BlogId).HasColumnName("blog_id");

                entity.Property(e => e.BlogAvatarUrl).HasColumnName("blog_avatar_url");

                entity.Property(e => e.BlogCategoryId).HasColumnName("blog_category_id");

                entity.Property(e => e.BlogDescription)
                    .HasMaxLength(500)
                    .HasColumnName("blog_description");

                entity.Property(e => e.BlogName)
                    .HasMaxLength(100)
                    .HasColumnName("blog_name");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("date")
                    .HasColumnName("created_date");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.HasOne(d => d.BlogCategory)
                    .WithMany(p => p.Blogs)
                    .HasForeignKey(d => d.BlogCategoryId)
                    .HasConstraintName("FK__Blog__blog_categ__3E52440B");
            });

            modelBuilder.Entity<BlogCategory>(entity =>
            {
                entity.ToTable("Blog_Category");

                entity.Property(e => e.BlogCategoryId).HasColumnName("blog_category_id");

                entity.Property(e => e.Name)
                    .HasMaxLength(200)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<BlogDetail>(entity =>
            {
                entity.HasKey(e => e.BlogDetailsId)
                    .HasName("PK__Blog_Det__EBFE2A5425915162");

                entity.ToTable("Blog_Details");

                entity.Property(e => e.BlogDetailsId).HasColumnName("blog_details_id");

                entity.Property(e => e.BlogId).HasColumnName("blog_id");

                entity.Property(e => e.BlogImgUrl).HasColumnName("blog_img_url");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.Header)
                    .HasMaxLength(200)
                    .HasColumnName("header");

                entity.HasOne(d => d.Blog)
                    .WithMany(p => p.BlogDetails)
                    .HasForeignKey(d => d.BlogId)
                    .HasConstraintName("FK__Blog_Deta__blog___412EB0B6");
            });

            modelBuilder.Entity<Chapter>(entity =>
            {
                entity.ToTable("Chapter");

                entity.Property(e => e.ChapterId).HasColumnName("chapter_id");

                entity.Property(e => e.ChapterName)
                    .HasMaxLength(200)
                    .HasColumnName("chapter_name");

                entity.Property(e => e.CourseId).HasColumnName("course_id");

                entity.Property(e => e.Description)
                    .HasMaxLength(500)
                    .HasColumnName("description");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.Chapters)
                    .HasForeignKey(d => d.CourseId)
                    .HasConstraintName("FK__Chapter__course___45F365D3");
            });

            modelBuilder.Entity<Contact>(entity =>
            {
                entity.ToTable("Contact");

                entity.Property(e => e.ContactId).HasColumnName("contact_id");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.Name)
                    .HasMaxLength(200)
                    .HasColumnName("name");

                entity.Property(e => e.RequestDate)
                    .HasColumnType("date")
                    .HasColumnName("request_date");

                entity.Property(e => e.RequestMessage).HasColumnName("request_message");

                entity.Property(e => e.ResponseDate)
                    .HasColumnType("date")
                    .HasColumnName("response_date");

                entity.Property(e => e.ResponseMessage).HasColumnName("response_message");

                entity.Property(e => e.Status).HasColumnName("status");
            });

            modelBuilder.Entity<Course>(entity =>
            {
                entity.ToTable("Course");

                entity.Property(e => e.CourseId).HasColumnName("course_id");

                entity.Property(e => e.CourseAvatarUrl).HasColumnName("course_avatar_url");

                entity.Property(e => e.CourseName)
                    .HasMaxLength(200)
                    .HasColumnName("course_name");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("date")
                    .HasColumnName("created_at");

                entity.Property(e => e.Description)
                    .HasMaxLength(500)
                    .HasColumnName("description");

                entity.Property(e => e.Duration).HasColumnName("duration");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.Status).HasColumnName("status");
            });

            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.ToTable("Feedback");

                entity.Property(e => e.FeedbackId).HasColumnName("feedback_id");

                entity.Property(e => e.CourseId).HasColumnName("course_id");

                entity.Property(e => e.CourseName)
                    .HasMaxLength(500)
                    .HasColumnName("course_name");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.Message)
                    .HasMaxLength(500)
                    .HasColumnName("message");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");

                entity.Property(e => e.Star).HasColumnName("star");

                entity.Property(e => e.UserAvatarUrl).HasColumnName("user_avatar_url");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.CourseId)
                    .HasConstraintName("FK_Feedback_Course");

                entity.HasOne(d => d.EmailNavigation)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.Email)
                    .HasConstraintName("FK__Feedback__email__6E01572D");
            });

            modelBuilder.Entity<Lesson>(entity =>
            {
                entity.ToTable("Lesson");

                entity.Property(e => e.LessonId).HasColumnName("lesson_id");

                entity.Property(e => e.ChapterId).HasColumnName("chapter_id");

                entity.Property(e => e.Description)
                    .HasMaxLength(500)
                    .HasColumnName("description");

                entity.Property(e => e.Duration).HasColumnName("duration");

                entity.Property(e => e.LessonName)
                    .HasMaxLength(200)
                    .HasColumnName("lesson_name");

                entity.Property(e => e.MaterialUrl).HasColumnName("material_url");

                entity.Property(e => e.VideoUrl).HasColumnName("video_url");

                entity.HasOne(d => d.Chapter)
                    .WithMany(p => p.Lessons)
                    .HasForeignKey(d => d.ChapterId)
                    .HasConstraintName("FK__Lesson__chapter___48CFD27E");
            });

            modelBuilder.Entity<LessonDone>(entity =>
            {
                entity.HasKey(e => new { e.LessonId, e.Email, e.CourseId });

                entity.ToTable("Lesson_Done");

                entity.Property(e => e.LessonId).HasColumnName("lesson_id");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.CourseId).HasColumnName("course_id");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.LessonDones)
                    .HasForeignKey(d => d.CourseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Lesson_Do__cours__5FB337D6");

                entity.HasOne(d => d.EmailNavigation)
                    .WithMany(p => p.LessonDones)
                    .HasForeignKey(d => d.Email)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Lesson_Do__email__5DCAEF64");

                entity.HasOne(d => d.Lesson)
                    .WithMany(p => p.LessonDones)
                    .HasForeignKey(d => d.LessonId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Lesson_Do__lesso__5CD6CB2B");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.ToTable("Payment");

                entity.Property(e => e.PaymentId).HasColumnName("payment_id");

                entity.Property(e => e.Address).HasColumnName("address");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.Property(e => e.CourseId).HasColumnName("course_id");

                entity.Property(e => e.CourseName).HasColumnName("course_name");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("date")
                    .HasColumnName("created_date");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.Name).HasColumnName("name");

                entity.Property(e => e.Phone)
                    .HasMaxLength(10)
                    .HasColumnName("phone");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.CourseId)
                    .HasConstraintName("FK__Payment__course___0D7A0286");

                entity.HasOne(d => d.EmailNavigation)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.Email)
                    .HasConstraintName("FK__Payment__email__0C85DE4D");
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.ToTable("Question");

                entity.Property(e => e.QuestionId).HasColumnName("question_id");

                entity.Property(e => e.Answer1)
                    .HasMaxLength(200)
                    .HasColumnName("answer_1");

                entity.Property(e => e.Answer2)
                    .HasMaxLength(200)
                    .HasColumnName("answer_2");

                entity.Property(e => e.Answer3)
                    .HasMaxLength(200)
                    .HasColumnName("answer_3");

                entity.Property(e => e.Answer4)
                    .HasMaxLength(200)
                    .HasColumnName("answer_4");

                entity.Property(e => e.CorrectAnswer).HasColumnName("correct_answer");

                entity.Property(e => e.Description)
                    .HasMaxLength(200)
                    .HasColumnName("description");

                entity.Property(e => e.Explaination).HasColumnName("explaination");

                entity.Property(e => e.TestId).HasColumnName("test_id");

                entity.HasOne(d => d.Test)
                    .WithMany(p => p.Questions)
                    .HasForeignKey(d => d.TestId)
                    .HasConstraintName("FK__Quiz__test_id__52593CB8");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.RoleName)
                    .HasMaxLength(100)
                    .HasColumnName("role_name");
            });

            modelBuilder.Entity<Support>(entity =>
            {
                entity.ToTable("Support");

                entity.Property(e => e.SupportId).HasColumnName("support_id");

                entity.Property(e => e.Message).HasColumnName("message");

                entity.Property(e => e.SupportName)
                    .HasMaxLength(200)
                    .HasColumnName("support_name");
            });

            modelBuilder.Entity<Test>(entity =>
            {
                entity.ToTable("Test");

                entity.Property(e => e.TestId).HasColumnName("test_id");

                entity.Property(e => e.ChapterId).HasColumnName("chapter_id");

                entity.Property(e => e.CourseId).HasColumnName("course_id");

                entity.Property(e => e.Description)
                    .HasMaxLength(300)
                    .HasColumnName("description");

                entity.Property(e => e.Duration).HasColumnName("duration");

                entity.Property(e => e.TestName)
                    .HasMaxLength(200)
                    .HasColumnName("test_name");

                entity.HasOne(d => d.Chapter)
                    .WithMany(p => p.Tests)
                    .HasForeignKey(d => d.ChapterId)
                    .HasConstraintName("FK__Test__chapter_id__4F7CD00D");
            });

            modelBuilder.Entity<TestDone>(entity =>
            {
                entity.HasKey(e => new { e.Email, e.TestId, e.CourseId })
                    .HasName("PK__Test_Don__3BDE8E529F18A729");

                entity.ToTable("Test_Done");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.TestId).HasColumnName("test_id");

                entity.Property(e => e.CourseId).HasColumnName("course_id");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.TestDones)
                    .HasForeignKey(d => d.CourseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Test_Done__cours__09A971A2");

                entity.HasOne(d => d.EmailNavigation)
                    .WithMany(p => p.TestDones)
                    .HasForeignKey(d => d.Email)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Test_Done__email__07C12930");

                entity.HasOne(d => d.Test)
                    .WithMany(p => p.TestDones)
                    .HasForeignKey(d => d.TestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Test_Done__test___08B54D69");
            });

            modelBuilder.Entity<UserCourse>(entity =>
            {
                entity.HasKey(e => new { e.CourseId, e.Email })
                    .HasName("PK__User_Cou__C5A811B88C0BAEA2");

                entity.ToTable("User_Course");

                entity.Property(e => e.CourseId).HasColumnName("course_id");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.EnrolledDate)
                    .HasColumnType("date")
                    .HasColumnName("enrolled_date");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.UserCourses)
                    .HasForeignKey(d => d.CourseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__User_Cour__cours__02FC7413");

                entity.HasOne(d => d.EmailNavigation)
                    .WithMany(p => p.UserCourses)
                    .HasForeignKey(d => d.Email)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__User_Cour__email__03F0984C");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
