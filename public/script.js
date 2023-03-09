// Création d'un objet Web3 pour communiquer avec la blockchain
const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com/'))

// Adresse de déploiement du smart contract
const contractAddress = '0xCCD3639e71A6E333fFC3d02788a286d4f3257546'

// Création d'un objet Marketplace pour interagir avec le smart contract
const marketplace = new web3.eth.Contract(Marketplace.abi, contractAddress)

// Fonction pour récupérer et afficher le statut actuel du smart contract
async function getStatus() {
  const status = await marketplace.methods.getStatus().call()
  document.getElementById('status').innerHTML = status
}

// Fonction pour définir le statut du smart contract sur Shipped ou Delivered
async function setStatus(status) {
  const accounts = await web3.eth.getAccounts()
  await marketplace.methods.setStatus(status).send({from: accounts[0]})
  getStatus()
}

// Appel de la fonction getStatus pour afficher le statut actuel lors du chargement de la page
getStatus()

function connectToMetaMask() {
  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(accounts => {
        console.log(accounts);
        // You are now connected to MetaMask and can interact with your smart contract
      })
      .catch(error => console.error(error));
  } else {
    console.log('MetaMask is not installed');
  }
}