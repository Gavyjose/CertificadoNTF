// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DiplomaNFT
 * @dev Contrato para la emisión de diplomas como NFTs educativos.
 * Este contrato hereda de:
 * - ERC721: Estándar básico de tokens no fungibles (NFT).
 * - ERC721URIStorage: Extensión para manejar metadatos (URIs) vinculados a cada token.
 * - Ownable: Control de acceso para que solo el propietario (institución) pueda ejecutar ciertas funciones.
 */
contract DiplomaNFT is ERC721, ERC721URIStorage, Ownable {
    // Contador interno para asignar IDs únicos y correlativos a cada diploma.
    uint256 private _nextTokenId;

    // Estructura que define los datos básicos que se guardarán "on-chain" para cada diploma.
    struct DiplomaData {
        string name;         // Nombre del estudiante/graduando.
        string institution;  // Nombre de la institución que otorga el título.
        uint256 date;        // Fecha de emisión (timestamp de la blockchain).
        string course;       // Nombre del curso o diplomado.
    }

    // Almacena la información de cada diploma vinculada a su ID de token.
    // Esto permite consultar los datos del diploma directamente en la blockchain.
    mapping(uint256 => DiplomaData) public diplomas;

    // Evento que se emite cada vez que se crea un diploma.
    // Útil para que las aplicaciones externas (frontend) detecten nuevas emisiones.
    event DiplomaMinted(
        uint256 indexed tokenId,
        address indexed recipient,
        string name,
        string institution,
        string course
    );

    /**
     * @dev constructor del contrato.
     * @param initialOwner Dirección de la billetera que administrará el contrato (usualmente la institución).
     */
    constructor(address initialOwner) 
        ERC721("DiplomaNFT", "DNFT") 
        Ownable(initialOwner) 
    {}

    /**
     * @dev Procedimiento para emitir (acuñar/mint) un nuevo diploma.
     * Solo el dueño del contrato (institución emisora) puede llamar a esta función gracias a 'onlyOwner'.
     * 
     * El procedimiento es:
     * 1. Se genera un nuevo ID incremental.
     * 2. Se crea el NFT y se asigna a la dirección del estudiante.
     * 3. Se vincula el URI (link a IPFS con imagen/pdf y metadatos JSON).
     * 4. Se guardan los datos clave en el mapping 'diplomas'.
     * 5. Se emite un evento para registro histórico.
     * 
     * @param to Dirección de la billetera del estudiante que recibe el diploma.
     * @param uri Enlace (IPFS/Cid) a los metadatos detallados del diploma.
     * @param name Nombre completo del estudiante.
     * @param institution Nombre de la entidad certificadora.
     * @param course Título o curso obtenido.
     */
    function mintDiploma(
        address to,
        string memory uri,
        string memory name,
        string memory institution,
        string memory course
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        
        // Crea el token y lo transfiere de forma segura al destinatario.
        _safeMint(to, tokenId);
        
        // Asocia el URI que contiene el arte y metadatos del NFT.
        _setTokenURI(tokenId, uri);

        // Guarda la información estructurada en la blockchain para auditoría fácil.
        diplomas[tokenId] = DiplomaData({
            name: name,
            institution: institution,
            date: block.timestamp,
            course: course
        });

        // Notifica a la red que se ha emitido un nuevo diploma.
        emit DiplomaMinted(tokenId, to, name, institution, course);

        return tokenId;
    }

    /**
     * @dev Devuelve el URI del token. Requerido por la herencia de ERC721URIStorage.
     * @param tokenId ID del diploma a consultar.
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    /**
     * @dev Función técnica para verificar compatibilidad con otros estándares.
     * @param interfaceId ID de la interfaz a consultar.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
