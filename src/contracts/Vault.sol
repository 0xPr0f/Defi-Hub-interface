// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Vault {
    uint256 public immutable createdBalance;
    address public immutable vaultOwner;
    address public immutable tokenVault;
    uint256 public immutable lockStartTime;
    uint256 public immutable lockEndTime;
    bool public isActive = false;
    bool public isLocked = false;
    address public immutable Guardian;

    event Withdraw(
        address indexed token,
        address indexed owner,
        uint256 amount
    );
    event CreatedVault(
        uint256 _intokenbalance,
        address indexed _owner,
        address indexed token,
        uint256 startTime,
        uint256 endTime
    );

    constructor(
        uint256 _createdBalance,
        address _token,
        address _vaultOwner,
        uint256 _lockStartTime,
        uint256 _lockEndTime,
        address _guardian
    ) {
        require(
            (_lockEndTime - _lockStartTime) > 20 days,
            "Vault needs a minimum of 20 days"
        );
        Guardian = _guardian;
        tokenVault = _token;
        createdBalance = _createdBalance;
        vaultOwner = _vaultOwner;
        isActive = true;
        isLocked = true;
        lockStartTime = _lockStartTime;
        lockEndTime = _lockEndTime;
        emit CreatedVault(
            createdBalance,
            vaultOwner,
            tokenVault,
            lockStartTime,
            lockEndTime
        );
    }

    function unlockTime() public view returns (uint256) {
        return lockEndTime;
    }

    function hasTimePassed() public view returns (bool) {
        return block.timestamp > lockEndTime;
    }

    function withdraw(address _tokenAddress) external {
        require(block.timestamp >= lockEndTime, "unlock time hasnt reached");
        require(msg.sender == vaultOwner, "Not vault owner");
        isLocked = false;
        uint256 _balance = IERC20(_tokenAddress).balanceOf(address(this));
        IERC20(_tokenAddress).transfer(vaultOwner, _balance);
        emit Withdraw(_tokenAddress, vaultOwner, _balance);
    }

    function withdrawETH() external {
        require(block.timestamp >= lockEndTime, "unlock time hasnt reached");
        require(msg.sender == vaultOwner, "Not vault owner");
        isLocked = false;
        uint256 _balance = address(this).balance;
        payable(vaultOwner).transfer(_balance);
    }

    function remove(address _dst) external {
        require(msg.sender == Guardian, "Not guardian");
        IERC20(tokenVault).transfer(_dst, createdBalance);
    }

    receive() external payable {}
}
