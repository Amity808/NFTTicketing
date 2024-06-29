// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@zetachain/protocol-contracts/contracts/zevm/SystemContract.sol";
import "@zetachain/protocol-contracts/contracts/zevm/interfaces/zContract.sol";
import "@zetachain/toolkit/contracts/BytesHelperLib.sol";
import "@zetachain/toolkit/contracts/OnlySystem.sol";

contract MyToken is zContract, OnlySystem, ERC721, ERC721Enumerable, ERC721URIStorage {
    uint256 public _nextTokenId;
    SystemContract public systemContract;

    enum TicketStatus {
        ACTIVE,
        NOTAVAILABLE,
        EVENTDONE,
        PAUSE
    }

    uint256 ticketLen;

    struct Ticket {
        uint256 price;
        address creator;
        uint256 AvailableTiket;
        uint256 sold;
        string URI;
        uint256 expireDate;
        uint256 eventDate;
        uint256 startDate;
        TicketStatus ticketStatus;
        uint256 tokenID;
    }

    struct TicketSold {
        uint256 price;
        string URI;
        uint256 amount;
        
    }

    mapping (uint256 => Ticket) public _tickets;
    mapping (address => TicketSold[]) public _ticketSold;

    constructor(address systemContractAddress)
        ERC721("EntertainMent", "TKT")
    {
        systemContract = SystemContract(systemContractAddress);
    }


    function createEvvent(address _creator, uint256 _price, uint256 _noOfTicket, uint256 _eventDate, uint256 _endDate, string memory _URI) external {
        Ticket storage ticket = _tickets[ticketLen++];
        ticket.creator = _creator;
        ticket.price= _price;
        ticket.sold = 0;
        ticket.ticketStatus = TicketStatus.ACTIVE;
        ticket.eventDate= _eventDate * 1 days;
        ticket.startDate = block.timestamp;
        ticket.expireDate = block.timestamp + ticket.eventDate;
        ticket.URI = _URI;
        ticket.AvailableTiket = _noOfTicket;
    }





    // function safeMint(address to, string memory uri, uint256 _ticketLen) public payable  {
    function safeMint(uint256 _ticketLen) public payable  {
        require(msg.value > 0, "the amount is low");
        require(_ticketLen < ticketLen, "invalid index");
        Ticket storage ticket = _tickets[_ticketLen];
        require(ticket.AvailableTiket > 0, "ticket is not available");
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, ticket.URI);
        ticket.tokenID = tokenId;
        ticket.price = msg.value;
        ticket.sold += 1;
        ticket.AvailableTiket -=1;

        _ticketSold[msg.sender].push(
            TicketSold(
                msg.value,
                ticket.URI,
                msg.value
            )
         );
        
    }
    function allTicketSolds(address _address) public view returns (TicketSold[] memory) {
        return _ticketSold[_address];
    }
    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    receive() external payable {}
}