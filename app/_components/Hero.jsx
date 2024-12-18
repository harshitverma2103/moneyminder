"use client";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";

const Hero = () => {
  const { isSignedIn } = useUser();

  return (
    <div>
      <section className="bg-gray-900 text-white flex items-center flex-col">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Take Control of Your Finances.
              <span className="sm:block"> Track Expenses Easily. </span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Manage your budget, monitor spending, and achieve financial goals
              effortlessly. Let&apos;s make every expense count!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href={isSignedIn ? "/dashboard" : "/sign-in"}
                passHref
                className="block w-full rounded border border-blue-400 bg-primary px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              >
                {isSignedIn ? "Go to Dashboard" : "Get Started"}
              </Link>
            </div>
          </div>
        </div>
        <Image
          src={"/dashboard.jpg"}
          alt="dashboard"
          width={1000}
          height={700}
          className="mt-5 rounded-xl mb-10"
        />
      </section>
    </div>
  );
};

export default Hero;
