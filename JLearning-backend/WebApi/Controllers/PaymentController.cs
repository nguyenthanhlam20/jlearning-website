using AutoMapper;
using BusinessObjects.DTO;
using BusinessObjects.Models;
using Microsoft.AspNetCore.Mvc;
using Reporitories;
using System;

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
                data = payment,
                url = paymentUrl,
            };
            return Ok(result);
        }

        [HttpGet("get")]
        public ActionResult GetPayments()
        {
            List<Payment> payments = repository.GetPayments();
            return Ok(payments);
        }

        [HttpPost("get/by-user")]
        public ActionResult GetPaymentsByUser([FromBody] GetPaymentDTO GetPaymentDTO)
        {
            List<Payment> payments = repository.GetPaymentsByUser(GetPaymentDTO.Email);
            return Ok(payments);
        }
    }
}
