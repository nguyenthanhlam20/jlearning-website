using MailKit.Net.Smtp;
using MimeKit;
using MailKit.Security;

namespace WebApi
{
    public class EmailServices
    {

        private static string senderEmail = "nguyenthanhlam7010@gmail.com";
        private static string senderName = "JLearning Website";
        private static string senderPassword = "swttzsrgkdxcrwjs";

        public static void SendEmail(string recipientEmail, string subject, string body)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(senderName, senderEmail));
            message.To.Add(new MailboxAddress("", recipientEmail));

            message.Subject = subject;

            message.Body = new TextPart("plain")
            {
                Text = body
            };

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                client.Authenticate(senderEmail, senderPassword);
                client.Send(message);
                client.Disconnect(true);
            }
        }

        public static void SendHtmlEmail(string recipientEmail, string subject, string htmlBody)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(senderName, senderEmail));
            message.To.Add(new MailboxAddress("", recipientEmail));

            message.Subject = subject;

            var body = new TextPart("html")
            {
                Text = htmlBody
            };

            var multipart = new Multipart("alternative");
            multipart.Add(body);

            message.Body = multipart;

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                client.Authenticate(senderEmail, senderPassword);
                client.Send(message);
                client.Disconnect(true);
            }
        }

        public static void SendHtmlLinkEmail(string recipientEmail, string subject, string linkUrl)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(senderName, senderEmail)); 
            message.To.Add(new MailboxAddress("", recipientEmail)); 

            message.Subject = subject;

            var htmlBody = $@"
            <html>
            <body>
                <h3>Xin chào, đây là đường dẫn thay đổi mật khẩu của bạn!</h3>
                <p>Try cập <a href='{linkUrl}'>tại đây </a> để thay đổi mật khẩu</p>
                <p>Cảm ơn vì đã tin tưởng và sử dụng dịch vụ của chúng tôi!</p>
            </body>
            </html>";

            var body = new TextPart("html")
            {
                Text = htmlBody
            };

            var multipart = new Multipart("alternative");
            multipart.Add(body);

            message.Body = multipart;

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                client.Authenticate(senderEmail, senderPassword);
                client.Send(message);
                client.Disconnect(true);
            }
        }
    }
}
