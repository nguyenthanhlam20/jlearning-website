using AutoMapper;
using BusinessObjects.DTO;
using BusinessObjects.Models;
using Microsoft.AspNetCore.Mvc;
using Reporitories;
using System;
using static System.Net.Mime.MediaTypeNames;

namespace WebApi.Controllers
{
    [Route("api/payment")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private IPaymentRepository repository = new PaymentRepository();
        private IHttpContextAccessor httpContextAccessor;

        private readonly IMapper _mapper;

        // Get mapper singleton
        public PaymentController(IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
        }


        // POST api/<LessonController>
        [HttpPost("insert")]
        public ActionResult InsertPayment([FromBody]PaymentDTO paymentDTO)
        {
            Payment payment = _mapper.Map<Payment>(paymentDTO);


            string htmlBody = $@"
            <html>
            <head>
                <title>Hóa Đơn Mua Khóa Học</title>
                <style>
                    /* Your invoice styling goes here */
                    table {{
                        border-collapse: collapse;
                        width: 100%;
                        font-family: Arial, sans-serif;
                    }}
                    th, td {{
                        border: 1px solid #ddd;
                        padding: 12px;
                    }}
                    th {{
                        background-color: #f2f2f2;
                    }}
                    tr:nth-child(even) {{
                        background-color: #f2f2f2;
                    }}
                    body {{
                        font-family: Arial, sans-serif;
                    }}
                    .invoice {{
                        max-width: 800px;
                        margin: 0 auto;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        padding: 20px;
                        background-color: #fff;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }}
                    .invoice-header {{
                        text-align: center;
                        margin-bottom: 20px;
                    }}
                    .invoice-header h2 {{
                        margin: 0;
                    }}
                    .invoice-logo {{
                        display: block;
                        max-width: 200px;
                        margin: 0 auto;
                        margin-bottom: 20px;
                    }}
                    .invoice-footer {{
                        text-align: center;
                        margin-top: 20px;
                        font-size: 12px;
                        color: #888;
                    }}
                </style>
            </head>
            <body>
                <div class='invoice'>
                    <div class='invoice-header'>
                        <h2>Hóa Đơn Mua Khóa Học</h2>
                    </div>
                    <div class='invoice-details'>
                        <table>
                            <tr>
                                <th>Khách hàng</th>
                                <td>{paymentDTO.Name}</td>
                            </tr>
                            <tr>
                                <th>Tên khóa học</th>
                                <td>{paymentDTO.CourseName}</td>
                            </tr>
                            <tr>
                                <th>Giá</th>
                                <td>{paymentDTO.Amount.ToString("N0") + "đ"}</td>
                            </tr>
                            <tr>
                                <th>Ngày mua</th>
                                <td>{DateTime.Now}</td>
                            </tr>
                            <tr>
                                <th>Nhà cung cấp</th>
                                <td>{"JLearning Website"}</td>
                            </tr>
                        </table>
                    </div>
                    <div class='invoice-footer'>
                        <!-- Add your footer content here -->
                        <p>Liên hệ: nguyenthanhlam7010@gmail.com</p>
                        <p>Cảm ơn vì đã tin tưởng và dùng dịch vụ của chúng tôi!</p>
                    </div>
                </div>
            </body>
            </html>";

            EmailServices.SendHtmlEmail(paymentDTO.Email, "Hóa Đơn Mua Khóa Học Tại JLearning Website", htmlBody);

            repository.InsertPayment(payment);
            return Ok();
        }

        // POST api/<LessonController>
        [HttpPost("create")]
        public ActionResult CreatePayment([FromBody] PaymentDTO paymentDTO)
        {
            Payment payment = _mapper.Map<Payment>(paymentDTO);
            string vnp_Returnurl = "http://localhost:3000/authen/payment/result"; //URL nhan ket qua tra ve 
            string vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
            string vnp_TmnCode = "5CHD6YSI";
            string vnp_HashSecret = "JFDZKGEGMRCNMVWNYCXATQSFFGSBKDIW"; //Chuoi bi mat



            //Get payment input
            OrderInfo order = new OrderInfo();
            order.OrderId = DateTime.Now.Ticks; // Giả lập mã giao dịch hệ thống merchant gửi sang VNPAY
            order.Amount = paymentDTO.Amount; // Giả lập số tiền thanh toán hệ thống merchant gửi sang VNPAY 100,000 VND
            order.Status = "0"; //0: Trạng thái thanh toán "chờ thanh toán" hoặc "Pending" khởi tạo giao dịch chưa có IPN
            order.CreatedDate = DateTime.Now;
            //Save order to db

            Console.WriteLine("Amount: " + order.Amount);
            //Build URL for VNPAY
            VnPayLibrary vnpay = new VnPayLibrary();

            vnpay.AddRequestData("vnp_Version", VnPayLibrary.VERSION);
            vnpay.AddRequestData("vnp_Command", "pay");
            vnpay.AddRequestData("vnp_TmnCode", vnp_TmnCode);
            vnpay.AddRequestData("vnp_Amount", (order.Amount * 100).ToString()); //Số tiền thanh toán. Số tiền không mang các ký tự phân tách thập phân, phần nghìn, ký tự tiền tệ. Để gửi số tiền thanh toán là 100,000 VND (một trăm nghìn VNĐ) thì merchant cần nhân thêm 100 lần (khử phần thập phân), sau đó gửi sang VNPAY là: 10000000
            vnpay.AddRequestData("vnp_BankCode", "");

            vnpay.AddRequestData("vnp_CreateDate", order.CreatedDate.ToString("yyyyMMddHHmmss"));
            vnpay.AddRequestData("vnp_CurrCode", "VND");
            vnpay.AddRequestData("vnp_IpAddr", "127.0.0.1");

            vnpay.AddRequestData("vnp_Locale", "vn");
            vnpay.AddRequestData("vnp_OrderInfo", "Thanh toan don hang:" + order.OrderId);
            vnpay.AddRequestData("vnp_OrderType", "other"); //default value: other

            vnpay.AddRequestData("vnp_ReturnUrl", vnp_Returnurl);
            vnpay.AddRequestData("vnp_TxnRef", order.OrderId.ToString()); // Mã tham chiếu của giao dịch tại hệ thống của merchant. Mã này là duy nhất dùng để phân biệt các đơn hàng gửi sang VNPAY. Không được trùng lặp trong ngày

            //Add Params of 2.1.0 Version
            //Billing

            string paymentUrl = vnpay.CreateRequestUrl(vnp_Url, vnp_HashSecret);
            Console.WriteLine(paymentUrl);

            var result = new
            {
                data = paymentDTO,
                url = paymentUrl,
            };
            return Ok(result);
        }

        [HttpGet("get")]
        public ActionResult GetPayments()
        {
            IEnumerable<Payment> payments = repository.GetPayments();
            IEnumerable<PaymentDTO> paymentDTOs = _mapper.Map<IEnumerable<PaymentDTO>>(payments);
            return Ok(paymentDTOs);
        }

        [HttpPost("get/by-user")]
        public ActionResult GetPaymentsByUser([FromBody] GetPaymentDTO GetPaymentDTO)
        {
            IEnumerable<Payment> payments = repository.GetPaymentsByUser(GetPaymentDTO.Email);
            IEnumerable<PaymentDTO> paymentDTOs = _mapper.Map<IEnumerable<PaymentDTO>>(payments);
            return Ok(paymentDTOs);
        }
    }
}
