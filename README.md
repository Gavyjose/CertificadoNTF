# Academia de Diplomas NFT

Esta es una DApp educativa completa construida sobre **Scaffold-ETH 2**, diseñada para emitir, gestionar y visualizar diplomas como NFTs (Tokens ERC-721). El proyecto prioriza la claridad, la interactividad y una estética moderna tipo "Dashboard".

## 🚀 Características
- **Acuñación de Diplomas**: Interfaz intuitiva para que instituciones emitan certificados digitales.
- **Renderizado SVG Dinámico**: Los diplomas se previsualizan en tiempo real antes y después de ser acuñados.
- **Galería de Logros**: Espacio personal para que los estudiantes vean sus diplomas de forma inmutable.
- **Enfoque Didáctico**: Explicaciones integradas sobre conceptos Web3 (Gas, Wallet, Inmutabilidad, NFT).
- **Diseño Premium**: Interfaz oscura con acentos verdes, totalmente responsiva y optimizada.

## 🛠️ Tecnologías Utilizadas
- **Blockchain**: Solidity, Hardhat, OpenZeppelin (ERC-721).
- **Frontend**: Next.js, Tailwind CSS, DaisyUI.
- **Web3 Hooks**: Wagmi, RainbowKit.
- **Despliegue**: Vercel (Frontend), Sepolia Testnet (Blockchain).

## 📋 Requisitos Previos
Antes de comenzar, asegúrate de tener instalado:
- [Node.js (v18+)](https://nodejs.org/)
- [Yarn (v1.22+)](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🚀 Instrucciones de Instalación

1. **Clonar e Instalar:**
   ```bash
   git clone <url-del-repositorio>
   cd Certificados
   yarn install
   ```

2. **Iniciar la Blockchain Local:**
   En una terminal:
   ```bash
   yarn chain
   ```

3. **Desplegar los Contratos:**
   En una segunda terminal:
   ```bash
   yarn deploy
   ```

4. **Iniciar la Aplicación Frontend:**
   En una tercera terminal:
   ```bash
   yarn start
   ```
   Visita `http://localhost:3000` para interactuar con la DApp.

## 🌐 Despliegue en Redes de Prueba (Sepolia)

1. Configura tus variables de entorno en `packages/hardhat/.env` y `packages/nextjs/.env.local`.
2. Genera una cuenta de despliegue: `yarn generate`.
3. Financia la cuenta con Sepolia ETH.
4. Despliega: `yarn deploy --network sepolia`.

## 📖 Guía de Uso Educativa
- **Conectar Billetera**: Usa el botón "Connect Wallet" para vincular tu identidad digital.
- **Emitir**: Completa el formulario con los datos del estudiante. Observa cómo cambia el diseño del certificado instantáneamente.
- **Mis Diplomas**: Cambia a la pestaña de galería para ver tus NFTs. Cada diploma es una prueba matemática de tu conocimiento.

---
Desarrollado con ❤️ para principiantes en Blockchain.
# CertificadosNTF
"# CertificadosNTF" 
