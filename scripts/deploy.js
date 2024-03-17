
const hre = require("hardhat");
//0x5FbDB2315678afecb367f032d93F642f64180aa3
// 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
async function main() {
 
  const crowdFunding = await hre.ethers.deployContract("CrowdFunding");

  await crowdFunding.waitForDeployment();

  console.log(
    `CrowdFunding deployed to ${crowdFunding.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
