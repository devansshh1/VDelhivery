import { useUser } from "@clerk/react";
import api from "../api/axios";
import React, { useEffect, useState } from "react";

const BrowseRequests = () => {
  const { user } = useUser();
  const [deliveries, setDeliveries] = useState([]);

  const handleAccept = async (deliveryId) => {
    try {
      const res = await api.put(`/api/delivery/${deliveryId}/accept`, {
        deliveryPartnerClerkId: user.id,
        deliveryPartnerName: user.fullName,
      });
      console.log(res.data);
      alert("Delivery Accepted!");
      setDeliveries((prev) =>
        prev.filter((delivery) => delivery._id !== deliveryId),
      );
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };
  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const res = await api.get("/api/delivery/searching");
        console.log(res.data);
        setDeliveries(res.data.deliveries);
      } catch (error) {
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
        }
      }
    };
    fetchDeliveries();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Available Delivery Requests</h1>
      {deliveries.length === 0 ? (
        <p>No Delivery requests available.</p>
      ) : (
        <div className="space-y-6">
          {deliveries.map((delivery) => (
            <div
              key={delivery._id}
              className="bg-gray-900 rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-semibold">{delivery.ownerName}</h2>
              <p>
                <strong>Registration:</strong>
                {""}
                {delivery.ownerRegistrationNumber}
              </p>
              <p>
                <strong>Hostel:</strong> {delivery.ownerHostelBlock}
              </p>

              <p>
                <strong>Courier:</strong> {delivery.courierCompany}
              </p>

              <p>
                <strong>Parcel Size:</strong> {delivery.parcelSize}
              </p>

              <p>
                <strong>Delivery Fee:</strong> ₹{delivery.deliveryFee}
              </p>
              <button
                onClick={() => handleAccept(delivery._id)}
                className="mt-5 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
              >
                Accept Delivery
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseRequests;
