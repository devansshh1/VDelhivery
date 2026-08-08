import { useState } from "react";
import { useUser } from "@clerk/react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const { user } = useUser();

  const navigate = useNavigate();


  const [form, setForm] = useState({

    gender: "",
    hostelBlock: "",
  });

  const getCollegeDetails = () => {
  const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase();

  if (!email?.endsWith("@vitbhopal.ac.in")) {
    throw new Error("Please sign in using your VIT Bhopal email address.");
  }

  const [name, registrationNumber] = email.split("@")[0].split(".");

  if (!name || !registrationNumber) {
    throw new Error("Your college email format is invalid.");
  }

  return { name, registrationNumber: registrationNumber.toUpperCase() };
};

  const handleSubmit = async (e) => {
    e.preventDefault();

  

    
    try {
    const{name,registrationNumber}=getCollegeDetails();
    const data = {
      clerkId: user.id,
      email:user.primaryEmailAddress.emailAddress,
      name,
      registrationNumber,
      ...form,
    };

    const res = await api.post("/api/users", data);

      
      alert("Profile saved successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md rounded-xl bg-gray-900 p-8">
        <h1 className="text-3xl font-bold mb-6">Complete Your Profile</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
         

          
          <select required
            className="w-full rounded border border-gray-600 bg-gray-800 p-3 text-white"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <select required
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
