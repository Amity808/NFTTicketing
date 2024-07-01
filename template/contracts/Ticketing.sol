// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@zetachain/protocol-contracts/contracts/zevm/SystemContract.sol";
import "@zetachain/protocol-contracts/contracts/zevm/interfaces/zContract.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@zetachain/toolkit/contracts/BytesHelperLib.sol";
import "@zetachain/toolkit/contracts/OnlySystem.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


 contract StayStudio is zContract, ERC721, OnlySystem, ERC721URIStorage, ERC721Enumerable {
    SystemContract public systemContract;
    error CallerNotOwnerNotApproved();
    uint256 constant BITCOIN = 18332;

    mapping(uint256 => uint256) public tokenAmounts;
    mapping(uint256 => uint256) public tokenChains;

    enum TicketStatus {
        ACTIVE,
        NOTAVAILABLE,
        EVENTDONE,
        PAUSE
    }

    uint256 public _nextTokenId;
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
        address buyer;
        uint256 price;
        string URI;
        uint256 amount;
    }

    mapping (uint256 => Ticket) public _tickets;
    mapping (address => TicketSold[]) public _ticketSold;

    constructor(address systemContractAddress) ERC721("Entertainment", "ENT") {
        systemContract = SystemContract(systemContractAddress);
        _nextTokenId = 0;
    }

    function onCrossChainCall(
        zContext calldata context,
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external virtual override onlySystem(systemContract) {
        address recipient;

        if (context.chainID == BITCOIN) {
            recipient = BytesHelperLib.bytesToAddress(message, 0);
        } else {
            recipient = abi.decode(message, (address));
        }

        _mintNFT(recipient, context.chainID, amount, "");
    }

    function _mintNFT(
        address recipient,
        uint256 chainId,
        uint256 amount,
        string memory uri
    ) private {
        uint256 tokenId = _nextTokenId;
        _safeMint(recipient, tokenId);
        tokenChains[tokenId] = chainId;
        tokenAmounts[tokenId] = amount;
        _setTokenURI(tokenId, uri);

        _ticketSold[msg.sender].push(
            TicketSold(
                recipient,
                amount,
                uri,
                msg.value
            )
        );
        _nextTokenId++;
    }

    function createEvvent(address _creator, uint256 _amount, uint256 _noOfTicket, uint256 _eventDate, uint256 _endDate, string memory _URI) external {
        Ticket storage ticket = _tickets[ticketLen++];
        ticket.creator = _creator;
        ticket.price = _amount;
        ticket.sold = 0;
        ticket.ticketStatus = TicketStatus.ACTIVE;
        ticket.eventDate = _eventDate * 1 days;
        ticket.startDate = block.timestamp;
        ticket.expireDate = block.timestamp + ticket.eventDate;
        ticket.URI = _URI;
        ticket.AvailableTiket = _noOfTicket;
    }

    function allTicketSolds(address _address) public view returns (TicketSold[] memory) {
        return _ticketSold[_address];
    }

    function burnNFT(uint256 tokenId, bytes memory recipient) public {
        if (!_isApprovedOrOwner(_msgSender(), tokenId)) {
            revert CallerNotOwnerNotApproved();
        }
        address zrc20 = systemContract.gasCoinZRC20ByChainId(
            tokenChains[tokenId]
        );

        (, uint256 gasFee) = IZRC20(zrc20).withdrawGasFee();

        IZRC20(zrc20).approve(zrc20, gasFee);
        IZRC20(zrc20).withdraw(recipient, tokenAmounts[tokenId] - gasFee);

        _burn(tokenId);
        delete tokenAmounts[tokenId];
        delete tokenChains[tokenId];
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
