import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const UserProfile = () => {
  // Giả lập dữ liệu người dùng và ví
  const [user, setUser] = useState({
    name: "Nam Dương",
    email: "duongphuongnam2204@gmail.com",
    balance: 1000, // Số dư ban đầu
    transactions: [
      {
        invoice: "233b3968-f0b0-4fc5-ae4e-c0387c818a3a",
        transferTo: "VNPAY",
        date: "Fri Jul 05 2024",
        tags: "Deposit",
        amount: 20,
      },
      {
        invoice: "d63ab6f7-91fa-45c4-9222-21526f8150b6",
        transferTo: "VNPAY",
        date: "Fri Jul 05 2024",
        tags: "Deposit",
        amount: 200,
      },
      {
        invoice: "8ae67cad-531d-40e0-a191-07e0f2a203ae",
        transferTo: "VNPAY",
        date: "Fri Jul 05 2024",
        tags: "Deposit",
        amount: 200,
      },
      {
        invoice: "9a72747a-c58b-418e-ac7d-8d93cf0db3ae",
        transferTo: "VNPAY",
        date: "Fri Jul 05 2024",
        tags: "Deposit",
        amount: 3,
      },
    ],
    orders: [
      {
        id: "1",
        date: "Fri Jul 05 2024",
        status: "Completed",
        amount: 100,
      },
      {
        id: "2",
        date: "Fri Jul 06 2024",
        status: "Pending",
        amount: 150,
      },
      {
        id: "3",
        date: "Fri Jul 07 2024",
        status: "Pending",
        amount: 200,
      },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [withdrawInfo, setWithdrawInfo] = useState({
    accountNumber: "",
    accountName: "",
    bankName: "",
    amount: 0,
  });
  const [depositInfo, setDepositInfo] = useState({
    amount: 0,
  });
  const [activeTab, setActiveTab] = useState("profile");

  const handleSave = () => {
    setIsEditing(false);
    // Update user information logic here
    console.log("Updated user info:", { name, email });
  };

  const handleWithdrawChange = (e) => {
    const { name, value } = e.target;
    setWithdrawInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleWithdrawSubmit = () => {
    setIsWithdrawModalOpen(false);
    // Handle withdraw logic here
    console.log("Withdraw info:", withdrawInfo);
  };

  const handleDepositChange = (e) => {
    const { name, value } = e.target;
    setDepositInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleDepositSubmit = () => {
    const newTransaction = {
      invoice: Date.now().toString(),
      transferTo: "VNPAY",
      date: new Date().toLocaleDateString(),
      tags: "Deposit",
      amount: parseFloat(depositInfo.amount),
    };

    setUser((prevUser) => ({
      ...prevUser,
      balance: prevUser.balance + parseFloat(depositInfo.amount),
      transactions: [...prevUser.transactions, newTransaction],
    }));

    setIsDepositModalOpen(false);

    // Điều hướng sang cổng thanh toán VNPAY
    window.location.href = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  };

  const handleCancelOrder = (orderId) => {
    setUser((prevUser) => {
      const updatedOrders = prevUser.orders.map((order) =>
        order.id === orderId ? { ...order, status: "Cancelled" } : order
      );
      return { ...prevUser, orders: updatedOrders };
    });
  };

  const renderOrders = () => {
    return (
      <div className="overflow-x-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Orders</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {user.orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      order.status === "Completed"
                        ? "bg-green-200 text-green-800"
                        : order.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {order.amount}$
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {order.status === "Pending" && (
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Hủy đơn
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderProfile = () => {
    return (
      <div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Hồ sơ cá nhân</h2>
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Avatar"
              className="rounded-full h-24 w-24 mr-4"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
              onClick={() => setIsEditing(true)}
            >
              Chỉnh sửa hồ sơ
            </button>
          </div>
          {isEditing ? (
            <div className="mt-4">
              <label className="block mb-2">Họ tên:</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="block mt-4 mb-2">Email:</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
                onClick={handleSave}
              >
                Lưu thay đổi
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <p>
                <strong>Họ tên:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-bold mb-4">Ví tiền</h2>
          <div className="flex items-center justify-between">
            <p className="text-lg">
              Số dư hiện tại: <strong>{user.balance}$</strong>
            </p>
            <div>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 mr-2"
                onClick={() => setIsDepositModalOpen(true)}
              >
                Deposit more money with VNPAY
              </button>
              <button
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
                onClick={() => setIsWithdrawModalOpen(true)}
              >
                Withdraw
              </button>
            </div>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                    Invoice Number
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                    Transfer To
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                    Tags
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {user.transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      {transaction.invoice}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      {transaction.transferTo}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {transaction.tags}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      {transaction.amount}$
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto my-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <nav className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-full ${
              activeTab === "profile"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Hồ sơ
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              activeTab === "orders"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Đơn hàng
          </button>
        </nav>
        {activeTab === "profile" && renderProfile()}
        {activeTab === "orders" && renderOrders()}
      </div>

      <Modal
        isOpen={isWithdrawModalOpen}
        onRequestClose={() => setIsWithdrawModalOpen(false)}
        contentLabel="Withdrawal Form"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4">WITHDRAWAL FORM</h2>
        <label className="block mb-2">Account Number</label>
        <input
          type="text"
          name="accountNumber"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={withdrawInfo.accountNumber}
          onChange={handleWithdrawChange}
        />
        <label className="block mt-4 mb-2">Account Name</label>
        <input
          type="text"
          name="accountName"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={withdrawInfo.accountName}
          onChange={handleWithdrawChange}
        />
        <label className="block mt-4 mb-2">Bank Name</label>
        <input
          type="text"
          name="bankName"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={withdrawInfo.bankName}
          onChange={handleWithdrawChange}
        />
        <label className="block mt-4 mb-2">Amount</label>
        <input
          type="number"
          name="amount"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={withdrawInfo.amount}
          onChange={handleWithdrawChange}
        />
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          onClick={handleWithdrawSubmit}
        >
          Submit
        </button>
      </Modal>

      <Modal
        isOpen={isDepositModalOpen}
        onRequestClose={() => setIsDepositModalOpen(false)}
        contentLabel="Deposit Form"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4">DEPOSIT FORM</h2>
        <label className="block mb-2">Amount</label>
        <input
          type="number"
          name="amount"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={depositInfo.amount}
          onChange={handleDepositChange}
        />
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          onClick={handleDepositSubmit}
        >
          Submit
        </button>
      </Modal>
    </div>
  );
};

export default UserProfile;
