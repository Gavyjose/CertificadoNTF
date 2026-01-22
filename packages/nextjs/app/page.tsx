"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { NextPage } from "next";
import { MintDiploma } from "~~/components/MintDiploma";
import { MyDiplomas } from "~~/components/MyDiplomas";

const HomeContent = () => {
  const [activeTab, setActiveTab] = useState<"mint" | "gallery">("mint");
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "gallery") {
      setActiveTab("gallery");
    } else if (tab === "mint") {
      setActiveTab("mint");
    }
  }, [searchParams]);

  return (
    <div className="flex-grow bg-base-100">
      {/* Hero / Welcome Section */}
      <div className="bg-primary/5 border-b border-primary/10 py-12 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            Academia de <span className="text-primary italic">Diplomas NFT</span>
          </h1>
          <p className="text-lg opacity-80 max-w-2xl leading-relaxed">
            Certifica logros educativos de forma inmutable. Aprende cómo los NFTs están revolucionando la acreditación
            académica en la era Web3.
          </p>

          <div className="mt-8 flex gap-4">
            <div className="stat bg-base-200 rounded-2xl shadow-md border border-primary/10 px-6 py-2">
              <div className="stat-title text-primary font-bold">Concepto Web3</div>
              <div className="stat-desc opacity-70">Certificados Inmutables</div>
            </div>
            <div className="stat bg-base-200 rounded-2xl shadow-md border border-primary/10 px-6 py-2">
              <div className="stat-title text-accent font-bold">Standard</div>
              <div className="stat-desc opacity-70">Token ERC-721</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 px-4 pb-20">
        {/* Navigation Tabs */}
        <div className="tabs tabs-boxed bg-base-300 w-fit mx-auto mb-12 p-1.5 rounded-2xl border border-primary/5">
          <button
            className={`tab tab-lg px-8 rounded-xl transition-all ${activeTab === "mint" ? "tab-active bg-primary text-primary-content" : "hover:bg-primary/10"}`}
            onClick={() => setActiveTab("mint")}
          >
            🏫 Emitir Diploma
          </button>
          <button
            className={`tab tab-lg px-8 rounded-xl transition-all ${activeTab === "gallery" ? "tab-active bg-primary text-primary-content" : "hover:bg-primary/10"}`}
            onClick={() => setActiveTab("gallery")}
          >
            🎓 Mis Diplomas
          </button>
        </div>

        {/* Content Section */}
        <div className="animate-in fade-in duration-500">
          {activeTab === "mint" ? (
            <div className="space-y-8">
              <div className="alert bg-secondary border-primary/20 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-primary shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <div className="text-sm">
                  <h3 className="font-bold">Guía para Emisores:</h3>
                  <p>
                    Como administrador, puedes emitir certificados únicos que viven para siempre en la blockchain de
                    Sepolia.
                  </p>
                </div>
              </div>
              <MintDiploma />
            </div>
          ) : (
            <MyDiplomas />
          )}
        </div>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
};

export default Home;
