# DApp-StudyProject

#### :memo: [프로젝트 개발 환경 구축](https://github.com/JuRyunn/DApp-StudyProject/blob/main/ProjectEnvironment.md)


<br>

#### Decentral Bank 실행하기
```cmd
npm run start
```

<br>

#### Metamask 인식 코드
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
