// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";

//deploy on binance
contract GLDTokenTest1B is ERC20 {
    constructor() ERC20("GoldTest1", "GLTV1", 18) {}

    function mint(address _addr, uint256 _amount) external {
        _mint(_addr, _amount);
    }

    function burn(uint256 _amount) external {
        _burn(msg.sender, _amount);
    }
}

// deploy on binance

contract GLDTokenTest2B is ERC20 {
    constructor() ERC20("GoldTest2", "GLTV2", 18) {
        _mint(
            0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,
            80000000000000000000000000000000
        );
    }

    function mint(address _addr, uint256 _amount) external {
        _mint(_addr, _amount);
    }

    function burn(uint256 _amount) external {
        _burn(msg.sender, _amount);
    }
}

//deploy on polygon
contract GLDTokenTest1P is ERC20 {
    address public BRIDGERECIEVER = 0x576F1D7BedaF84531e49e6F13563bF8f41e81e68;
    address public HD;

    constructor() ERC20("GoldTest1", "GLTV1", 18) {
        HD = msg.sender;
    }

    function mint(address _addr, uint256 _amount) external {
        require(msg.sender == BRIDGERECIEVER, "not allowed");
        _mint(_addr, _amount);
    }

    function change(address _new) external {
        require(msg.sender == HD, "not allowed");
        BRIDGERECIEVER = _new;
    }

    function burn(uint256 _amount) external {
        _burn(msg.sender, _amount);
    }
}

// deploy on polygon
contract GLDTokenTest2P is ERC20 {
    address public BRIDGERECIEVER = 0x576F1D7BedaF84531e49e6F13563bF8f41e81e68;
    address public HD;

    constructor() ERC20("GoldTest2", "GLTV2", 18) {
        HD = msg.sender;
    }

    function mint(address _addr, uint256 _amount) external {
        require(msg.sender == BRIDGERECIEVER, "not allowed");
        _mint(_addr, _amount);
    }

    function change(address _new) external {
        require(msg.sender == HD, "not allowed");
        BRIDGERECIEVER = _new;
    }

    function burn(uint256 _amount) external {
        _burn(msg.sender, _amount);
    }
}
