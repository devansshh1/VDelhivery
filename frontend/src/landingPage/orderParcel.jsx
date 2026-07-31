import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const OrderParcel = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  const [form, setForm] = useState({
    courierCompany: "",
    parcelSize: "",
    preferredDeliveryTime: "",
    additionalInstructions: "",
  });

  // Fetch logged-in student's profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/api/users/${user.id}`);
        setProfile(res.data.data);
      } catch (error) {
        console.error("Profile Error:", error);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log("Button CLicked");
    e.preventDefault();
    try {
      console.log({
        ownerClerkId: user.id,
        ownerName: profile.name,
        ownerRegistrationNumber: profile.registrationNumber,
        ownerHostelBlock: profile.hostelBlock,

        courierCompany: form.courierCompany,
        parcelSize: form.parcelSize,
        preferredDeliveryTime: form.preferredDeliveryTime,
        additionalInstructions: form.additionalInstructions,
      });
      const res = await api.post("/api/delivery", {
        ownerClerkId: user.id,
        ownerName: profile.name,
        ownerRegistrationNumber: profile.registrationNumber,
        ownerHostelBlock: profile.hostelBlock,

        courierCompany: form.courierCompany,
        parcelSize: form.parcelSize,
        preferredDeliveryTime: form.preferredDeliveryTime,
        additionalInstructions: form.additionalInstructions,
      });
      alert("Delivery Request Created!");

      navigate("/searching");
      console.log(res.data);
    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-gray-900 p-8 shadow-lg">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-gray-400 hover:text-white transition"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-4xl font-bold text-center mb-3">Order Parcel</h1>

        <p className="text-center text-gray-400 mb-10">
          Get your parcel delivered from the campus collection point.
        </p>

        {/* ================= YOUR DETAILS ================= */}

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-5">Your Details</h2>

          <p className="text-sm text-gray-400 mb-5">
            Your parcel will be delivered to you.
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Name */}
            <div>
              <label className="block mb-2 text-gray-400">Name</label>

              <input
                type="text"
                value={profile.name}
                readOnly
                className="w-full rounded-lg bg-gray-800 p-3 text-gray-300 cursor-not-allowed"
              />
            </div>

            {/* Registration Number */}
            <div>
              <label className="block mb-2 text-gray-400">
                Registration Number
              </label>

              <input
                type="text"
                value={profile.registrationNumber}
                readOnly
                className="w-full rounded-lg bg-gray-800 p-3 text-gray-300 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Hostel */}
          <div className="mt-5">
            <label className="block mb-2 text-gray-400">
              Delivery Location
            </label>

            <input
              type="text"
              value={profile.hostelBlock}
              readOnly
              className="w-full rounded-lg bg-gray-800 p-3 text-gray-300 cursor-not-allowed"
            />
          </div>
        </div>

        {/* ================= PICKUP LOCATION ================= */}

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-5">Parcel Pickup</h2>

          <div className="rounded-xl bg-gray-800 p-5">
            <p className="text-gray-400 text-sm">
              Your delivery partner will collect your parcel from:
            </p>

            <p className="text-xl font-semibold mt-2">
              📦 Campus Parcel Collection Point
            </p>
          </div>
        </div>

        {/* ================= PARCEL DETAILS ================= */}

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-5">Parcel Details</h2>

          <div className="space-y-5">
            {/* Courier Company */}
            <div>
              <label className="block mb-2 text-gray-400">
                Courier Company
              </label>

              <select
                name="courierCompany"
                value={form.courierCompany}
                onChange={handleChange}
                className="w-full rounded-lg bg-gray-800 p-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Courier Company</option>

                <option>Amazon</option>
                <option>Flipkart</option>
                <option>Myntra</option>
                <option>Meesho</option>
                <option>AJIO</option>
                <option>Other</option>
              </select>
            </div>

            {/* Parcel Size */}
            <div>
              <label className="block mb-2 text-gray-400">Parcel Size</label>

              <select
                name="parcelSize"
                value={form.parcelSize}
                onChange={handleChange}
                className="w-full rounded-lg bg-gray-800 p-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Parcel Size</option>

                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
        </div>

        {/* ================= DELIVERY DETAILS ================= */}

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-5">Delivery Details</h2>

          <div className="space-y-5">
            {/* Preferred Time */}
            <div>
              <label className="block mb-2 text-gray-400">
                Preferred Delivery Time
              </label>

              <input
                type="datetime-local"
                name="preferredDeliveryTime"
                value={form.preferredDeliveryTime}
                onChange={handleChange}
                className="w-full rounded-lg bg-gray-800 p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Instructions */}
            <div>
              <label className="block mb-2 text-gray-400">
                Additional Instructions
              </label>

              <textarea
                name="additionalInstructions"
                value={form.additionalInstructions}
                onChange={handleChange}
                rows="4"
                placeholder="Example: Please call me when you reach the hostel."
                className="w-full rounded-lg bg-gray-800 p-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* ================= DELIVERY FEE ================= */}

        <div className="mb-8 rounded-xl bg-gray-800 p-5">
          <h2 className="text-xl font-semibold">Estimated Delivery Fee</h2>
          <p className="text-sm text-gray-400 mt-2">
            The fee will be calculated based on parcel size and delivery
            distance.
          </p>
          <p className="text-3xl font-bold mt-3">₹0</p>
        </div>

        {/* ================= FIND PARTNER ================= */}

        <button
          onClick={handleSubmit}
          className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold hover:bg-blue-700 transition"
        >
          Find Delivery Partner
        </button>
      </div>
    </div>
  );
};

export default OrderParcel;
