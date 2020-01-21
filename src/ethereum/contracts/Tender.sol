pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;

contract TenderFactory {
    address[] public deployedTenders;
    string[] public deployedTendersDetails;
    function createTender(string name_, uint startDate, uint lastDate, uint openDate, uint phone, string email) public {
        address newTender = new Tender(name_, startDate, lastDate, openDate, phone, email, msg.sender);
        deployedTenders.push(newTender);
        deployedTendersDetails.push(name_);
    }

    function getDeployedTenders() public view returns (address[]) {
        return deployedTenders;
    }
    
    function getDeployedTendersDetails() public view returns (string[]) {
        return deployedTendersDetails;
    }
}

contract Tender {
    string public name;
    
    struct Item {
        string description;
        uint quantity;
    }
    
    Item[] public items;
    
    uint256 public subStartDate;
    uint256 public subLastDate;
    uint256 public bidOpenDate;
    
    bool public completed;
    
    address public manager;
    uint public managerPhone;
    string public managerEmail;
    
    mapping(address => bool) approvers;
    uint approversCount = 0;
    
    struct Bid {
        address supplier;
        string documentHash;
        mapping(address => bool) approvals;
        uint approvalCount;
    }
    
    Bid[] bids;
    
    modifier alive() {
        require(!completed);
        _;
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function Tender(string name_, uint startDate, uint lastDate, uint openDate, uint phone, string email, address creator) public {
        name = name_;
        subStartDate = startDate;
        subLastDate = lastDate;
        bidOpenDate = openDate;
        manager = creator;
        managerPhone = phone;
        managerEmail = email;
    }
    
    function addApprover(address approver_) public restricted alive {
        approvers[approver_] = true;
        approversCount++;
    }
    
    function addItem(string name_, uint16 quantity_) public restricted alive{
        require(now<subStartDate);
        
        Item memory newItem = Item({
            description: name_,
            quantity: quantity_
        });
        
        items.push(newItem);
    }
    
    function createBid(string hash) public alive{
        require(msg.sender != manager);
        require(!approvers[msg.sender]);
        
        Bid memory newBid = Bid({
            supplier: msg.sender,
            documentHash: hash,
            approvalCount: 0
        });
        
        bids.push(newBid);
    }
    
    function approveBid(uint index) public alive{
        Bid storage bid = bids[index];

        require(approvers[msg.sender]);
        require(!bid.approvals[msg.sender]);

        bid.approvals[msg.sender] = true;
        bid.approvalCount++;
    }
    
    function finalize(uint index) public restricted alive {
        Bid storage bid = bids[index];
        require(bid.approvalCount==approversCount);
        completed = true;
    }

    function countApprovers() public view returns(uint) {
        return approversCount;
    }

    function getBid(uint index) public view returns(string) {
        return bids[index].documentHash;
    }
}