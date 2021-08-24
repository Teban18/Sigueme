
var newContract = async function(){
    sessionVerificationForActions()
    await metamaskIsAviable()
    const abi = JSON.parse('[  {   "anonymous": false,   "inputs": [    {     "indexed": false,     "internalType": "address",     "name": "",     "type": "address"    },    {     "indexed": false,     "internalType": "uint256",     "name": "",     "type": "uint256"    }   ],   "name": "Received",   "type": "event"  },  {   "stateMutability": "payable",   "type": "fallback"  },  {   "inputs": [    {     "internalType": "uint256",     "name": "_amount",     "type": "uint256"    },    {     "internalType": "address",     "name": "_address",     "type": "address"    },    {     "internalType": "bool",     "name": "_entitystatus",     "type": "bool"    },    {     "internalType": "bool",     "name": "_projectstatus",     "type": "bool"    }   ],   "name": "make_transaction",   "outputs": [],   "stateMutability": "payable",   "type": "function"  },  {   "stateMutability": "payable",   "type": "receive"  } ]')
    const bytecode = '0x608060405234801561001057600080fd5b506105d7806100206000396000f3fe6080604052600436106100225760003560e01c8063d1ce8f091461006457610029565b3661002957005b7f88a5966d370b9919b20f3e2c13ff65706f196a4e32cc2c12bf57088f88525874333460405161005a9291906103b6565b60405180910390a1005b61007e60048036038101906100799190610284565b610080565b005b60011515821515146100c7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100be906103df565b60405180910390fd5b600115158115151461010e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610105906103ff565b60405180910390fd5b60008373ffffffffffffffffffffffffffffffffffffffff16856040516024016040516020818303038152906040527ff85396d7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506040516101b8919061039f565b60006040518083038185875af1925050503d80600081146101f5576040519150601f19603f3d011682016040523d82523d6000602084013e6101fa565b606091505b505090508061023e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102359061041f565b60405180910390fd5b5050505050565b6000813590506102548161055c565b92915050565b60008135905061026981610573565b92915050565b60008135905061027e8161058a565b92915050565b6000806000806080858703121561029a57600080fd5b60006102a88782880161026f565b94505060206102b987828801610245565b93505060406102ca8782880161025a565b92505060606102db8782880161025a565b91505092959194509250565b6102f081610466565b82525050565b60006103018261043f565b61030b818561044a565b935061031b8185602086016104ae565b80840191505092915050565b6000610334600f83610455565b915061033f826104e1565b602082019050919050565b6000610357601083610455565b91506103628261050a565b602082019050919050565b600061037a600a83610455565b915061038582610533565b602082019050919050565b610399816104a4565b82525050565b60006103ab82846102f6565b915081905092915050565b60006040820190506103cb60008301856102e7565b6103d86020830184610390565b9392505050565b600060208201905081810360008301526103f881610327565b9050919050565b600060208201905081810360008301526104188161034a565b9050919050565b600060208201905081810360008301526104388161036d565b9050919050565b600081519050919050565b600081905092915050565b600082825260208201905092915050565b600061047182610484565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b838110156104cc5780820151818401526020810190506104b1565b838111156104db576000848401525b50505050565b7f696e61637469766520656e746974790000000000000000000000000000000000600082015250565b7f696e6163746976652070726f6a65637400000000000000000000000000000000600082015250565b7f6e6f7420666f756e647300000000000000000000000000000000000000000000600082015250565b61056581610466565b811461057057600080fd5b50565b61057c81610478565b811461058757600080fd5b50565b610593816104a4565b811461059e57600080fd5b5056fea264697066735822122018cd5b971675fbe65d1beaf5aa38c54970bd6f8a7b8ceffd5f8eb698a9d8271a64736f6c63430008040033'
    var amount = $("#amount").val()
    var address = $("#p_address").val()
    if ((amount && address) === ""){
        Materialize.toast('Faltan datos', 2000, 'red')
    }else{
        var currentaccount = await getCurrentAccount()
        Materialize.toast('Cuenta metamask con la que vas a transferir : '+ currentaccount, 5000, 'blue')
        window.ethereum = new Web3(window.ethereum)
        contract = await new window.ethereum.eth.Contract(abi)
            .deploy({ 
                data: bytecode
            })
            .send({ 
                from: currentaccount, 
                gasPrice: 65164000,
                gas: 441645
            })
            .then((instance) => {
                Materialize.toast("Contrato minado con dirección de bloque :" + instance.options.address, 3000, 'green')
                Tx(amount,address, currentaccount, instance)   
            });;
    }
}