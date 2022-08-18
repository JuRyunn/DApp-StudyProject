pragma solidity ^0.5.0;

import './RWD.sol';
import './Tether.sol';

contract DecentralBank {
    string public name = 'Decentral Bank';
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address=> uint) public stakingBalance;
    mapping(address=> bool) public hasStaked;
    mapping(address=> bool) public isStaking;

constructor(RWD _rwd,Tether _tether) public {
    rwd = _rwd;
    tether = _tether;
    owner= msg.sender;
}

// 스테이킹 함수
function depositTokens(uint _amount) public {

    // staking amount가 0보다 커야한다.
    require(_amount > 0, 'amount cannot be 0');

    // Transfer tether Token to this contract address for staking
    tether.transferFrom(msg.sender, address(this), _amount); // amount: 스테이킹 금액 

    // 스테이킹 금액 업데이트
    stakingBalance[msg.sender]= stakingBalance[msg.sender] + _amount;

    // != false !hasStaked= 스테이킹 해본적이 없을 경우
    if(!hasStaked[msg.sender]) {
        stakers.push(msg.sender);
    }

    // 스테이킹 밸런스 업데이트
    isStaking[msg.sender]= true;
    hasStaked[msg.sender]= true;

}

    function unstakeTokens() public {
        uint balance= stakingBalance[msg.sender];
        require(balance>0, 'staking balance cannot be less than zero');
    
        tether.transfer(msg.sender, balance);

        // staking balance reset
        stakingBalance[msg.sender]= 0;

        // update staking balnce staus
        isStaking[msg.sender]= false;

    }

    //issue rewards
    function issueTokens() public {
        
        require(msg.sender==owner, 'caller must be the owner');
        for(uint i= 0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance= stakingBalance[recipient] / 9;
            
            if(balance > 0) {
            rwd.transfer(recipient, balance);
            }
        }
    }
} 