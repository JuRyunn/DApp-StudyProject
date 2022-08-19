const RWD = artifacts.require('RWD')
const Tether = artifacts.require('Tether')
const DecentralBank = artifacts.require('DecentralBank')

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank', ([owner, customer]) => {
    let tether, rwd, decentralBank

    // from ether to Wei
    function tokens (number) {
        return web3.utils.toWei(number, 'ether')
    }
 
    before(async () =>{
        // 계약을 가져오는 곳
        tether = await Tether.new()
        rwd = await RWD.new()
        decentralBank = await DecentralBank.new(rwd.address, tether.address)
        
        // from reward token to Decentral Bank (1 million)
        await rwd.transfer(decentralBank.address, tokens('1000000'))

        // Transfer 100 tethers to customer
        await tether.transfer(customer, tokens('100'), {from: owner})
    })

    // 테스팅할 코드가 적힐 부분
    describe('JuRyunn Tether deployment', async () => {
        it('matches name successfully', async () => {
            const name = await tether.name()
            assert.equal(name, 'Taek Tether Token') 
        })
    })

    describe('Reward Token deployment', async () => {
        it('matches name successfully', async () => {
            const name = await rwd.name()
            assert.equal(name, 'Reward Token')
        })
    })
    
    describe('Decentral Bank deployment', async () => {
        it('matches name successfully', async () => {
            const name = await decentralBank.name()
            assert.equal(name, 'Decentral Bank')
        })

        it('contract has tokens', async () => {
            let balance = await rwd.balanceOf(decentralBank.address)
            assert.equal(balance, tokens('1000000'))
        })
    })
    describe('Yield Farming', async () => {
        it('rewards tokens for staking', async () => {
            let result

            // Check customer Balance
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'), 'customer juryunn wallet balance before staking')
        

            // Check staking for customer of 100 tokens
            await tether.approve(decentralBank.address, tokens('100'), {from: customer})
            await decentralBank.depositTokens(tokens('100'), {from: customer})
            
            // Check Updated Balance of Customer
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('0'), 'customer juryunn wallet balance after staking 100 tokens')
        
            // Check Updated Balance of Decentral Bank
            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result.toString(), tokens('100'), 'decentral bank wallet balance after staking')
            
            // Is Staking Update
            result = await decentralBank.isStaking(customer)
            assert.equal(result.toString(), 'true', 'customer is staking status after staking')

            // Issue Tokens
            await decentralBank.issueTokens({from: owner})

            // Ensure Only the owner issue tokens
            await decentralBank.issueTokens({from: customer}).should.be.rejected;

            // Unstake tokens
            await decentralBank.unstakeTokens({from: customer})

            // Check unstake balance
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'), 'customer juryunn wallet balance after unstaking')
        
            // Check Updated Balance of Decentral Bank
            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result.toString(), tokens('0'), 'decentral bank wallet balance after unstaking')
            
            // Is Staking Update
            result = await decentralBank.isStaking(customer)
            assert.equal(result.toString(), 'false', 'customer is no longer staking after unstaking')
        })
    })   
})
