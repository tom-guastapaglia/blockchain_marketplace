pragma solidity ^0.8.0;

contract Marketplace {
    
    enum ShippingStatus { Shipped, Pending, Delivered }
    
    ShippingStatus public status;
    
    struct Item {
        uint256 id;
        address seller;
        address buyer;
        string name;
        uint256 price;
        ShippingStatus status;
    }
    
    mapping(uint256 => Item) public items;
    uint256 public itemCount;
    
    event ItemShipped(uint256 itemId);
    event ItemDelivered(uint256 itemId);
    event MissionComplete(uint256 itemId);
    
    address owner;
    
    modifier ownerOnly() {
        require(msg.sender == owner, "Vous netes pas le proprietaire");
        _;
    }
    
    modifier customerOnly() {
        require(msg.sender != owner, "Vous netes pas le client");
        _;
    }
    
    constructor() {
        status = ShippingStatus.Pending;
        owner = msg.sender;
    }
    
    function shipItem(uint256 _itemId) public ownerOnly {
        require(items[_itemId].status == ShippingStatus.Pending, "Litem doit etre en status pending");
        
        items[_itemId].status = ShippingStatus.Shipped;
        status = ShippingStatus.Shipped;
        emit ItemShipped(_itemId);
    }
    
    function deliverItem(uint256 _itemId) public ownerOnly {
        require(items[_itemId].status == ShippingStatus.Shipped, "Item doit etre shipped");
        
        items[_itemId].status = ShippingStatus.Delivered;
        status = ShippingStatus.Delivered;
        emit ItemDelivered(_itemId);
        emit MissionComplete(_itemId);
    }
    
    function getStatus() public view ownerOnly returns (ShippingStatus) {
        return status;
    }
    
    function checkStatus() public payable customerOnly returns (ShippingStatus) {
        require(msg.value > 0.001 ether, "montant trop faible");
        return status;
    }
    
    function createItem(string memory _name, uint256 _price) public {
        itemCount++;
        items[itemCount] = Item(itemCount, msg.sender, address(0), _name, _price, ShippingStatus.Pending);
    }
    
}