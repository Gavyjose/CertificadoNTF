"use client";

import React from "react";
import { DiplomaSVG } from "./DiplomaSVG";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const MyDiplomas = () => {
  const { address: connectedAddress } = useAccount();

  // Leemos el balance de NFTs del usuario
  const { data: balance } = useScaffoldReadContract({
    contractName: "DiplomaNFT",
    functionName: "balanceOf",
    args: [connectedAddress],
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

      {!balance || balance.toString() === "0" ? (
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
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Aquí iteraríamos sobre los IDs de los diplomas si tuviéramos la lista */}
          {/* Como demostración, mostramos un placeholder con los datos del contrato */}
          <div className="card bg-base-100 shadow-xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all group">
            <div className="p-2 bg-secondary group-hover:bg-primary/10 transition-colors">
              <DiplomaSVG
                name="Gavy Jose Colmenares"
                institution="Blockchain Academy"
                course="Maestría en Blockchain"
                date="20 de enero de 2026"
              />
            </div>
            <div className="card-body p-4">
              <h3 className="font-bold text-lg">Maestría en Blockchain</h3>
              <p className="text-sm opacity-70">Emitido por: Blockchain Academy</p>
              <div className="card-actions justify-end mt-2">
                <button className="btn btn-primary btn-sm btn-outline">Ver en Explorer</button>
                <button className="btn btn-primary btn-sm">Compartir</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
