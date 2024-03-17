// Import the necessary modules from Next.js
'use client'

import React, {useState, useEffect} from 'react';
import Wenb3Modal from "web3modal";
import { ethers } from "ethers";


//INTERNAL IMPPORT
import { CrowdFundingABI, CrowdFundingAddress } from './constants';

//FTECH SMART CONTRACT
const fetchContract = (singerOrProvider) => new ethers.Contract(CrowdFundingABI, CrowdFundingAddress, singerOrProvider);

export const CrowdFundingContext = React.createContext();


export const CrowdFundingProvider = ({children}) => {
    const titleData = "Crowd Funding Contract";
    const [currentAccount, setCurrentAccount] = useState("");

    const createCampaign = async (campaign) => {
        const {title, description, amount, deadline} = campaign;
        const web3Modal = new Wenb3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        console.log(currentAccount);
        try{
            const transaction = await contract.createCampaign(
                currentAccount, //owner
                title, //title
                description, //desc
                ethers.parseUnits(amount, 18),
                new Date(deadline).getTime() //deadline
            );

            await transaction.wait();

            console.log("contract call sucess", transaction);
        }catch(error){
            console.log("contract call failure",error);
        }
    };

    const getCampaigns = async () => {
        const provider = new ethers.JsonRpcProvider();
        const contract = fetchContract(provider);
        
        const campaign = await contract.getCampaigns();

        const parseCampaigns = campaign.map((campaign, i)=> ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.formatEther(campaign.amountCollected.toString()),
            pId: i,
        }));

        return parseCampaigns;
    };

    const getUserCampaigns =  async () => {
        const provider = new ethers.JsonRpcProvider();
        const contract = fetchContract(provider);
        
        const campaign = await contract.getCampaigns();
        
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        const currentUser = accounts[0];

        const filteredCampaigns = allCampaigns.filter(
            (campaign) => campaign.owner === "0x5FbDB2315678afecb367f032d93F642f64180aa3"
        )

        const userData = filteredCampaigns.map((campaign,i)=>({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.formatEther(campaign.amountCollected.toString()),
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

        const parseDonations = [];

        for( let i=0; i<noOfDonations; i++){
            parseDonations.push({
                donator: donations[0][i],
                donations: ethers.formatEther(donations[1][i].toString()),
            });
        }

        return parseDonations;
    }



    //CHECK IF WALLET IS CONNECTED OR NOT

    const checkIfWalletConnected = async () => {
        try{
            if(!window.ethereum)
                return setOpenError(true), setError("Install MetaMask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if(accounts.length){
                setCurrentAccount(accounts[0]);
            }else{
                console.log("No Account Found");
            }
        }catch(error){
            console.log("Something wrong while connecting to wallet. error: ", error);
        }
    };

    useEffect(()=>{
        checkIfWalletConnected();
    }, []);


    //CONNECT WALLET FUNCTION
    const connectWallet = async () => {
        try{
            if(!window.ethereum) return console.log("Install MetaMask");

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentAccount(accounts[0]);
        }catch(error){
            console.log("Error while connecting to wallet. error: ", error);
        }
    };

    return (
    <CrowdFundingContext.Provider
    value ={{
        titleData,
        currentAccount, 
        createCampaign,
        getCampaigns,
        donate,
        getDonations,
        connectWallet
    }}
    >
        {children}
    </CrowdFundingContext.Provider>
    );
    
};