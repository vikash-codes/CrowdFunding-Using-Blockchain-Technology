//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract CrowdFunding{
    struct Campaign{
        address owner;  //creator of campaign
        string title;
        string description;
        uint256 target; //target amt i wanna raise
        uint256 deadline;   
        uint256 amountCollected;
        address[] donators; //donors of crowdfunding
        uint256[] donations;    //donations by donors
    }

    mapping (uint256=> Campaign) public campaigns;  
    //every CF will have unique campaign id which is passed in as parameter to give resp data for that campaign
    // inside campaigns al data will be stored

    uint256 public noOfCampaigns = 0;

    function createCampaign (address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline) public returns (uint256){
        Campaign storage campaign = campaigns[noOfCampaigns];

        require(campaign.deadline<block.timestamp, "The Deadline should be a date in the future");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;

        noOfCampaigns++;

        return noOfCampaigns - 1;
    }

    function donateToCampaign (uint256 _id) public payable{
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        bool sent = payable(campaign.owner).send(amount);

        if(sent){
            campaign.amountCollected = campaign.amountCollected + amount;
        }else{
            // Handle failed payment here, revert transaction or emit an event
        revert("Failed to send funds to campaign owner");
        }
    
    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory){
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory){
        Campaign[] memory allCampaigns = new Campaign[](noOfCampaigns);

        for(uint i=0; i<noOfCampaigns; i++){
            Campaign storage item = campaigns[i];
            allCampaigns[i]=item;
        }
        return allCampaigns;
    }

}