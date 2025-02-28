"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export default function BloodRequestForm() {
  const [formData, setFormData] = useState({
    patientName: "",
    patientAge: "",
    gender: "",
    bloodGroup: "",
    dateNeeded: null as Date | null,
    location: "",
    contactInfo: "",
    notes: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({ ...formData, dateNeeded: date });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Blood request submitted successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg mt-10 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
        Request for Blood Donation
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Patient Age</label>
            <input
              type="number"
              name="patientAge"
              min={0}
              value={formData.patientAge}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="">Select</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Blood Requirement Date
          </label>
          <DatePicker
            selected={formData.dateNeeded}
            onChange={handleDateChange}
            dateFormat="d MMMM yyyy"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            placeholderText="Pick a date"
            minDate={new Date()}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Contact Information</label>
          <input
            type="text"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Additional Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-all focus:ring-2 focus:ring-red-500 focus:outline-none"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
