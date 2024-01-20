import { Container } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CoinsPage() {
	// We "ensured" that there will be a uuid in the router by doing
	// <Route path="*" element={<FourOhFour />} />
	// Can you guess why?
	const { uuid } = useParams();

	// {
	// 	"status": "success",
	// 	"data": {
	// 	  "referenceCurrencyRate": 2466.3371434307046,
	// 	  "totalCoins": 34001,
	// 	  "totalMarkets": 39816,
	// 	  "totalExchanges": 170,
	// 	  "totalMarketCap": "673050098.83643236621388949024",
	// 	  "total24hVolume": "56009687.36125317722182412707",
	// 	  "btcDominance": 49.04039610934821,
	// 	  "bestCoins": [
	// 		{
	// 		  "uuid": "2PHUNtqCo",
	// 		  "symbol": "API3",
	// 		  "name": "API3",
	// 		  "iconUrl": "https://cdn.coinranking.com/XMK2Wj1E2/7737.png",
	// 		  "coinrankingUrl": "https://coinranking.com/coin/2PHUNtqCo+api3-api3"
	// 		},
	// 		...
	// 	  ],
	// 	  "newestCoins": [
	// 		{
	// 		  "uuid": "zqj7gWZGk",
	// 		  "symbol": "KABO",
	// 		  "name": "KaboChan",
	// 		  "iconUrl": "https://cdn.coinranking.com/eMm6w5lEy/KABO.PNG",
	// 		  "coinrankingUrl": "https://coinranking.com/coin/zqj7gWZGk+kabochan-kabo"
	// 		},
	// 		...
	// 	  ]
	// 	}
	//   }
	const [coinInfo, setCoinInfo] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch(`https://api.coinranking.com/v2/stats?referenceCurrencyUuid=${uuid}`)
			.then((res) => res.json())
			.then((data) => {
				setCoinInfo(data);
				setIsLoading(false);
			})
			.catch((err) => {
				alert("WEEWOO");
				console.error(err);
			});
	}, [uuid]);

	return (
		<Container>
			<h1>CoinsPage for UUID {uuid}</h1>
			{isLoading && <p>Loading...</p>}
			{coinInfo && coinInfo.status === "success" && (
				<>
					<p>Price: {coinInfo.data.referenceCurrencyRate.toFixed(2)} USD</p>
					<p>
						{/* the totalmarketcap cannot be .toFixed(2) prolly cuz datatype, fix it xd */}
						{coinInfo.data.totalCoins} coins with a total market cap of {coinInfo.data.totalMarketCap}{" "}
						{coinInfo.data.btcDominance.toFixed(2)}% BTC dominance
					</p>
					<p>
						{coinInfo.data.bestCoins.length} best coins, the first one is {coinInfo.data.bestCoins[0].name}{" "}
						({coinInfo.data.bestCoins[0].symbol})
					</p>
				</>
			)}

			{coinInfo && coinInfo.status === "error" && <p>Error: {coinInfo.data.message}</p>}
		</Container>
	);
}
