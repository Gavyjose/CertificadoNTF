"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { NextPage } from "next";
import { AllDiplomas } from "~~/components/AllDiplomas";
import { MintDiploma } from "~~/components/MintDiploma";
import { MyDiplomas } from "~~/components/MyDiplomas";

const HomeContent = () => {
  const [activeTab, setActiveTab] = useState<"mint" | "gallery" | "all">("mint");
  const searchParams = useSearchParams();
  const isStudentView = searchParams.get("view") === "student";

  useEffect(() => {
    if (isStudentView) {
      setActiveTab("gallery");
      return;
    }
    const tab = searchParams.get("tab");
    if (tab === "gallery") {
      setActiveTab("gallery");
    } else if (tab === "mint") {
      setActiveTab("mint");
    }
  }, [searchParams, isStudentView]);

  return (
    <div className="flex-grow bg-base-100">
      {/* Hero / Welcome Section */}
      <div className="bg-primary/5 border-b border-primary/10 py-12 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            Universidad Politecnica Territorial de Aragua{" "}
            <span className="text-primary italic">&quot;Federico Brito Figueroa&quot;</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 px-4 pb-20">
        {/* Navigation Tabs */}
        {!isStudentView && (
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
            <button
              className={`tab tab-lg px-8 rounded-xl transition-all ${activeTab === "all" ? "tab-active bg-primary text-primary-content" : "hover:bg-primary/10"}`}
              onClick={() => setActiveTab("all")}
            >
              📜 Certificados Emitidos
            </button>
          </div>
        )}

        {/* Content Section */}
        <div className="animate-in fade-in duration-500">
          {activeTab === "mint" ? (
            <div className="space-y-8">
              <MintDiploma />
            </div>
          ) : activeTab === "gallery" ? (
            <MyDiplomas />
          ) : (
            <AllDiplomas />
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
