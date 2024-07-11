import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DatePicker, Input, Select, Button, Card, Row, Col, Form, Table } from 'antd';
import moment from 'moment';
import { useForm } from 'antd/es/form/Form';
import { format } from 'date-fns';
import api from '../../config/axios';


const { TextArea } = Input;
const { Option } = Select;

const CourtDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { court } = location.state || {};

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingType, setBookingType] = useState('fixed');
  const [months, setMonths] = useState('');
  const [startDate, setStartDate] = useState('');
  const [flexibleBookings, setFlexibleBookings] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
const [form] = useForm();
const [selectedRowKeys, setSelectedRowKeys] = useState([]);
const onSelectChange = (_,newSelectedRowKeys) => {
  console.log('selectedRowKeys changed: ', newSelectedRowKeys);
  setSelectedRowKeys(_);
};
const rowSelection = {
  selectedRowKeys,
  onChange: onSelectChange,
};
  const timeslots = [
    "04:00 - 06:00", "06:00 - 07:00", "07:00 - 08:00",
    "08:00 - 09:00", "09:00 - 10:00", "11:00 - 12:00",
    "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00",
    "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00",
    "18:00 - 19:00", "19:00 - 20:00", "20:00 - 21:00",
    "21:00 - 22:00"
  ];

  if (!court) {
    return <div>Không tìm thấy thông tin sân</div>;
  }

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleAddFlexibleBooking = () => {
    if (selectedDate && selectedTime) {
      setFlexibleBookings([...flexibleBookings, { date: selectedDate, time: selectedTime }]);
      setSelectedDate('');
      setSelectedTime('');
    } else {
      alert("Vui lòng chọn ngày và thời gian trước khi thêm");
    }
  };

  const handleRemoveFlexibleBooking = (index) => {
    const updatedBookings = flexibleBookings.filter((_, i) => i !== index);
    setFlexibleBookings(updatedBookings);
  };

  const handlePayment = () => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Selected Time:", selectedTime);
    console.log("Selected Date:", selectedDate);
    console.log("Booking Type:", bookingType);
    console.log("Months:", months);
    console.log("Start Date:", startDate);
    console.log("Flexible Bookings:", flexibleBookings);
    console.log("Notes:", notes);

    navigate("/confirmation");
  };

  const columns = [
    {
      title: 'Thứ',
      dataIndex: 'day',
    },
  ];
 const data = [
  {
    key: '1',
    day: 'Thứ 2',
  },
  {
    key: '3',
    day: 'Thứ 3',
  },
  {
    key: '4',
    day: 'Thứ 4',
  },
  {
    key: '5',
    day: 'Thứ 5',
  },
  {
    key: '6',
    day: 'Thứ 6',
  },
  {
    key: '7',
    day: 'Thứ 7',
  }
 ]
  const today = moment().format('YYYY-MM-DD');

  const onFinish = async (value) => { 
    value.applicationStartDate = format(new Date(), "dd-MM-yyyy");
    const response = await api.post("/booking/fixed-schedule",{
      "applicationStartDate": value.applicationStartDate,
      "fixedTimeSlots": [
        {
          "dayOfWeek": "string",
          "court": 0,
          "timeslot": [
            0
          ]
        }
      ],
      "durationInMonths": value.durationInMonths
    });
   }

  return (
    <div className="container mx-auto my-8">
      <Row gutter={16}>
        <Col span={12}>
          <img
            className="w-full h-[70vh] object-cover rounded-lg"
            src={court.image}
            alt="Court"
          />
        </Col>
        <Col span={12}>
          <h1 className="text-4xl font-bold mb-4">{court.name}</h1>
          <p className="text-gray-700 text-base mb-2">Khu vực: {court.location}</p>
          <p className="text-gray-700 text-base mb-2">Số sân: {court.courts}</p>
          <div className="text-yellow-500 mb-2">
            {'★'.repeat(court.rating)}
            {'☆'.repeat(5 - court.rating)}
          </div>
          <p className="text-gray-700 text-base mb-2">Giá: {court.price} VNĐ</p>
          <div className="mb-4">
            <span className="text-lg font-semibold">Giờ hoạt động:</span>
            <p className="text-gray-700 text-base">{court.operatingHours.start} - {court.operatingHours.end}</p>
          </div>
          <div className="flex space-x-2 mb-4">
            {court.amenities.includes("Wifi") && <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Wifi</span>}
            {court.amenities.includes("Canteen") && <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Canteen</span>}
            {court.amenities.includes("Parking") && <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Parking</span>}
          </div>

          {step === 1 && (
            <Form title="Chọn loại lịch đặt sân" className="mb-4" >
              <Form.Item>     
              <Select
                value={bookingType}
                onChange={(value) => setBookingType(value)}
                className="w-full mb-4"
              >
                <Option value="fixed">Lịch cố định</Option>
                <Option value="one-time">Lịch ngày</Option>
                <Option value="flexible">Lịch linh hoạt</Option>
              </Select>
              </Form.Item>
              <Form.Item>

              <Button type="primary" onClick={handleNextStep}>Tiếp tục</Button>
              </Form.Item>
            </Form>
          )}

          {step === 2 && bookingType === 'fixed' && (
            <Form title="Chi tiết lịch cố định" className="mb-4" onFinish={onFinish} form={form}>
              <Form.Item label="Ngày bắt đầu" name="applicationStartDate">

              <DatePicker
                className="w-full mb-4"
                onChange={(date, dateString) => setSelectedDate(dateString)}
                disabledDate={(current) => current && current < moment().endOf('day')}
              />
              </Form.Item>
              <Form.Item>

              </Form.Item>
            
              <Form.Item label="Số tháng" name="durationInMonths">

              <Input
                className="w-full mb-4"
                type="number"
                placeholder="Nhập số tháng"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
              />
              </Form.Item>
              <Form.Item label="chọn ngày trong tuần">

              <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
              </Form.Item>
              <Form.Item>
              <Button onClick={()=> form.submit()}>Tiếp tục</Button>
              </Form.Item>
            </Form>
          )}

          {step === 2 && bookingType === 'one-time' && (
            <Card title="Chi tiết lịch ngày" className="mb-4">
              <DatePicker
                className="w-full mb-4"
                onChange={(date, dateString) => setSelectedDate(dateString)}
                disabledDate={(current) => current && current < moment().endOf('day')}
              />
              <Select
                value={selectedTime}
                onChange={(value) => setSelectedTime(value)}
                className="w-full mb-4"
                placeholder="Chọn giờ chơi"
              >
                {timeslots.map(time => <Option key={time} value={time}>{time}</Option>)}
              </Select>
              <Button type="primary" onClick={handleNextStep}>Tiếp tục</Button>
            </Card>
          )}

          {step === 2 && bookingType === 'flexible' && (
            <Card title="Chi tiết lịch linh hoạt" className="mb-4">
              <DatePicker
                className="w-full mb-4"
                onChange={(date, dateString) => setSelectedDate(dateString)}
                disabledDate={(current) => current && current < moment().endOf('day')}
              />
              <Select
                value={selectedTime}
                onChange={(value) => setSelectedTime(value)}
                className="w-full mb-4"
                placeholder="Chọn giờ chơi"
              >
                {timeslots.map(time => <Option key={time} value={time}>{time}</Option>)}
              </Select>
              <Button type="primary" onClick={handleAddFlexibleBooking}>Thêm vào lịch</Button>
              <ul className="list-disc pl-6 mt-4">
                {flexibleBookings.map((booking, index) => (
                  <li key={index} className="mb-2">
                    Ngày: {booking.date}, Giờ: {booking.time}
                    <Button type="link" onClick={() => handleRemoveFlexibleBooking(index)}>Xóa</Button>
                  </li>
                ))}
              </ul>
              <Button type="primary" onClick={handleNextStep}>Tiếp tục</Button>
            </Card>
          )}

          {step === 3 && (
            <Card title="Thông tin đặt sân" className="mb-4">
              <Input
                className="w-full mb-4"
                placeholder="Họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                className="w-full mb-4"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                className="w-full mb-4"
                type="tel"
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextArea
                className="w-full mb-4"
                placeholder="Ghi chú"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button type="primary" onClick={handlePayment}>Đặt sân</Button>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CourtDetails;
