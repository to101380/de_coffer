
		if (typeof web3 !== 'undefined') {
		  web3 = new Web3(web3.currentProvider);
		} else {
		  // Set the provider you want from Web3.providers
		  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		}

		var myContract;
		var coinbase;

		async function printPostsToConsole() {

			//取得帳號
			coinbase = await web3.eth.getCoinbase();

			//取得帳號餘額
			var balance = await web3.eth.getBalance(coinbase);
			$("#my_address").text(coinbase);
			$("#my_balance").text(web3.utils.fromWei(balance));  //wei 轉換成 ether web3.utils.fromWei()

			var contract_address = "0x156755631508be6eb451aedf19eabbf1bc6cb8b1";
			var contract_abi = [ { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "investorTokens", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "investors", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "distribute", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "invest", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ];

			myContract = new web3.eth.Contract(contract_abi, contract_address);

			//取得合約餘額
			var balance_contract = await web3.eth.getBalance(contract_address);
			$("#total_balance").text(balance_contract);


			var contract_investors = await myContract.methods.investors(0).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});
			$("#join_address").text(contract_investors);
			//取得購買人數


			//取得購買地址


		};

		printPostsToConsole();


		function invest(){
			myContract.methods.invest().send({from: coinbase, value: "100000000000000000"}).then(function(receipt){
			    alert();
				location.reload();
			});
		}

			//購買



