import React, {Component} from 'react'
import './App.css'
import Navbar from './Navbar';
import Web3 from 'web3';

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
        const web3= window.web3
        const account= await web3.eth.getAccounts()
        console.log(account)
    }
    

    constructor(props) {
        super(props)
        this.state= {
            account: '0x0'
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
