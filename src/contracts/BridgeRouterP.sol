//SPDX-License-Identifier: MIT
pragma solidity >=0.8.9 <0.9.0;

import {AxelarExecutable} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/executables/AxelarExecutable.sol";
import {IAxelarGateway} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
import {IAxelarGasService} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";
import {IERC20} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol";

interface BridgeToken {
    function mint(address _addr, uint256 _amount) external;
}

contract BridgeReceiver is AxelarExecutable {
    string public sourceChain;
    string public sourceAddress;
    address public immutable DEPLOYER;
    IAxelarGasService gasReceiver;
    mapping(address => address) public bridgeTokenFromBtoP;

    constructor(address _gateway, address _gasReceiver)
        AxelarExecutable(_gateway)
    {
        gasReceiver = IAxelarGasService(_gasReceiver);
        DEPLOYER = msg.sender;
    }

    function setPairToken(
        address _tokenOnSourceNetwork,
        address _tokenOnDestNetwork
    ) external {
        require(msg.sender == DEPLOYER, "not deployer");
        bridgeTokenFromBtoP[_tokenOnSourceNetwork] = _tokenOnDestNetwork;
    }

    event Executed();
    event recieveTokens(
        uint256 tokenValue,
        address indexed srcTokenAddress,
        address indexed userAddress
    );

    // Handles calls created by setAndSend. Updates this contract's value
    function _execute(
        string memory sourceChain_,
        string memory sourceAddress_,
        bytes calldata payload_
    ) internal override {
        (uint256 tokenValue, address srcTokenAddress, address userAddress) = abi
            .decode(payload_, (uint256, address, address));
        BridgeToken(bridgeTokenFromBtoP[srcTokenAddress]).mint(
            userAddress,
            tokenValue
        );
        sourceChain = sourceChain_;
        sourceAddress = sourceAddress_;
        emit recieveTokens(tokenValue, srcTokenAddress, userAddress);
        emit Executed();
    }
}
