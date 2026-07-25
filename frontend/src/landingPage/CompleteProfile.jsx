import { useState } from "react";
import { useUser } from "@clerk/react";
import api from "../api/axios";

const CompleteProfile = () => {
  const { user } = useUser();

  console.log("User Object:", user);
  console.log("Full Name:", user?.fullName);
  console.log("First Name:", user?.firstName);
  console.log("Last Name:", user?.lastName);

  const [form, setForm] = useState({
    name: "",
    registrationNumber: "",
    gender: "",
    hostelBlock: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      clerkId: user.id,
      name: user.fullName,
      email: user.primaryEmailAddress.emailAddress,
      ...form,
    };

    console.log("Sending Data:", data);
    try {
      const res = await api.post("/api/users", data);

      console.log(res.data);
      alert("Profile saved successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md rounded-xl bg-gray-900 p-8">
        <h1 className="text-3xl font-bold mb-6">Complete Your Profile</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Registration Number"
            className="w-full rounded border p-3 text-white"
            value={form.registrationNumber}
            onChange={(e) =>
              setForm({ ...form, registrationNumber: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded border p-3 text-white"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <select
            className="w-full rounded border border-gray-600 bg-gray-800 p-3 text-white"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <select
            className="w-full rounded border border-gray-600 bg-gray-800 p-3 text-white"
            value={form.hostelBlock}
            onChange={(e) => setForm({ ...form, hostelBlock: e.target.value })}
          >
            <option value="">Select Hostel Block</option>
            <option>Boys Hostel - Block 1</option>
            <option>Boys Hostel - Block 2</option>
            <option>Boys Hostel - Block 3</option>
            <option>Boys Hostel - Block 4</option>
            <option>Boys Hostel - Block 5</option>
            <option>Boys Hostel - Block 6</option>
            <option>Boys Hostel - Block 7</option>
            <option>Boys Hostel - Block 8</option>
            <option>Girls Hostel - Block 1</option>
            <option>Girls Hostel - Block 2</option>
            <option>Special block</option>
          </select>
          <button className="w-full rounded bg-blue-600 py-3 text-white">
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
