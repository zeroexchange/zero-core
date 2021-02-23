const ethers = require('ethers');

const MNEMONIC = process.env.MNEMONIC;
const PROVIDER_ADDR = process.env.WEB3_PROVIDER_ADDR;

(async () => {
    const provider = new ethers.providers.JsonRpcProvider(PROVIDER_ADDR);
    const wallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(provider);

    const solcOut = require('./build/ZEROFactory.json');
    const contractFactory = ethers.ContractFactory.fromSolidity(solcOut, wallet);
    const feeToSetter = wallet.address;
    const contract = await contractFactory.deploy(feeToSetter);
    // use this address to deploy zero-periphery
    console.log(`Factory: https://testnet.bscscan.com/address/${contract.address}`);
})();
