import React, { useEffect } from "react";
import { Spotlight } from "../components/ui/spotlight";
import { Show, SignUpButton, UserButton } from "@clerk/react";
import api from "../api/axios";
const HomePage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/api/test");
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="landing-grid relative min-h-screen overflow-hidden bg-black text-white">
      <Spotlight className="-top-40 left-0 md:left-60" fill="white"></Spotlight>
      {/* Navbar */}
      <nav className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <h1 className="text-2xl font-bold leading-none text-blue-400">
          VDelhivery
        </h1>

        <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end sm:gap-6">
          <div className="flex items-center gap-4 text-sm sm:gap-6 sm:text-base">
            <a href="#" className="whitespace-nowrap hover:text-blue-400">
              Home
            </a>

            <a
              href="#how"
              className="ml-3 whitespace-nowrap hover:text-blue-400"
            >
              How it Works
            </a>
          </div>
          <Show when="signed-out">
            <div className="flex flex-col items-end gap-1">
              <SignUpButton mode="modal">
                <button className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:text-base">
                  Login
                </button>
              </SignUpButton>
            </div>
          </Show>
        </div>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </nav>

      {/* Hero Section */}

      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-between px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Deliver Parcels
            <br />
            <span className="text-blue-400">Across Your Campus</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-gray-300 sm:mt-6 sm:text-lg sm:leading-8">
            Need something delivered quickly?
          </p>

          <div className="mt-8 flex">
            <button className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 sm:w-auto">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Features */}

      <section
        id="features"
        className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
      >
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Why VDelhivery?
        </h2>
      </section>

      {/* How it Works */}

      <section
        id="how"
        className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
      >
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          How It Works
        </h2>
      </section>

      {/* Footer */}
    </div>
  );
};

export default HomePage;
