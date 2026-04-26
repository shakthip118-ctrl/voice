import { prisma } from "@/lib/prisma";
import { generateSlots } from "@/lib/generateSlots";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { doctorId, date } = await req.json();

  const availability = await prisma.availability.findFirst({
    where: {
      doctorId,
      date: new Date(date),
    },
  });

  if (!availability) return NextResponse.json([]);

  const slots = generateSlots(
    availability.startTime,
    availability.endTime,
    availability.slotDuration
  );

  const booked = await prisma.appointment.findMany({
    where: {
      doctorId,
      date: new Date(date),
      status: { in: ["PENDING", "CONFIRMED"] },
    },
  });

  const bookedTimes = booked.map((a) => a.time);

  const finalSlots = slots.map((slot) => ({
    time: slot,
    isBooked: bookedTimes.includes(slot),
  }));

  return NextResponse.json(finalSlots);
}