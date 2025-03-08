import { Types } from "mongoose";

export type TAppointment = {
  donor: Types.ObjectId;
  receiver: Types.ObjectId;
  patientName: string;
  patientAge: Number;
  blood_group: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  location: string;
  date: Date;
  isDeleted?: boolean;
  isSuccessful?: boolean;
  isAcceptedByDonoor?: boolean;
  isRejectedByDonor?: boolean;
  isRejectedByReceiver?: boolean;
};
