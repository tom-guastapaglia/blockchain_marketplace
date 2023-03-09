const $ = require("jquery");
const Web3 = require("web3");
const contract = require("@truffle/contract");
const marketplaceContractJson = require("./build/contracts/Marketplace.json"); 

$(document).ready(() => {
  const web3Provider = new Web3.providers.HttpProvider(
    "https://rpc-mumbai.matic.today"
  );
  const web3 = new Web3(web3Provider);

  const Marketplace = contract(marketplaceContractJson);
  Marketplace.setProvider(web3Provider);

  const marketplaceInstance = Marketplace.at("0x..."); // Adresse de déploiement de votre contrat sur Mumbai

  // Obtenir le statut actuel de la commande
  marketplaceInstance.getStatus({ from: "0x..." }, (error, result) => {
    if (!error) {
      $("#status").text(result);
    } else {
      console.error(error);
    }
  });

  // Mettre à jour le statut de la commande
  $("#update-status-form").on("submit", (event) => {
    event.preventDefault();
    const newStatus = $("#new-status").val();
    marketplaceInstance.Status(
      newStatus,
      { from: "0x..." }, // Adresse du vendeur (propriétaire du contrat)
      (error, result) => {
        if (!error) {
          console.log(result);
          // Mettre à jour l'affichage avec le nouveau statut
          $("#status").text(newStatus);
        } else {
          console.error(error);
        }
      }
    );
  });
});