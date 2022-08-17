pragma solidity ^0.5.0;

contract RWD {
    string public name = 'Reward Token';
    string public symbol = 'RWD';
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8 public decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value
    );

    event Approvel(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    // 토큰 전송 함수
    function transfer(address _to, uint256 _value) public returns (bool success) {
        // 잔액이 보내고자 하는 value 보다 크거나 같아야 함.
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approvel(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {    
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_to] += _value;
        balanceOf[_from] -= _value;
        allowance[msg.sender][_from] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}