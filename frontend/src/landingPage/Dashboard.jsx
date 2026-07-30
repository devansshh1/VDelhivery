import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/react";
import api from "../api/axios";
import { FaStar } from "react-icons/fa";
import Chat from '../components/chat';

const Dashboard = () => {
  const { user } = useUser();
  const [profile, setProfile] = useState(null);
  const [chat,showchat]=useState(false);

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
        <div className="rounded-xl bg-gray-900 p-8 hover:bg-gray-800 cursor-pointer">
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
      </div>
      
    <button
    onClick={() => showchat(!chat)}
>
    Chat Here
</button>
      
    {chat && 
    <Chat
        orderId="12345"
        currentUser={{ id: user.id }}
    />
    }
    </div>
  );
};

export default Dashboard;
