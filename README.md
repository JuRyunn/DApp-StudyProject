# DApp-StudyProject

#### :memo: [프로젝트 개발 환경 구축](https://github.com/JuRyunn/DApp-StudyProject/blob/main/ProjectEnvironment.md)


<br>

#### Decentral Bank 실행하기
```cmd
npm run start
```

<br>

#### ETH, Metamask 연결
```JS
    async componentWillMount() {
        await this.loadWeb3()
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
```

#### 계정정보, 네트워크 ID, 계약 불러오기
```JS
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
```
