import { Appointment } from "./appointment.model";

const scheduleAppointment = async (data: any) => {
  const result = await Appointment.create();
  return result;
};

//get appointments
const fetchUsersAppointments = async (id: any) => {
  const result = await Appointment.find({
    $or: [{ donor: id }, { receiver: id }],
  });
  return result;
};

export const appointmentServices = {
  scheduleAppointment,
  fetchUsersAppointments,
};
