// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DiplomaNFT
 * @dev Contrato para la emisión de diplomas como NFTs educativos.
 * Este contrato permite acuñar diplomas con metadatos asociados.
 */
contract DiplomaNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    struct DiplomaData {
        string name;
        string institution;
        uint256 date;
        string course;
    }

    // Mapeo para almacenar datos adicionales del diploma de forma opcional
    mapping(uint256 => DiplomaData) public diplomas;

    event DiplomaMinted(
        uint256 indexed tokenId,
        address indexed recipient,
        string name,
        string institution,
        string course
    );

    constructor(address initialOwner) 
        ERC721("DiplomaNFT", "DNFT") 
        Ownable(initialOwner) 
    {}

    /**
     * @dev Función para acuñar un nuevo diploma.
     * Solo el dueño del contrato puede acuñar diplomas (institución emisora).
     * @param to Dirección del estudiante que recibe el diploma.
     * @param uri URI con los metadatos del diploma (usualmente IPFS o JSON on-chain).
     * @param name Nombre del estudiante.
     * @param institution Nombre de la institución que emite.
     * @param course Nombre del curso finalizado.
     */
    function mintDiploma(
        address to,
        string memory uri,
        string memory name,
        string memory institution,
        string memory course
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        diplomas[tokenId] = DiplomaData({
            name: name,
            institution: institution,
            date: block.timestamp,
            course: course
        });

        emit DiplomaMinted(tokenId, to, name, institution, course);

        return tokenId;
    }

    // Las siguientes funciones son obligatorias por Solidity o por la herencia.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
