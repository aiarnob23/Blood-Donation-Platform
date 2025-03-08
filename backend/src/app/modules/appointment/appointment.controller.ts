import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { appointmentServices } from "./appointment.service";

const addAppointment = catchAsync(async (req, res) => {
  const data = req?.body;
  const result = await appointmentServices.scheduleAppointment(data);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Appointment has been posted successfully",
    data: result,
  });
});

//fetch users appointments
const getAppointment = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const result = await appointmentServices.fetchUsersAppointments(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Appointment fetched successfully",
    data: result,
  });
});
export const appointmentControllers = {
  addAppointment,
  getAppointment,
};
