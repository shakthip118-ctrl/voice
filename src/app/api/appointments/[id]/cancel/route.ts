import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const appointmentId = params.id;

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    // ❌ cannot cancel completed
    if (appointment.status === "COMPLETED") {
      return NextResponse.json(
        { error: "Completed appointment cannot be cancelled" },
        { status: 400 }
      );
    }

    // ❌ already cancelled
    if (appointment.status === "CANCELLED") {
      return NextResponse.json(
        { error: "Already cancelled" },
        { status: 400 }
      );
    }

    // ✅ update status
    const updated = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: "CANCELLED",
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Cancel error:", error);
    return NextResponse.json(
      { error: "Failed to cancel appointment" },
      { status: 500 }
    );
  }
}