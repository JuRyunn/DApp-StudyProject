const RWD = artifacts.require('RWD')
const Tether = artifacts.require('Tether')
const DecentralBank = artifacts.require('DecentralBank')


require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank', ([owner, customer]) => {
    let tether, rwd, decentralBank

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

    describe('Decentral Bank Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await decentralBank.name()
            assert.equal(name, 'Decentral Bank')
        })

        it('contract has tokens', async() => {
            let balance= await rwd.balanceOf(decentralBank.address)
            assert.equal(balance, tokens('1000000'))
        })

        describe('Yield Farming', async () => {
            it('rewards tokens for staking', async () => {
                let result

                // Investor Balance 확인
                result= await tether.balanceOf(customer)
                assert.equal(result.toString(), tokens('100'), 'customer juryunn wallet balance before staking')
    
                // Customer Staking 확인
                await tether.approve(decentralBank.address, tokens('100'), {from:  customer})
                await decentralBank.depositTokens(tokens('100'), {from: customer})
            
                // Customer Updated Balance 확인
                result= await tether.balanceOf(customer)
                assert.equal(result.toString(), tokens('0'), 'customer juryunn wallet balance after staking 100 tokens')
            
                
                // DecentralBank Updated Balance 확인
                result= await tether.balanceOf(decentralBank.address)
                assert.equal(result.toString(), tokens('100'), 'decentralBank juryunn wallet balance after staking from customer')

            })
        })
    })
})