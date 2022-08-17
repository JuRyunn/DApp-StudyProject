const RWD = artifacts.require('RWD')
const Tether = artifacts.require('Tether')
const DecentralBank = artifacts.require('DecentralBank')

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank', (accounts) => {
    
    let tether, rwd, decentralBank

    function tokens (number) {
        return web3.utils.toWei(number, 'ether')
    }

    before(async () => {
        tether= await Tether.new()
        rwd= await RWD.new()
        decentralBank= await DecentralBank.new(rwd.address, tether.address)
    
        await rwd.transfer(DecentralBank.address, tokens('1000000'))

        // 고객에게 100 Moch Tkoen 전송하기
        await tether.transfer(accounts[1], tokens('100'), {from: accounts[0]})
    })

    describe('Mock Tether Deployment', async () => {
        it('matches name successfully', async () => {
            const name= await tether.name()
            assert.equal(name, 'Mock Tether Token')
        })
    })

    describe('Reward Token', async () => {
        it('matches name successfully', async () => {
            const name= await reward.name()
            assert.equal(name, 'Reward Token')
        })
    })
})