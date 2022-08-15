pragma solidity ^0.5.0;

contract Tether {
    string public name= 'Tether';
    string public symbol= 'USDT';
    uint256 public totalSupply= 1000000000000000000;
    uint8 public decimals= 18;

    event Transfer (
        address _from,
        address _to,
        uint _value
    );

    event Approve (
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    mapping(address => uint256) public balanceOf;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        // add the balance
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}