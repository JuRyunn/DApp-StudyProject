pragma solidity ^0.5.0;

contract RWD {
    string public name= 'Reward Token';
    string public symbol= 'RWD';
    uint256 public totalSupply= 1000000000000000000;
    uint8 public decimals= 18;

    event Transfer (
        address _from, 
        address _to,
        uint _value
    );

    event Approval (
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance; // 주소를 확인 후 매핑.

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value; // 메시지 발신자 잔액에서 전송하는 토큰 값 뺌.
        balanceOf[_to] += _value; // 전송하는 값 더함.
        emit Transfer(msg.sender, _to, _value); 
        return true;
    }

    function approve(address _spender, uint _value) public returns (bool success) {
        allowance[msg.sender][_spender]= _value;
        emit Approval(msg.sender, _spender, _value); // 발신자 주소와 같아야함.
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        
        // 값이 발신자 잔액 이하가 되도록 조건 설정.
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        
        balanceOf[_to] += _value; // transferFrom 실행, 현재 잔액에 전송받을 값을 더한 수량.
        balanceOf[_from] -= _value; // transferFrom 실행, 현재 잔액에 전송받을 값을 뺀 수량.
        
        // 발신자가 허용한 호출자의 allowance를 수량에서 제외한다.
        allowance[msg.sender][_from] -= _value; // 주소로 메시지 발신자 확인, 값에서 뺀 수량.
        emit Transfer(_from, _to, _value);
        return true;
    }
}