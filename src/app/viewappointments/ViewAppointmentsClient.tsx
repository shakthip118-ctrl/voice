"use client";

import Navbar from "@/components/Navbar";
import { useUserAppointments } from "@/hooks/use-appointments";
import { format } from "date-fns";
import { toast } from "sonner";
import { useState } from "react";

export default function UpcomingAppointmentsPage() {
  const { data: userAppointments = [], refetch } = useUserAppointments();

  const [tab, setTab] = useState<"UPCOMING" | "COMPLETED" | "ALL">("UPCOMING");

  const handleCancel = async (id: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}/cancel`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error);
        return;
      }

      toast.success("Appointment cancelled");
      refetch();
    } catch {
      toast.error("Something went wrong");
    }
  };

  // ✅ SORT by date + time (nearest first)
  const sortedAppointments = [...userAppointments].sort((a: any, b: any) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  // ✅ FILTER based on tab
  const filteredAppointments = sortedAppointments.filter((a: any) => {
    if (tab === "UPCOMING") return a.status !== "COMPLETED" && a.status !== "CANCELLED";
    if (tab === "COMPLETED") return a.status === "COMPLETED";
    return true; // ALL
  });

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <h1 className="text-2xl font-bold mb-6">Your Appointments</h1>

        {/* ✅ TABS */}
        <div className="flex gap-3 mb-6">
          {["UPCOMING", "COMPLETED", "ALL"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`px-4 py-1.5 rounded-md text-sm ${
                tab === t
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ✅ EMPTY STATE */}
        {filteredAppointments.length === 0 ? (
          <p>No appointments found</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAppointments.map((appointment: any) => (
              <div
                key={appointment.id}
                className="bg-card border rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={appointment.doctorImage || "/profile.png"}
                    className="size-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-sm">
                      {appointment.doctorName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {appointment.reason}
                    </p>
                  </div>
                </div>

                <p className="text-sm">
                  📅 {format(new Date(appointment.date), "MMM d, yyyy")}
                </p>
                <p className="text-sm">🕐 {appointment.time}</p>
                <p className="text-xs mt-1">
                  Status: {appointment.status}
                </p>

                {/* ✅ CANCEL BUTTON only for upcoming */}
                {appointment.status !== "COMPLETED" &&
                  appointment.status !== "CANCELLED" && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleCancel(appointment.id)}
                        className="mt-3 px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}