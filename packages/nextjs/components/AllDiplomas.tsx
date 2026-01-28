"use client";

import React from "react";
import { DiplomaSVG } from "./DiplomaSVG";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

export const AllDiplomas = () => {
  // Obtenemos el historial de diplomas (todos)
  const { data: allMintedEvents, isLoading: isEventsLoading } = useScaffoldEventHistory({
    contractName: "DiplomaNFT",
    eventName: "DiplomaMinted",
    fromBlock: 10099000n, // Cerca del bloque de despliegue real
    watch: true,
    blocksBatchSize: 100000,
  });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Certificados Emitidos</h2>
        <div className="badge badge-secondary p-4 gap-2">Total: {allMintedEvents?.length || "0"}</div>
      </div>

      {isEventsLoading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : !allMintedEvents || allMintedEvents.length === 0 ? (
        <div className="bg-secondary p-12 rounded-3xl text-center border-2 border-dashed border-primary/30">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold mb-2">No hay certificados emitidos</h3>
          <p className="opacity-70 max-w-md mx-auto mb-6">Aún no se ha emitido ningún certificado en este contrato.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {allMintedEvents.map(event => (
            <div
              key={event.transactionHash}
              className="card bg-base-100 shadow-xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all group"
            >
              <div className="p-2 bg-secondary group-hover:bg-primary/10 transition-colors">
                <DiplomaSVG
                  name={event.args.name || ""}
                  institution={event.args.institution || ""}
                  course={event.args.course || ""}
                />
              </div>
              <div className="card-body p-4">
                <h3 className="font-bold text-lg">{event.args.course}</h3>
                <p className="text-sm opacity-70">
                  Otorgado a:{" "}
                  <span className="text-xs font-mono bg-base-300 px-1 rounded">
                    {event.args.recipient
                      ? `${event.args.recipient.substring(0, 6)}...${event.args.recipient.substring(38)}`
                      : ""}
                  </span>
                </p>
                <div className="card-actions justify-end mt-2">
                  <a
                    href={`https://sepolia.etherscan.io/tx/${event.transactionHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-sm btn-outline"
                  >
                    Ver en Explorer
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
