"use server";

import { Gender } from "@prisma/client";
import { prisma } from "../prisma";
import { generateAvatar } from "../utils";
import { revalidatePath } from "next/cache";

// ---------------------------
// Fetch all doctors
// ---------------------------
export async function getDoctors() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        _count: { select: { appointments: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return doctors.map((doctor) => ({
      ...doctor,
      appointmentCount: doctor._count.appointments,
    }));
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw new Error("Failed to fetch doctors");
  }
}

// ---------------------------
// Input type for creating a doctor
// ---------------------------
interface CreateDoctorInput {
  name: string;
  email: string;
  phone: string;
  speciality: string;
  gender: Gender;
  isActive: boolean;
}

// ---------------------------
// Create a new doctor
// ---------------------------
export async function createDoctor(input: CreateDoctorInput) {
  try {
    if (!input.name || !input.email) throw new Error("Name and email are required");

    const doctor = await prisma.doctor.create({
      data: {
        ...input,
        imageUrl: generateAvatar(input.name, input.gender),
      },
    });

    revalidatePath("/admin");

    return doctor;
  } catch (error: any) {
    console.error("Error creating doctor:", error);

    // Handle unique email constraint
    if (error?.code === "P2002") {
      throw new Error("A doctor with this email already exists");
    }

    throw new Error("Failed to create doctor");
  }
}

// ---------------------------
// Input type for updating a doctor
// ---------------------------
interface UpdateDoctorInput extends Partial<CreateDoctorInput> {
  id: string;
}

// ---------------------------
// Update doctor (TypeScript-safe)
// ---------------------------
export async function updateDoctor(input: UpdateDoctorInput) {
  try {
    const { id, name, email, phone, speciality, gender, isActive } = input;

    const currentDoctor = await prisma.doctor.findUnique({
      where: { id },
      select: { email: true, name: true, gender: true },
    });

    if (!currentDoctor) throw new Error("Doctor not found");

    // Check email uniqueness if changing
    if (email && email !== currentDoctor.email) {
      const existingDoctor = await prisma.doctor.findUnique({ where: { email } });
      if (existingDoctor) throw new Error("A doctor with this email already exists");
    }

    // Prepare update data safely
    const updateData: Partial<CreateDoctorInput & { imageUrl?: string }> = {};

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (speciality !== undefined) updateData.speciality = speciality;
    if (gender !== undefined) updateData.gender = gender;
    if (isActive !== undefined) updateData.isActive = isActive;

    // Regenerate avatar if name or gender changes
    if (name || gender) {
      updateData.imageUrl = generateAvatar(name || currentDoctor.name, gender || currentDoctor.gender);
    }

    const doctor = await prisma.doctor.update({
      where: { id },
      data: updateData,
    });

    return doctor;
  } catch (error) {
    console.error("Error updating doctor:", error);
    throw new Error("Failed to update doctor");
  }
}

// ---------------------------
// Fetch all active doctors
// ---------------------------
export async function getAvailableDoctors() {
  try {
    const doctors = await prisma.doctor.findMany({
      where: { isActive: true },
      include: {
        _count: { select: { appointments: true } },
      },
      orderBy: { name: "asc" },
    });

    return doctors.map((doctor) => ({
      ...doctor,
      appointmentCount: doctor._count.appointments,
    }));
  } catch (error) {
    console.error("Error fetching available doctors:", error);
    throw new Error("Failed to fetch available doctors");
  }
}