import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/react";
import api from "../api/axios";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useUser();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/api/users/${user.id}`);
        setProfile(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchUser();
    }
  }, [user]);

  // const handleDeleteAccount = async () => {
  //   try {
  //     // Delete user from MongoDB
  //     await api.delete(`/api/users/${user.id}`);

  //     // Delete Clerk account
  //     await user.delete();

  //     alert("Account deleted successfully!");

  //     navigate("/");
  //   } catch (error) {
  //     console.error("Delete Error:", error);

  //     if (error.response) {
  //       console.log(error.response.data);
  //     }

  //     alert("Failed to delete account.");
  //   }
  // };

  const handleDeleteAccount = async () => {
    try {
      console.log("Deleting from MongoDB...");
      await api.delete(`/api/users/${user.id}`);
      console.log("MongoDB user deleted ✅");

      console.log("Deleting Clerk account...");
      await user.delete();
      console.log("Clerk account deleted ✅");

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  if (!profile) {
    return <h1 className="text-white p-10">Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">Welcome to VDelhivery</h1>

      {/* User Profile Card */}
      <div className="bg-gray-900 rounded-2xl p-6 shadow-lg mb-8">
        <h2 className="text-2xl font-bold">{profile.name}</h2>

        <div className="flex items-center gap-2 mt-3">
          <FaStar className="text-yellow-400" />
          <span>{profile.rating.toFixed(1)}</span>
        </div>

        <p className="mt-2">📦 {profile.totalDeliveries} Deliveries</p>

        <p>💰 ₹{profile.earnings}</p>

        <p>🏆 {profile.badge}</p>
      </div>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => navigate("/order-parcel")}
          className="rounded-xl bg-gray-900 p-8 hover:bg-gray-800 cursor-pointer transition"
        >
          <h2 className="text-2xl font-semibold">📦 Order Parcel</h2>
          <p className="mt-2 text-gray-400">
            Send a parcel to another student.
          </p>
        </div>

        <div className="rounded-xl bg-gray-900 p-8 hover:bg-gray-800 cursor-pointer">
          <h2 className="text-2xl font-semibold">🚚 Get Parcel</h2>
          <p className="mt-2 text-gray-400">
            Accept delivery requests and earn money.
          </p>
        </div>
        <button
          onClick={handleDeleteAccount}
          className="mt-10 rounded-lg bg-white px-4 py-2 text-black hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
