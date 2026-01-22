"use client";

import React, { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";
import { DiplomaSVG } from "./DiplomaSVG";
import { notification } from "~~/utils/scaffold-eth";

export const MintDiploma = () => {
    const { address: connectedAddress } = useAccount();
    const [name, setName] = useState("");
    const [course, setCourse] = useState("");
    const [institution, setInstitution] = useState("Blockchain Academy");
    const [recipient, setRecipient] = useState("");

    const { data: diplomaNFTContract } = useScaffoldContract({
        contractName: "DiplomaNFT",
    });

    const { writeContractAsync, isPending } = useWriteContract();

    const handleMint = async () => {
        if (!name || !course || !recipient) {
            notification.error("Por favor completa todos los campos");
            return;
        }

        try {
            const uri = JSON.stringify({
                name,
                course,
                institution,
                date: new Date().toISOString(),
            });

            await writeContractAsync({
                address: diplomaNFTContract?.address,
                abi: diplomaNFTContract?.abi,
                functionName: "mintDiploma",
                args: [recipient, uri, name, institution, course],
            });

            notification.success("¡Transacción enviada! Esperando confirmación...");
        } catch (e) {
            console.error("Error minting:", e);
            notification.error("Hubo un error al acuñar el diploma");
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 p-4">
            {/* Form Section */}
            <div className="flex-1 bg-secondary p-6 rounded-2xl shadow-xl border border-primary/20">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="text-primary text-3xl">🎓</span> Acuñar Nuevo Diploma
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Dirección del Recipiente (Wallet)</span>
                            <div className="tooltip tooltip-right" data-tip="La dirección de Ethereum del estudiante (0x...)">
                                <span className="badge badge-primary cursor-help">?</span>
                            </div>
                        </label>
                        <input
                            type="text"
                            placeholder="0x..."
                            className="input input-bordered w-full"
                            value={recipient}
                            onChange={e => setRecipient(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Nombre del Estudiante</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Ej: Juan Pérez"
                            className="input input-bordered w-full"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Nombre del Curso</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Ej: Introducción a Solidity"
                            className="input input-bordered w-full"
                            value={course}
                            onChange={e => setCourse(e.target.value)}
                        />
                    </div>

                    <button
                        className={`btn btn-primary w-full mt-6 ${isPending ? "loading" : ""}`}
                        onClick={handleMint}
                        disabled={isPending}
                    >
                        {isPending ? "Acuñando..." : "Emitir Diploma NFT"}
                    </button>

                    <p className="text-xs opacity-60 italic mt-4">
                        * Al acuñar este diploma, se registrará una transacción inmutable en la blockchain.
                    </p>
                </div>
            </div>

            {/* Preview Section */}
            <div className="flex-1 flex flex-col">
                <h2 className="text-2xl font-bold mb-6">Previsualización en Tiempo Real</h2>
                <div className="sticky top-4">
                    <DiplomaSVG name={name} institution={institution} course={course} />
                    <div className="mt-4 p-4 bg-base-300 rounded-xl text-sm border border-primary/10">
                        <h3 className="font-bold text-primary mb-2">💡 ¿Qué sucede detrás de escena?</h3>
                        <p className="opacity-80">
                            Estamos generando un **SVG dinámico** que representa tu diploma. Cuando haces clic en "Emitir",
                            este diseño y sus datos se asocian permanentemente a un **Token ERC-721** único.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
