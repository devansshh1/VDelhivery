import React, { useEffect, useState } from "react";
import { useUser,useClerk } from "@clerk/react";
import api from "../api/axios";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Clear alias: This makes it obvious that you are passing the Clerk ID into the URL
  const clerkId = user?.id; 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Clear and readable path mapping to your /:clerkId/profile backend route
        const res = await api.get(`/api/users/${clerkId}/profile`);
        setProfile(res.data.data);
      } catch (error) {
        console.error(error);
        if (error.response?.status === 404) {
          navigate("/complete-profile");
        }
      }
    };

    if (clerkId) {
      fetchUser();
    }
  }, [clerkId, navigate]);

  const handleDeleteAccount = async () => {
    if (isDeleting) return;

    const confirmDelete = window.confirm("Are you sure? This deletes everything.");
    if (!confirmDelete) return;

    setIsDeleting(true);

    try {
      // Delete VDelhivery data first. This endpoint has already completed if
      // a later Clerk operation fails, so keep its outcome separate.
      await api.delete(`/api/users/${clerkId}/delete`);
    } catch (error) {
      console.error("App-data deletion failed:", error);
      alert("Could not delete your VDelhivery data. Please try again.");
      setIsDeleting(false);
      return;
    }

    try {
      if (typeof user.delete === "function") {
        await user.delete();
      } else {
        await signOut();
      }

      alert("Your account and app data were deleted.");
      navigate("/");
    } catch (error) {
      // The app data was deleted successfully, but Clerk account removal did not.
      console.error("Clerk account deletion failed:", error);
      try {
        await signOut();
      } catch (signOutError) {
        console.error("Sign-out after failed Clerk deletion also failed:", signOutError);
      }
      alert(
        "Your VDelhivery data was deleted, but your sign-in account could not be removed. You have been signed out."
      );
      navigate("/");
    } finally {
      setIsDeleting(false);
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
          <p className="mt-2 text-gray-400">Ask for parcel delivery.</p>
        </div>

        <div
          onClick={() => navigate("/browse-requests")}
          className="rounded-xl bg-gray-900 p-8 hover:bg-gray-800 cursor-pointer"
        >
          <h2 className="text-2xl font-semibold">🚚 Get Parcel</h2>
          <p className="mt-2 text-gray-400">
            Accept delivery requests and earn money.
          </p>
        </div>
        <button
          onClick={ handleDeleteAccount }
          disabled={isDeleting}
          className="mt-10 rounded-lg bg-white px-4 py-2 text-black hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isDeleting ? "Deleting account..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
