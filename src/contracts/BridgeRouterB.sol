// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {AxelarExecutable} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/executables/AxelarExecutable.sol";
import {IAxelarGateway} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
import {IAxelarGasService} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";
import {IERC20} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol";

interface BridgeToken {
    function mint(address _addr, uint256 _amount) external;

    function burn(uint256 _amount) external;
}

contract BridgeSender is AxelarExecutable {
    IAxelarGasService gasReceiver;

    constructor(address gateway_, address gasReceiver_)
        AxelarExecutable(gateway_)
    {
        gasReceiver = IAxelarGasService(gasReceiver_);
    }

    event bridgeTokens(
        uint256 tokenValue,
        address indexed srcTokenAddress,
        address indexed userAddress
    );

    // Call this function to update the value of this contract along with all its siblings'.
    function bridgeToken(
        string memory destinationChain,
        string memory destinationAddress,
        address tokenAddress_,
        uint256 tokenValue_,
        address _userAddress
    ) external payable {
        bytes memory payload = abi.encode(
            tokenValue_,
            tokenAddress_,
            _userAddress
        );
        if (msg.value > 0) {
            gasReceiver.payNativeGasForContractCall{value: msg.value}(
                address(this),
                destinationChain,
                destinationAddress,
                payload,
                msg.sender
            );
        }
        //approve this contract on the front end
        IERC20(tokenAddress_).transferFrom(
            msg.sender,
            address(this),
            tokenValue_
        );
        BridgeToken(tokenAddress_).burn(tokenValue_);
        gateway.callContract(destinationChain, destinationAddress, payload);
        emit bridgeTokens(tokenValue_, tokenAddress_, _userAddress);
    }

    function faucet(address[] memory _tokenAddress, address _dst) public {
        for (uint256 i = 0; i < _tokenAddress.length; i++) {
            BridgeToken(_tokenAddress[i]).mint(_dst, 10000 * 10**18);
        }
    }
}
