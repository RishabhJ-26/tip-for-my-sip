"use client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import MouseAnimation from "@/components/MouseAnimation";

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/20 py-4 w-full">
      <button
        onClick={() => setOpen(!open)}
        className="text-left w-full flex justify-between items-center text-white text-lg font-medium"
      >
        {question}
        <span className="ml-2">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="text-white mt-2">{answer}</p>}
    </div>
  );
};


export default function Home() {
  return (
    <>
    <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <title>Tip For My Sip</title> {/* optional */}
      </Head>
      <MouseAnimation />
      {/* Hero Section */}
      <div className="flex justify-center flex-col gap-4 items-center text-white h-[44vh] px-5 md:px-0 text-xs md:text-base pt-14">
        <div className="font-bold flex gap-6 md:gap-1 md:text-5xl justify-center items-center text-3xl pt-2">
          Tip for My Sip{" "}
          <span>
            <img className="invertImg" src="/tea.gif" width={88} alt="" />
          </span>
        </div>
        <p className="text-center md:text-left">
          A crowdfunding platform for creators to fund their projects.
        </p>
        <div className="text-center md:text-left">
         <p  className="text-center p-3 ">What fuels the soul when spirits wane? A @&apos;Tip for My Sip&apos;
, to ease the pain.</p>
         <p className="text-center p-3">Will you contribute, lend a hand? And help the artist understand.</p>
        </div>
        <div className="pb-6 mb-5">
          <Link href={"/login"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Start Here
            </button>
          </Link>

          <Link href="/about">
            <button 
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>

      <div className=" bg-white h-1 opacity-10 mt-8"></div>

      {/* Benefits Section */}
      <div className="text-white container mx-auto pb-32 pt-14 px-10">
        <h2 className="text-3xl font-bold text-center mb-14">
          Your Fans can buy you a Chai
        </h2>
        <div className="flex flex-col md:flex-row gap-8 md:gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              className="bg-slate-400 rounded-full p-2 text-black"
              width={88}
              src="/man.gif"
              alt=""
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">
              Your fans are available to support you
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              className="bg-slate-400 rounded-full p-2 text-black"
              width={88}
              src="/coin.gif"
              alt=""
            />
            <p className="font-bold text-center">Fans want to contribute</p>
            <p className="text-center">
              Your fans are willing to contribute financially
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              className="bg-slate-400 rounded-full p-2 text-black"
              width={88}
              src="/group.gif"
              alt=""
            />
            <p className="font-bold text-center">Fans want to collaborate</p>
            <p className="text-center">
              Your fans are ready to collaborate with you
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>
<div className="text-white container mx-auto max-w-3xl px-6 my-20 text-center">
  <p className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
    Your Small Tip, Their Big Dream
  </p>
  <p className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-relaxed">
    Whether it&apos;s a coffee or a kind word — every gesture counts.
  </p>
</div>
<div className="bg-white h-1 opacity-10"></div>
      {/* FAQs Section */}
      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col items-center justify-center px-6">
        <h2 className="text-3xl font-bold text-center mb-14">FAQs</h2>
        <div className="bg-white/10 w-full max-w-3xl rounded-xl p-6 md:p-8">
          <FAQItem
            question="What is Tip For My Sip?"
            answer="It's a platform where supporters can tip their favorite creators to encourage their work."
          />
          <FAQItem
            question="How do I receive tips?"
            answer="Creators can receive payments through secure Razorpay integration."
          />
          <FAQItem
            question="Is there a minimum tip amount?"
            answer="The minimum amount is ₹1 — even a small gesture means a lot."
          />
          <FAQItem
            question="Do I need an account to send a tip?"
            answer="No account is needed. Just enter details and send your tip securely!"
          />
          <FAQItem
            question="Is this platform free?"
            answer="Yes, there are no fees for supporters. Creators may have nominal payment gateway deductions."
          />
        </div>
      </div>
    </>
  );
}
