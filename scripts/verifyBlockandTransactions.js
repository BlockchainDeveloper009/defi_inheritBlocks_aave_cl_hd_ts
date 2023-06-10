const { ethers, network } = require('hardhat');

async function verifyBlockAndTransactions(blockNumber) {
  // Get the block information
  const block = await ethers.provider.getBlock(blockNumber);

  // Verify the block details
  console.log('Block Number:', block.number);
  console.log('Block Hash:', block.hash);
  console.log('Block Timestamp:', new Date(block.timestamp * 1000));

  // Verify transactions within the block
  console.log('Transactions:', block.transactions);

  for (const txHash of block.transactions) {
    // Get the transaction information
    const tx = await ethers.provider.getTransaction(txHash);

    // Verify the transaction details
    console.log('Transaction Hash:', tx.hash);
    console.log('Transaction From:', tx.from);
    console.log('Transaction To:', tx.to);
    console.log('Transaction Value:', ethers.utils.formatEther(tx.value));
    console.log('Transaction Gas Limit:', tx.gasLimit.toString());
    console.log('Transaction Gas Price:', ethers.utils.formatUnits(tx.gasPrice, 'gwei'));
    console.log('-----------------------');
  }
}

// Specify the block number to verify
const blockNumber = '7'; // Replace with the desired block number

verifyBlockAndTransactions(blockNumber)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
