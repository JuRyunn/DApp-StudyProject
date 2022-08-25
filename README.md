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

#### Account Number 불러오기
```JS
    async loadBlockChainData() {
        const web3= window.web3
        const account= await web3.eth.getAccounts()
        this.setState({account: account[0]})
        console.log(account)
    }
```
