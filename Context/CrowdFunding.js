// Import the necessary modules from Next.js
'use client'

import React, { useState, useEffect } from 'react';
import Wenb3Modal from "web3modal";
import { ethers } from "ethers";
import Web3 from 'web3'


//INTERNAL IMPPORT
import { CrowdFundingABI, CrowdFundingAddress } from './constants';

//FTECH SMART CONTRACT
const fetchContract = (signerOrProvider) => new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

export const CrowdFundingContext = React.createContext();


export const CrowdFundingProvider = ({ children }) => {
    const titleData = "Crowd Funding Contract";
    const [currentAccount, setCurrentAccount] = useState("");
    const [state, saveState] = useState({ web3: null, contract: null, account: null })

    const createCampaign = async (campaign) => {
        const { title, description, amount, deadline } = campaign;

        //
        try {
            if (window.ethereum) {
                // const web3=new Web3()
                const web3 = new Web3(window.ethereum);
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                // const contractAddress = "0x809883c4cd80b098ba142d52eF408c06CCE58A57"; //deployed contract address
                const contract = new web3.eth.Contract(CrowdFundingABI, CrowdFundingAddress);
                setCurrentAccount(accounts[0])
                saveState({ web3: web3, contract: contract, account: accounts[0] });

                // navigateTo("/view-all-tasks");
                console.log(contract.methods)
                await contract.methods.createCampaign(currentAccount, title, description, ethers.parseUnits(amount, 18),
                    new Date(deadline).getTime()).send({ from: currentAccount });
                alert("Created Success Fully...")
                // await transaction.wait();


            } else {
                console.log("Install Meta ask")
            }
        } catch (error) {
            console.log(error.message)
        }
        //
        // const web3Modal = new Wenb3Modal();
        // console.log("1232424", web3Modal)
        // const connection = await web3Modal.connect();
        // console.log("efdfdt", connection)
        // const provider = new ethers(connection);
        // console.log("ether", provider)
        // const signer = provider.getSigner();
        // const contract = fetchContract(signer);

        // console.log(currentAccount);
        // try {
        //     const transaction = await state.contract.createCampaign(
        //         currentAccount, //owner
        //         title, //title
        //         description, //desc
        //         ethers.parseUnits(amount, 18),
        //         new Date(deadline).getTime() //deadline
        //     );

        //     await transaction.wait();

        //     console.log("contract call success", transaction);
        // } catch (error) {
        //     console.log("contract call failure", error);
        // }
    };

    const getCampaigns = async () => {
        // const provider = new ethers.JsonRpcProvider();
        // const contract = fetchContract(provider);

        const campaigns = await state.contract?.methods.getCampaigns().call();
        console.log("4444444",campaigns)

        const parsedCampaigns = campaigns?.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: campaign.target.toString(),
            deadline: campaign.deadline.toNumber(),
            amountCollected: campaign.amountCollected.toString(),
            pId: i,
        }));

        console.log(parsedCampaigns)

        return parsedCampaigns;
    };

    const getUserCampaigns = async () => {
        // const provider = new ethers.JsonRpcProvider();
        // const contract = fetchContract(provider);

        const allCampaigns = await state.contract?.methods.getCampaigns().call();

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        const currentUser = accounts[0];

        const filteredCampaigns = allCampaigns?.filter(
            (campaign) => campaign.owner === "0x5FbDB2315678afecb367f032d93F642f64180aa3"
        );

        const userData = filteredCampaigns?.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: campaign.target.toString(),
            deadline: campaign.deadline.toNumber(),
            amountCollected: campaign.amountCollected.toString(),
            pId: i,
        }));

        return userData;
    }

    const donate = async (pId, amount) => {
        const web3Modal = new Wenb3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const campaignData = await contract.donateToCampaign(pId, {
            value: ethers.parseEther(amount),
        });

        await campaignData.wait();
        location.reload();

        return campaignData;
    }

    const getDonations = async (pId) => {
        const provider = new ethers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const donations = await contract.getDonators(pId);
        const noOfDonations = donations[0].length;

        const parsedDonations = [];

        for (let i = 0; i < noOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donations: ethers.formatEther(donations[1][i].toString()),
            });
        }

        return parsedDonations;
    }



    //CHECK IF WALLET IS CONNECTED OR NOT

    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum)
                return setOpenError(true), setError("Install MetaMask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No Account Found");
            }
        } catch (error) {
            console.log("Something wrong while connecting to wallet. error: ", error);
        }
    };

    useEffect(() => {
        checkIfWalletConnected();
    }, []);


    //CONNECT WALLET FUNCTION
    const connectWallet = async () => {
        // try {
        //     if (!window.ethereum) return console.log("Install MetaMask");


        //     const accounts = await window.ethereum.request({
        //         method: "eth_requestAccounts",
        //     });
        //     setCurrentAccount(accounts[0]);
        // } catch (error) {
        //     console.log("Error while connecting to wallet. error: ", error);
        // }

        //
        try {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                // const contractAddress = "0x809883c4cd80b098ba142d52eF408c06CCE58A57"; //deployed contract address
                const contract = new web3.eth.Contract(CrowdFundingABI, CrowdFundingAddress);
                setCurrentAccount(accounts[0])
                saveState({ web3: web3, contract: contract, account: accounts[0] });
                alert("Connected Successfully...")
                // navigateTo("/view-all-tasks");
            } else {
                throw new Error("Please install MetaMask");
            }
        } catch (error) {
            console.log(error.message);
        }

        //
    };

    return (
        <CrowdFundingContext.Provider
            value={{
                titleData,
                currentAccount,
                createCampaign,
                getCampaigns,
                getUserCampaigns,
                donate, state,
                getDonations,
                connectWallet
            }}
        >
            {children}
        </CrowdFundingContext.Provider>
    );

};