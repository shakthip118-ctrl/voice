"use client";

import { useState } from "react";

export default function BookingPage() {
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<any[]>([]);

  const fetchSlots = async () => {
    const res = await fetch("/api/slots", {
      method: "POST",
      body: JSON.stringify({ doctorId, date }),
    });

    const data = await res.json();
    setSlots(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Book Appointment</h1>

      <input
        placeholder="Doctor ID"
        className="border p-2 mt-4"
        onChange={(e) => setDoctorId(e.target.value)}
      />

      <input
        type="date"
        className="border p-2 mt-2"
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={fetchSlots} className="bg-blue-500 text-white px-4 py-2 mt-3">
        Get Slots
      </button>

      <div className="grid grid-cols-4 gap-3 mt-6">
        {slots.map((slot, i) => (
          <div
            key={i}
            className={`p-2 text-center border rounded ${
              slot.isBooked ? "bg-gray-300 opacity-50" : "bg-green-200"
            }`}
          >
            {slot.time}
          </div>
        ))}
      </div>
    </div>
  );
}