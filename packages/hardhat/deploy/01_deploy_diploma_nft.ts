import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "DiplomaNFT" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployDiplomaNFT: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("DiplomaNFT", {
    from: deployer,
    // Contract constructor arguments (initialOwner)
    args: ["0x0645198991a83031e59B5A5889519b4Cb0D993ad"],
    log: true,
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const diplomaNFT = await hre.ethers.getContract<Contract>("DiplomaNFT", deployer);
  console.log("🎓 DiplomaNFT deployed at:", await diplomaNFT.getAddress());
};

export default deployDiplomaNFT;

deployDiplomaNFT.tags = ["DiplomaNFT"];
