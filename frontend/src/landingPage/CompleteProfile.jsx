const CompleteProfile = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md rounded-xl bg-gray-900 p-8">
        <h1 className="text-3xl font-bold mb-6">Complete Your Profile</h1>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Registration Number"
            className="w-full rounded border p-3 text-black"
          />

          <select className="w-full rounded border p-3 text-black">
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <select className="w-full rounded border p-3 text-white">
            <option>Select Hostel Block</option>
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
