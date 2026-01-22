import React from "react";

interface DiplomaProps {
  name: string;
  institution: string;
  course: string;
  date?: string;
}

export const DiplomaSVG: React.FC<DiplomaProps> = ({ name, institution, course, date }) => {
  const currentDate =
    date ||
    new Date().toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="rounded-lg shadow-2xl"
    >
      {/* Background */}
      <rect width="800" height="600" fill="#0F172A" />

      {/* Decorative Border */}
      <rect x="20" y="20" width="760" height="560" stroke="#10B981" strokeWidth="4" fill="none" />
      <rect x="30" y="30" width="740" height="540" stroke="#34D399" strokeWidth="1" fill="none" opacity="0.5" />

      {/* Title */}
      <text
        x="400"
        y="120"
        textAnchor="middle"
        fill="white"
        style={{ fontSize: "40px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px" }}
      >
        Certificado
      </text>
      <text
        x="400"
        y="160"
        textAnchor="middle"
        fill="#10B981"
        style={{ fontSize: "20px", fontWeight: "300", letterSpacing: "5px" }}
      >
        DE PARTICIPACIÓN
      </text>

      {/* Content */}
      <text x="400" y="250" textAnchor="middle" fill="#94A3B8" style={{ fontSize: "18px" }}>
        {institution} concede a
      </text>

      <text x="400" y="320" textAnchor="middle" fill="white" style={{ fontSize: "36px", fontWeight: "italic" }}>
        {name || "Nombre del Estudiante"}
      </text>

      <text x="400" y="380" textAnchor="middle" fill="#94A3B8" style={{ fontSize: "18px" }}>
        El presente certificado de participación en el evento
      </text>

      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />

      <text x="400" y="430" textAnchor="middle" fill="#FBBF24" style={{ fontSize: "24px", fontWeight: "bold" }}>
        {course || "Nombre del Curso"}
      </text>

      {/* Date */}
      <text x="400" y="500" textAnchor="middle" fill="#94A3B8" style={{ fontSize: "16px" }}>
        {currentDate}
      </text>

      {/* Signatures / Logos */}
      <text x="650" y="540" textAnchor="middle" fill="white" style={{ fontSize: "14px", fontStyle: "italic" }}>
        Firma Autorizada
      </text>
      <line x1="580" y1="520" x2="720" y2="520" stroke="white" strokeWidth="1" />

      <text x="150" y="540" textAnchor="middle" fill="#10B981" style={{ fontSize: "18px", fontWeight: "bold" }}>
        BLOCKCHAIN ACADEMY
      </text>
    </svg>
  );
};
