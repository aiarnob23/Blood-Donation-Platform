"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import { registerNewUser } from "@/service/AuthService";
import { useRouter } from "next/navigation";
import { successMessage } from "@/utils/alertMessages";

export default function Register() {
  const userEmail = Cookies.get("userEmail");
  const [formData, setFormData] = useState({
    name: "",
    blood_group: "A+",
    dob: { day: "", month: "", year: "" },
    gender: "Male",
    phone: "+880",
    nid: "",
    address: "",
    email: userEmail,
    smoker: false,
    critical_disease: false,
    critical_disease_description: "",
    isAvailableForDonation: true,
    notificationPreference: "Yes",
    donation_eligibility: "Eligible",
    role: "Both",
  });

  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("dob_")) {
      setFormData({
        ...formData,
        dob: { ...formData.dob, [name.split("_")[1]]: value },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Form Data Submitted:", { ...formData });
    const res = await registerNewUser(formData);
    if (res?.success) {
      setTimeout(() => {
        successMessage("Registration successfull");
        router.push("/home");
      }, 600);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-semibold text-center mb-6">Register Here</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input (Disabled) */}
        <div className="form-group">
          <label htmlFor="email" className="block text-lg font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={userEmail}
            disabled
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            required
          />
        </div>

        {/* Name Input */}
        <div className="form-group">
          <label htmlFor="name" className="block text-lg font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Blood Group */}
        <div className="form-group">
          <label
            htmlFor="blood_group"
            className="block text-lg font-medium mb-2"
          >
            Blood Group
          </label>
          <select
            name="blood_group"
            value={formData.blood_group}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label className="block text-lg font-medium mb-2">
            Date of Birth
          </label>
          <div className="flex space-x-4">
            <input
              type="number"
              name="dob_day"
              placeholder="Day"
              min={1}
              max={31}
              required
              value={formData.dob.day}
              onChange={handleChange}
              className="w-1/3 p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              name="dob_month"
              placeholder="Month"
              min={1}
              max={12}
              required
              value={formData.dob.month}
              onChange={handleChange}
              className="w-1/3 p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              name="dob_year"
              placeholder="Year"
              min={1900}
              required
              value={formData.dob.year}
              onChange={handleChange}
              className="w-1/3 p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Gender */}
        <div className="form-group">
          <label htmlFor="gender" className="block text-lg font-medium mb-2">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            {["Male", "Female", "Other"].map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label htmlFor="phone" className="block text-lg font-medium mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* NID */}
        <div className="form-group">
          <label htmlFor="nid" className="block text-lg font-medium mb-2">
            National ID
          </label>
          <input
            type="text"
            name="nid"
            value={formData.nid}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Address */}
        <div className="form-group">
          <label htmlFor="address" className="block text-lg font-medium mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Smoker Checkbox */}
        <div className="form-group flex items-center space-x-2">
          <input
            type="checkbox"
            name="smoker"
            checked={formData.smoker}
            onChange={handleChange}
            className="h-5 w-5 customized-checkbox"
          />
          <span className="text-lg">Smoker</span>
        </div>

        {/* Critical Disease Checkbox */}
        <div className="form-group flex items-center space-x-2">
          <input
            type="checkbox"
            name="critical_disease"
            checked={formData.critical_disease}
            onChange={handleChange}
            className="h-5 w-5 customized-checkbox"
          />
          <span className="text-lg">Has a critical disease</span>
        </div>

        {formData.critical_disease && (
          <div className="form-group">
            <label
              htmlFor="critical_disease_description"
              className="block text-lg font-medium mb-2"
            >
              Describe your condition
            </label>
            <input
              type="text"
              name="critical_disease_description"
              value={formData.critical_disease_description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        )}

        {/* Role */}
        <div className="form-group">
          <label htmlFor="role" className="block text-lg font-medium mb-2">
            Are you donor? , Recipient or Both?
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            {["Donor", "Recipient", "Both"].map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Notification Preference */}
        <div className="form-group flex items-center space-x-2">
          <input
            type="checkbox"
            name="notificationPreference"
            checked={formData.notificationPreference === "Yes"}
            onChange={() =>
              setFormData({
                ...formData,
                notificationPreference:
                  formData.notificationPreference === "Yes" ? "No" : "Yes",
              })
            }
            className="h-5 w-5"
          />
          <span className="text-lg">Receive Notifications</span>
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
