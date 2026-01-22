import { expect } from "chai";
import { ethers } from "hardhat";
import { DiplomaNFT } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("DiplomaNFT", function () {
    let diplomaNFT: DiplomaNFT;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;

    beforeEach(async () => {
        [owner, addr1] = await ethers.getSigners();
        const DiplomaNFTFactory = await ethers.getContractFactory("DiplomaNFT");
        diplomaNFT = (await DiplomaNFTFactory.deploy(owner.address)) as DiplomaNFT;
        await diplomaNFT.waitForDeployment();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await diplomaNFT.owner()).to.equal(owner.address);
        });

        it("Should have the correct name and symbol", async function () {
            expect(await diplomaNFT.name()).to.equal("DiplomaNFT");
            expect(await diplomaNFT.symbol()).to.equal("DNFT");
        });
    });

    describe("Minting", function () {
        it("Should allow the owner to mint a diploma", async function () {
            const uri = "https://example.com/nft/1";
            const name = "John Doe";
            const institution = "Blockchain University";
            const course = "Blockchain Basics";

            await expect(diplomaNFT.mintDiploma(addr1.address, uri, name, institution, course))
                .to.emit(diplomaNFT, "DiplomaMinted")
                .withArgs(0, addr1.address, name, institution, course);

            expect(await diplomaNFT.balanceOf(addr1.address)).to.equal(1);
            expect(await diplomaNFT.tokenURI(0)).to.equal(uri);

            const diploma = await diplomaNFT.diplomas(0);
            expect(diploma.name).to.equal(name);
            expect(diploma.institution).to.equal(institution);
            expect(diploma.course).to.equal(course);
        });

        it("Should fail if a non-owner tries to mint", async function () {
            const uri = "https://example.com/nft/1";
            await expect(
                diplomaNFT.connect(addr1).mintDiploma(addr1.address, uri, "Name", "Inst", "Course")
            ).to.be.revertedWithCustomError(diplomaNFT, "OwnableUnauthorizedAccount");
        });
    });

    describe("Transfers", function () {
        it("Should allow transfers of diplomas", async function () {
            const uri = "https://example.com/nft/1";
            await diplomaNFT.mintDiploma(owner.address, uri, "John", "Uni", "Basics");

            await diplomaNFT.transferFrom(owner.address, addr1.address, 0);
            expect(await diplomaNFT.ownerOf(0)).to.equal(addr1.address);
        });
    });
});
