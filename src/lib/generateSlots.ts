export function generateSlots(
  startTime: string,
  endTime: string,
  slotDuration: number
) {
  const slots: string[] = [];

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  let current = new Date();
  current.setHours(startHour, startMinute, 0);

  const end = new Date();
  end.setHours(endHour, endMinute, 0);

  while (current < end) {
    const hours = current.getHours().toString().padStart(2, "0");
    const minutes = current.getMinutes().toString().padStart(2, "0");

    slots.push(`${hours}:${minutes}`);

    current.setMinutes(current.getMinutes() + slotDuration);
  }

  return slots;
}