    
		//AOS animate
		 AOS.init(); 



		// get ETH info	

		$(document).ready(function(){
		    $.ajax({
		        method:"GET",
		        url: "https://api.coinlore.net/api/ticker/?id=80",        
		      }).done(function(msg) {   
		        console.log(msg);
		        var ETH_price = (msg[0].price_usd);	

		      });
		})



   


		function toPercent(point){
		    var str=Number(point*100).toFixed(2);
		    str+="%";
		    return str;
		}

		function toPoint(point){
		    var str=Number(point).toFixed(2);          
		    return str;
		}

		function toPoint_F(point){
		    var str=Number(point).toFixed(4);          
		    return str;
		}

		function toPoint_S(point){
		    var str=Number(point).toFixed(7);          
		    return str;
		}



		if (typeof web3 !== 'undefined') {
		  web3 = new Web3(window.ethereum);

		} else {
		  // Set the provider you want from Web3.providers
		  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		}



		var coinbase;
		var de_coffer_address;

		var CT_price;
		
		
		//smart_contract
		var de_coffer;		
		var CT;	

		//FEE			
		var get_fee;
		var WBC_fee;
		var commision_fee;
		var unlock_fee
		

		async function printPostsToConsole() {

			//取得帳號
			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  			coinbase = accounts[0];  			
			  
			$("#check_address").text(coinbase);
			$("#ov_check_address").text(coinbase);

			var hidden_str = (coinbase.substring(6,38));
      		var replace_part = coinbase.replace(hidden_str,"...");            
      		$("#my_address").text(replace_part);

      		if(coinbase != 'undefined'){
      			$(".my_address").css("visibility","visible");
      		}      		
      		

			//取得帳號餘額
			var balance = await web3.eth.getBalance(coinbase);		
			$("#my_balance").text(web3.utils.fromWei(balance));  //wei 轉換成 ether web3.utils.fromWei()
			$("#ov_my_balance").text(web3.utils.fromWei(balance));

			de_coffer_address = "0x566004F628310a94Ec45604b054D7aA45e2d56c1";
			var de_coffer_abi = [ { "constant": false, "inputs": [ { "name": "_contract", "type": "address" } ], "name": "authorize", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "eth", "type": "uint256" }, { "name": "Interest", "type": "uint256" } ], "name": "commission_trans_coffer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "Interest", "type": "uint256" }, { "name": "recommender", "type": "address" } ], "name": "create_coffer", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "coffer", "type": "address" }, { "name": "coffer_WBC_balance", "type": "uint256" }, { "name": "_payable", "type": "uint256" }, { "name": "eth_amount", "type": "uint256" }, { "name": "user", "type": "address" }, { "name": "CT_amount", "type": "uint256" } ], "name": "CT_swap_ETH", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "input_ETH", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_contract", "type": "address" } ], "name": "no_authorize", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "Interest", "type": "uint256" } ], "name": "overweight", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "Interest", "type": "uint256" }, { "name": "user", "type": "address" } ], "name": "owner_create_coffer", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_fee", "type": "uint256" } ], "name": "set_commission_02_fee", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_fee", "type": "uint256" } ], "name": "set_commission_fee", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_fee", "type": "uint256" } ], "name": "set_distribute_fee", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_fee", "type": "uint256" } ], "name": "set_fee", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_fee", "type": "uint256" } ], "name": "set_unlock_fee", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_fee", "type": "uint256" } ], "name": "set_WBC_fee", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_fee", "type": "uint256" } ], "name": "set_withdraw_commision", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "Interest", "type": "uint256" } ], "name": "swap_WBC", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "tranfer_safe", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "eth_amount", "type": "uint256" }, { "name": "CT_amount", "type": "uint256" } ], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "amount", "type": "uint256" } ], "name": "Withdraw_Commision", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "_fee", "type": "uint256" }, { "name": "_WBC_fee", "type": "uint256" }, { "name": "_Unlock_fee", "type": "uint256" }, { "name": "_commission", "type": "uint256" }, { "name": "_commission_02", "type": "uint256" }, { "name": "origin", "type": "address" }, { "name": "_withdraw_commision", "type": "uint256" }, { "name": "_distribute_fee", "type": "uint256" } ], "payable": true, "stateMutability": "payable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "user", "type": "address" }, { "indexed": false, "name": "coffer_number", "type": "address" }, { "indexed": false, "name": "coffer_value", "type": "uint256" } ], "name": "mycoffer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "user", "type": "address" }, { "indexed": false, "name": "coffer_number", "type": "address" }, { "indexed": false, "name": "coffer_value", "type": "uint256" } ], "name": "trans_coffer", "type": "event" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "authorization", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "coffer_number", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "coffer_value", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "coffer_vol", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "get_commission_02_fee", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "get_commission_fee", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "get_distribute_fee", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "get_fee", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "get_unlock_fee", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "get_WBC_fee", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "get_withdraw_commision", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "if_have", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "MY_recommender", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "now_balance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "payable_WBC", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "name": "recommended_number", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ];
			var CT_address ="0xDb1e51Aa841312E90f21c687f77823857fE77abC";
			var CT_abi =[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Shares_outstanding","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}]; 
			de_coffer = new web3.eth.Contract(de_coffer_abi, de_coffer_address);		
			CT = new web3.eth.Contract(CT_abi, CT_address);			

			

			// fee
			get_fee = await de_coffer.methods.get_fee().call({});
			WBC_fee = await de_coffer.methods.get_WBC_fee().call({});
			unlock_fee = await de_coffer.methods.get_unlock_fee().call({});
			commision_fee = await de_coffer.methods.get_commission_fee().call({});
			var commision_fee_02 = await de_coffer.methods.get_commission_02_fee().call({});
			var Withdraw_Commision = await de_coffer.methods.get_withdraw_commision().call({});
			var distribute_fee = await de_coffer.methods.get_distribute_fee().call({});
			

			//my_coffer_info
			var coffer_number = await de_coffer.methods.coffer_number(coinbase).call({});
			var coffer_value = await de_coffer.methods.coffer_value(coinbase).call({});				
			var now_balance = await de_coffer.methods.now_balance().call({});
			var CT_balance = await CT.methods.balanceOf(coinbase).call({});

				var CT_owner= await CT.methods.owner().call({});
				var CT_owner_balance = await CT.methods.balanceOf(CT_owner).call({});
				var CT_total_supply = await CT.methods.totalSupply().call({});
				var out_share = CT_total_supply - CT_owner_balance;
				CT_price = now_balance/out_share; // 一枚CT的價格(ETH);	
				var CTETH = out_share/now_balance;	// 一枚ETH的買到CT的枚數(CT);		
				var my_CT_price = CT_balance*CT_price;	
				var hold_rate = CT_balance/out_share;	

			var if_have =await de_coffer.methods.if_have(coinbase).call({});

			if(if_have == true){
				$("#if_have").text("已上鎖");
				$("#OVCO").css("display","block");
				$("#main_body").css("display","block");

			}else{				
				$("#SVCO").css("display","block");	
			}	

			var hidden_str = (coffer_number.substring(6,38));
      		var replace_part = coffer_number.replace(hidden_str,"..."); 
      		var str = coffer_number;  
	    	var result = replace_part.link("https://rinkeby.etherscan.io/address/"+str);
	   		document.getElementById("coffer_number_link").innerHTML = result;   
      		       
      				
			$("#coffer_value").text(toPoint_F(web3.utils.fromWei(coffer_value)));
			$("#can_be_withdrawn").text(toPoint_F(my_CT_price/(1*10**18)));
			$("#comfirm_can_be_withdraw").text(my_CT_price/(1*10**18));
			$("#hold_rate").text(toPercent(hold_rate));
			$("#out_share").text(toPoint_F(out_share/(1*10**18)));			
			$("#ETHCT").text(toPoint_F(CT_price));
			$("#CTETH").text(toPoint_F(CTETH));		

			//CT

			var CT_allowed = await CT.methods.allowed(coinbase,de_coffer_address).call({});
			if(CT_allowed > 0){
				$("#approve_CT").css("display","none");
				$("#comfirm_withdraw").css("display","block");
				$("#disabled_comfirm_withdraw").css("display","none");
			}

					
		};

		printPostsToConsole();


		function create_coffer(Interest,recommender,volume){
			de_coffer.methods.create_coffer(Interest,recommender).send({from: coinbase, value: volume}).then(function(receipt){			    
				location.reload();

			});
		}

		function overweight(Interest,volume){
			de_coffer.methods.overweight(Interest).send({from: coinbase, value: volume}).then(function(receipt){			   
				location.reload();
			});
		}

		function  commission_trans_coffer(volume,Interest){
			de_coffer.methods.commission_trans_coffer(volume,Interest).send({from: coinbase}).then(function(receipt){			  
				location.reload();			
			});
		}


		function  withdraw_commision(volume){			
			de_coffer.methods.Withdraw_Commision(volume).send({from: coinbase}).then(function(receipt){			  
				location.reload();			
			});
		}



		function  withdraw(volume,CT_pay){			
			de_coffer.methods.withdraw(volume,CT_pay).send({from: coinbase}).then(function(receipt){			  
				location.reload();			
			});
		}
	



		function  approve_CT(){
			var volume = "0x33B2E3C9FD0803CE8000000";
			CT.methods.approve(de_coffer_address,volume).send({from: coinbase}).then(function(receipt){			  
				location.reload();			
			});
		}














		//create_coffer 
	  	$(document).ready(function(){
	  		$.ajax({
		        method:"GET",
		        url: "https://api.coinlore.net/api/ticker/?id=80",        
		      }).done(function(msg) {  
		        var ETH_price = (msg[0].price_usd);

		        $('#ticket').on('keyup','.quantity',function(){          
				    var quantity = $(this).val();
				    $("#give_commision").text(quantity*commision_fee/1000);

				    var WBC_volume = ETH_price*quantity;
				    $("#WBC_GET").text(toPoint(WBC_volume-WBC_volume*WBC_fee/1000)); 
				    $("#_payable_WBC").text(toPoint((WBC_volume-WBC_volume*WBC_fee/1000)+(WBC_volume-WBC_volume*WBC_fee/1000)*(unlock_fee/1000)+0.1));
				    $("#real_save").text(toPoint_F(quantity-quantity*get_fee/1000));          
				}) 


				$('#ticket').on('keyup','.recommender',function(){          
		        	var recommender = $(this).val();
		        	$("#input_recommender").text(recommender);
		        	console.log(recommender);

		        })
		       


		        var comfirm =  document.querySelector('#comfirm_save');
			      	comfirm.addEventListener("click",function(e){
			        e.preventDefault();
			        var count = document.querySelector('.quantity').value;
			        var volume = (Number(count) * 1*10**18).toString(16);
			        var recommender = document.querySelector('.recommender').value;

			        if( recommender == null || recommender == undefined || recommender == ''){
			        	var default_recommender = "0x45aa3752E6ae9D4c1C4C45b9e4516e1bf3aC7Ad0";
			        	create_coffer(ETH_price*100,default_recommender,"0x"+volume); 
			        				        	
			        }else{
			        	create_coffer(ETH_price*100,recommender,"0x"+volume); 		
			        	
			        }			        
			       
			         			        	             
			        
			    })		        

		      });


	      })






	  	//overweight_coffer
	  	$(document).ready(function(){
	  		$.ajax({
		        method:"GET",
		        url: "https://api.coinlore.net/api/ticker/?id=80",        
		      }).done(function(msg) {  
		        var ETH_price = (msg[0].price_usd);

		        $('#input_ticket').on('keyup','.ov_quantity',function(){          
				    var quantity = $(this).val();
				    $("#ov_give_commision").text(quantity*commision_fee/1000);

				    var WBC_volume = ETH_price*quantity;
				    $("#ov_WBC_GET").text(toPoint(WBC_volume-WBC_volume*WBC_fee/1000)); 
				    $("#ov_payable_WBC").text(toPoint((WBC_volume-WBC_volume*WBC_fee/1000)+(WBC_volume-WBC_volume*WBC_fee/1000)*(unlock_fee/1000)+0.1));
				    $("#ov_real_save").text(toPoint_F(quantity-quantity*get_fee/1000));          
				}) 



		        var comfirm_overweight =  document.querySelector('#comfirm_overweight');
			      	comfirm_overweight.addEventListener("click",function(e){
			        e.preventDefault();
			        var count = document.querySelector('.ov_quantity').value;
			        var volume = (Number(count) * 1*10**18).toString(16);       			        
			        overweight(ETH_price*100,"0x"+volume);  			        	             
			        
			    })		        

		      });


	      })



	  	//withdraw_commissioin
	  	$(document).ready(function(){
	  		$.ajax({
		        method:"GET",
		        url: "https://api.coinlore.net/api/ticker/?id=80",        
		      }).done(function(msg) {  
		        var ETH_price = (msg[0].price_usd);

		        $('#key_withdraw_commision').on('keyup','._withdraw_commision',function(){          
				    var quantity = $(this).val();
				    $("#keyup_withdraw_commision").text(quantity);	

				}) 



		        var comfirm_withdraw_commision =  document.querySelector('#comfirm_withdraw_commision');
			      	comfirm_withdraw_commision.addEventListener("click",function(e){
			        e.preventDefault();
			        var count = document.querySelector('._withdraw_commision').value;
			        var volume = (Number(count)*10**18).toString(16);       			        
			        withdraw_commision("0x"+volume);  			        	             
			        
			    })		        

		      });


	      })



	  	//withdraw
	  	$(document).ready(function(){
	  		$.ajax({
		        method:"GET",
		        url: "https://api.coinlore.net/api/ticker/?id=80",        
		      }).done(function(msg) {  
		        var ETH_price = (msg[0].price_usd);

		        $('#withdraw_eth').on('keyup','._withdraw',function(){          
				    var quantity = $(this).val();
				    $("#keyup_withdraw").text(quantity);				    
				    var CT_pay = quantity/CT_price;
				    console.log(CT_pay);
				   
				}) 



		        var comfirm_withdraw =  document.querySelector('#comfirm_withdraw');
			      	comfirm_withdraw.addEventListener("click",function(e){
			        e.preventDefault();
			        var count = document.querySelector('._withdraw').value;
			        var volume = (Number(count)*10**18).toString(16); 
			        var CT_pay = ((count*10**18)/CT_price).toString(16);      			        
			        withdraw("0x"+volume,"0x"+CT_pay); 				        		        	             
			        
			    })		        

		      });



	      })



	  	//commission_trans_CT
	  	$(document).ready(function(){
	  		$.ajax({
		        method:"GET",
		        url: "https://api.coinlore.net/api/ticker/?id=80",        
		      }).done(function(msg) {  
		        var ETH_price = (msg[0].price_usd);

		        $('#_trans_CT').on('keyup','.trans_CT',function(){          
				    var quantity = $(this).val();
				    $("#RTtrans_give_commision").text(quantity*commision_fee/1000);

				    var WBC_volume = ETH_price*quantity;
				    $("#RTtrans_WBC_GET").text(toPoint(WBC_volume-WBC_volume*WBC_fee/1000)); 
				    $("#RTtrans_payable_WBC").text(toPoint((WBC_volume-WBC_volume*WBC_fee/1000)+(WBC_volume-WBC_volume*WBC_fee/1000)*(unlock_fee/1000)+0.1));
				    $("#RTtrans_real_save").text(toPoint_F(quantity-quantity*get_fee/1000));
				           
				}) 



		        var comfirm_trans_CT =  document.querySelector('#comfirm_trans_CT');
			      	comfirm_trans_CT.addEventListener("click",function(e){
			        e.preventDefault();
			        var count = document.querySelector('.trans_CT').value;
			        var volume = (Number(count) * 1*10**18).toString(16);       			        
			        commission_trans_coffer("0x"+volume,ETH_price*100);  			        	             
			        
			    })		        

		      });


	      })


	  










