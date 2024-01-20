import { Container, Heading, Box, Flex, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CoinsPage() {
	// We "ensured" that there will be a uuid in the router by doing
	// <Route path="*" element={<FourOhFour />} />
	// Can you guess why?
	const { uuid } = useParams();
	const getCommonClasses = () =>
		"outline outline-gray-500/65 p-4 rounded mt-5 text-center max-w-96 min-w-96 flex flex-col";

	const InfoCard = ({ title, value, size, color, mb }) => (
		<div className={getCommonClasses()}>
			<Text as="span" size="5" mb="1">
				{title}
			</Text>
			<Text as="span" size={size} color={color} mb={mb}>
				{value}
			</Text>
		</div>
	);
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
			<Heading color="indigo" align="center" size={6} className="mb-4">
				Coin Page
			</Heading>
			<Heading color="indigo" align="center">
				UUID : {uuid}{" "}
			</Heading>
			{isLoading && (
				<div className="flex justify-center items-center h-full">
					<Text color="green" size="4">Loading...</Text>
				</div>
			)}
			{coinInfo && coinInfo.status === "success" && (
				<div className="flex flex-col items-center">
					<InfoCard
						title="Price💲"
						value={`${coinInfo.data.referenceCurrencyRate.toFixed(2)} USD`}
						size="7"
						color="green"
					/>
					<InfoCard title="Coins 🪙" value={coinInfo.data.totalCoins} size="7" color="yellow" />
					<InfoCard
						title="Total Market Cap 📈"
						value={coinInfo.data.totalMarketCap}
						size="6"
						color="red"
						mb="3"
					/>
					<InfoCard
						title="BTC dominance 🚀"
						value={`${coinInfo.data.btcDominance.toFixed(2)}%`}
						size="7"
						color="green"
					/>
					<InfoCard
						title={`Best Coin : ${coinInfo.data.bestCoins.length}`}
						value={`1st ${coinInfo.data.bestCoins[0].name} : (${coinInfo.data.bestCoins[0].symbol})`}
						size="7"
						color="orange"
						mb="1"
					/>
				</div>
			)}

			{coinInfo && coinInfo.status === "error" && <p>Error: {coinInfo.data.message}</p>}
		</Container>
	);
}
