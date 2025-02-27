import { Types } from "mongoose";

export type TUser = {
  name: string;
  blood_group: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  age: number;
  gender: "Male" | "Female" | "Others";
  phone: string;
  nid: string;
  address: string;
  email: string;
  smoker: boolean;
  critical_disease: boolean;
  critical_disease_description?: string;
  posts?: Types.ObjectId[];
  conversation?: Types.ObjectId[];
  isAvailableForDonation: boolean;
  notificationPreference: "Yes" | "No";
  donation_eligibility:
    | "Eligible"
    | "Temporarily Ineligible"
    | "Permanently Ineligible";
};
