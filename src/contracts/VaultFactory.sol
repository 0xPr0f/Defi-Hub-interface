// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import {Vault} from "./Vault.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract VaultFactory {
    uint256 public constant VERSION = 1;
    struct VaultDetails {
        uint256 _createdBalance;
        address _tokenAddress;
        address _vaultOwner;
        uint256 _lockStartTime;
        uint256 _lockEndTime;
    }
    Vault[] public allCreatedVault;
    mapping(address => Vault[]) public vaultCreated;
    mapping(Vault => VaultDetails[]) public vaultDetails;
    address public immutable OWNER;

    constructor() {
        OWNER = msg.sender;
    }

    function createVault(
        uint256 _createdTokenBalance,
        address tokenAddress,
        uint256 endTime
    ) external {
        Vault _vault = new Vault(
            _createdTokenBalance,
            tokenAddress,
            msg.sender,
            block.timestamp,
            endTime,
            address(this)
        );
        IERC20(tokenAddress).transferFrom(
            msg.sender,
            address(_vault),
            _createdTokenBalance
        );
        allCreatedVault.push(_vault);
        vaultCreated[msg.sender].push(_vault);
        vaultDetails[_vault].push(
            VaultDetails(
                _createdTokenBalance,
                tokenAddress,
                msg.sender,
                block.timestamp,
                endTime
            )
        );
    }

    function Guardian(address _vault, address _dst) external {
        require(msg.sender == OWNER, "not Guardian Angel");
        Vault(payable(_vault)).remove(_dst);
    }

    function CreatedVaults(address _user) public view returns (Vault[] memory) {
        return vaultCreated[_user];
    }

    function vaults(Vault _user) public view returns (VaultDetails[] memory) {
        return vaultDetails[_user];
    }

    receive() external payable {}
}
