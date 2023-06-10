const contractArtifacts = await artifacts.readArtifactSync(contractName);
fs.writeFileSync('./artifacts/contractArtifacts.json',  JSON.stringify(contractArtifacts, null, 2));