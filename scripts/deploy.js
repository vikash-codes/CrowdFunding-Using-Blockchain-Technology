
const hre = require("hardhat");

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const unlockTime = currentTimestampInSeconds + 60;

  // const lockedAmount = hre.ethers.parseEther("0.001");

  // const crowdFunding = await hre.ethers.deployContract("Crowdfunding", [unlockTime], {
  //   value: lockedAmount,
  // });
  const crowdFunding = await hre.ethers.deployContract("Crowdfunding");

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
