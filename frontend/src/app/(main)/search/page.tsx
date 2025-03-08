"use client";

import { getDonorsLists } from "@/service/userService";
import { useState, useEffect } from "react";
import {
  Search as SearchIcon,
  Filter,
  User,
  Users,
  Droplet,
} from "lucide-react";
import Link from "next/link";

interface DateOfBirth {
  day: number;
  month: number;
  year: number;
}

interface UserData {
  _id: string;
  name: string;
  blood_group: string;
  gender: string;
  photoURL: string;
  nid: number;
  address: string;
  email: string;
  isSmoker: boolean;
  critical_disease: boolean;
  critical_disease_description: string;
  posts: any[];
  isAvailableForDonation: boolean;
  role: string;
  isRegistered: boolean;
  isVerified: boolean;
  isPhoneNumberVisible: boolean;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
  dob: DateOfBirth;
  __v: number;
}

interface FilterOptions {
  bloodGroup: string;
  gender: string;
  isAvailableForDonation: boolean | null;
  criticalDisease: boolean | null;
}

export default function Search() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<FilterOptions>({
    bloodGroup: "",
    gender: "",
    isAvailableForDonation: null,
    criticalDisease: null,
  });
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const bloodGroups: string[] = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];

  useEffect(() => {
    const getDonors = async (): Promise<void> => {
      try {
        setLoading(true);
        const res = await getDonorsLists();
        setUsers(res);
        setFilteredUsers(res);
      } catch (error) {
        console.error("Error fetching donors:", error);
      } finally {
        setLoading(false);
      }
    };
    getDonors();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, users]);

  const applyFilters = (): void => {
    let result = [...users];

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.address.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
      );
    }

    // Apply blood group filter
    if (filters.bloodGroup) {
      result = result.filter((user) => user.blood_group === filters.bloodGroup);
    }

    // Apply gender filter
    if (filters.gender) {
      result = result.filter((user) => user.gender === filters.gender);
    }

    // Apply availability filter
    if (filters.isAvailableForDonation !== null) {
      result = result.filter(
        (user) => user.isAvailableForDonation === filters.isAvailableForDonation
      );
    }

    // Apply critical disease filter
    if (filters.criticalDisease !== null) {
      result = result.filter(
        (user) => user.critical_disease === filters.criticalDisease
      );
    }

    setFilteredUsers(result);
  };

  const resetFilters = (): void => {
    setFilters({
      bloodGroup: "",
      gender: "",
      isAvailableForDonation: null,
      criticalDisease: null,
    });
    setSearchTerm("");
  };

  const getAgeFromDOB = (dob: DateOfBirth): number => {
    const birthDate = new Date(dob.year, dob.month - 1, dob.day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Blood Donor Search</h1>
        <p className="text-gray-600">
          Find compatible blood donors quickly and easily
        </p>
      </div>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, address, or email"
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Filter className="h-5 w-5" />
            Filters
          </button>
        </div>

        {isFilterOpen && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Group
                </label>
                <select
                  className="w-full border rounded-md p-2"
                  value={filters.bloodGroup}
                  onChange={(e) =>
                    setFilters({ ...filters, bloodGroup: e.target.value })
                  }
                >
                  <option value="">All Blood Groups</option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  className="w-full border rounded-md p-2"
                  value={filters.gender}
                  onChange={(e) =>
                    setFilters({ ...filters, gender: e.target.value })
                  }
                >
                  <option value="">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Availability Status
                </label>
                <select
                  className="w-full border rounded-md p-2"
                  value={
                    filters.isAvailableForDonation === null
                      ? ""
                      : filters.isAvailableForDonation.toString()
                  }
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      isAvailableForDonation:
                        e.target.value === ""
                          ? null
                          : e.target.value === "true",
                    })
                  }
                >
                  <option value="">All Availability</option>
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Health Status
                </label>
                <select
                  className="w-full border rounded-md p-2"
                  value={
                    filters.criticalDisease === null
                      ? ""
                      : filters.criticalDisease.toString()
                  }
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      criticalDisease:
                        e.target.value === ""
                          ? null
                          : e.target.value === "true",
                    })
                  }
                >
                  <option value="">All Health Status</option>
                  <option value="false">No Critical Disease</option>
                  <option value="true">Has Critical Disease</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={resetFilters}
                className="text-blue-600 hover:text-blue-800 mr-4"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              {filteredUsers.length} donor{filteredUsers.length !== 1 && "s"}{" "}
              found
            </p>
            {Object.values(filters).some(
              (val) => val !== "" && val !== null
            ) && (
              <button
                onClick={resetFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear all filters
              </button>
            )}
          </div>

          {filteredUsers.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No donors found
              </h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition"
                >
                  <Link href={`/user-profile/${user?._id}`} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user.name}
                            className="w-12 h-12 rounded-full object-cover mr-4"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                            <User className="h-6 w-6 text-blue-600" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-lg font-semibold">{user.name}</h3>
                          <p className="text-gray-600 text-sm">
                            {user.address}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <Droplet className="h-3 w-3 mr-1" />
                          {user.blood_group}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Age:</span>{" "}
                        {getAgeFromDOB(user.dob)} years
                      </div>
                      <div>
                        <span className="text-gray-500">Gender:</span>{" "}
                        {user.gender}
                      </div>
                      <div>
                        <span className="text-gray-500">Smoker:</span>{" "}
                        {user.isSmoker ? "Yes" : "No"}
                      </div>
                      <div>
                        <span className="text-gray-500">Critical Disease:</span>{" "}
                        {user.critical_disease ? "Yes" : "No"}
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.isAvailableForDonation
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.isAvailableForDonation
                          ? "Available for donation"
                          : "Not available"}
                      </span>
                      {user.isPhoneNumberVisible && (
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Contact
                        </button>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
