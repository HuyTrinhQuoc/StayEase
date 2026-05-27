function App() {
  const rooms = [
    {
      id: 101,
      name: "Phòng Deluxe",
      price: 700000,
      status: "Trống",
    },
    {
      id: 102,
      name: "Phòng VIP",
      price: 1200000,
      status: "Đang thuê",
    },
  ];

  return (
      <div className="min-h-screen bg-gray-100 p-10">
        <h1 className="text-3xl font-bold mb-6">
          Hotel Admin Dashboard
        </h1>

        <div className="grid gap-4">
          {rooms.map((room) => (
              <div
                  key={room.id}
                  className="bg-white rounded-xl shadow p-5"
              >
                <h2 className="text-xl font-semibold">
                  {room.name}
                </h2>

                <p>Mã phòng: {room.id}</p>

                <p>
                  Giá:
                  {" "}
                  {room.price.toLocaleString()} VNĐ
                </p>

                <p>
                  Trạng thái:
                  {" "}
                  <span
                      className={
                        room.status === "Trống"
                            ? "text-green-600"
                            : "text-red-600"
                      }
                  >
                {room.status}
              </span>
                </p>
              </div>
          ))}
        </div>
      </div>
  );
}

export default App;