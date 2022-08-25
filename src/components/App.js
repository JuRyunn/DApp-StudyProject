import React, {Component} from 'react'
import './App.css'
import Navbar from './Navbar';
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json'

class App extends Component {

    async UNSAFE_componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockChainData()
    }


    async loadWeb3() {
        if(window.ethereum) {
            window.web3= new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if(window.web3) {
            window.web3= new Web3(window.web3.currentProvider)
        } else {
            window.alert('No ETH browser detected, you can check out Metamask')
        }    
    }

    async loadBlockChainData() {
        
        // Load MetaMask & Account Number
        const web3 = window.web3;
        const account = await web3.eth.getAccounts();
        this.setState({account: account[0]});
        console.log(account)

        // Load Network ID
        const networkId = await web3.eth.net.getId();

        // Load Tether Contract
        const tetherData = Tether.networks[networkId];
        if(tetherData) {
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
            this.setState({tether});
            let tetherBalance = await tether.methods.balanceOf(this.state.account).call();
            this.setState({tetherBalance: tetherBalance.toString()});
        } 
        else {
            window.alert('Error! Tether contract not deployed!');
        }
    }
    
    

    constructor(props) {
        super(props)
        this.state= {
            account: '0x0',
            tether: {},
            rwd: {},
            decentralBank: {},
            tetherBalance: '0',
            rwdBalance: '0',
            stackingBalance: '0',
            loading: true
        }
    }

    // React Code
    render() {
        return (
        <div>      
            <Navbar account= {this.state.account} />
                <div className='text-center'>
                    <h1></h1>
                </div>
        </div>
        )
    }
}

export default App;
