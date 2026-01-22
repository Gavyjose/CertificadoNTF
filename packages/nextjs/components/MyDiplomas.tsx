"use client";

import React from "react";
import { DiplomaSVG } from "./DiplomaSVG";
import { useAccount } from "wagmi";
import { useScaffoldEventHistory, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const MyDiplomas = () => {
  const { address: connectedAddress } = useAccount();

  // Leemos el balance de NFTs del usuario
  const { data: balance } = useScaffoldReadContract({
    contractName: "DiplomaNFT",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  // Obtenemos el historial de diplomas emitidos a esta dirección
  const { data: mintedEvents, isLoading: isEventsLoading } = useScaffoldEventHistory({
    contractName: "DiplomaNFT",
    eventName: "DiplomaMinted",
    fromBlock: 10000000n,
    filters: { recipient: connectedAddress },
    watch: true,
  });

  // En una DApp real, usaríamos un indexador (Subgraph) para obtener la lista de IDs.
  // Para este ejemplo didáctico, podemos intentar "adivinar" o simplemente mostrar
  // una interfaz que explique cómo se consultan los datos on-chain.

  // Nota: En Scaffold-ETH podemos usar useScaffoldEventHistory pero para simplicidad
  // aquí mostraremos un mensaje si no hay balance.

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Mis Diplomas</h2>
        <div className="badge badge-primary p-4 gap-2">Balance: {balance?.toString() || "0"} NFTs</div>
      </div>

      {isEventsLoading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : !mintedEvents || mintedEvents.length === 0 ? (
        <div className="bg-secondary p-12 rounded-3xl text-center border-2 border-dashed border-primary/30">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold mb-2">Aún no tienes diplomas</h3>
          <p className="opacity-70 max-w-md mx-auto mb-6">
            Completa un curso y espera a que la institución emita tu NFT. ¡Tus logros aparecerán aquí de forma
            inmutable!
          </p>
          <div className="bg-base-300 p-4 rounded-xl text-left text-sm max-w-lg mx-auto border border-primary/10">
            <h4 className="font-bold text-primary mb-1">🎓 Concepto Blockchain: Propiedad Digital</h4>
            <p>
              A diferencia de un PDF, un diploma NFT te pertenece a ti (a tu wallet) y nadie puede quitártelo ni
              falsificarlo.
            </p>
          </div>
          {balance && balance > 0n && (
            <div className="mt-4 text-xs opacity-50">
              Nota: Tienes un balance de {balance.toString()} pero no pudimos recuperar el historial de eventos. Esto
              puede deberse a la latencia de la red Sepolia. Por favor recarga en unos momentos.
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {mintedEvents.map(event => (
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
                <p className="text-sm opacity-70">Emitido por: {event.args.institution}</p>
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
