using MailKit.Net.Smtp;
using MimeKit;

namespace TechWorldAPI.Services.MailService
{
    public class MailService
    {
        private readonly string smtpServer = "smtp.gmail.com"; // For Gmail
        private readonly int smtpPort = 587;
        private readonly string senderEmail = "techworldmailtwm@gmail.com";
        private readonly string senderPassword = "yxlx wmmi txwt vtvp"; // use App Password if Gmail

        public void SendEmail(string toEmail, string subject, string body)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Tech World", senderEmail));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = subject;
            message.Body = new TextPart("plain") { Text = body };

            using (var client = new SmtpClient())
            {
                client.Connect(smtpServer, smtpPort, false);
                client.Authenticate(senderEmail, senderPassword);
                client.Send(message);
                client.Disconnect(true);
            }
        }
    }
}
