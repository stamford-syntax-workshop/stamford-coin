import { Card, Container, Flex, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CoinsPage() {
	// We "ensured" that there will be a uuid in the router by doing
	// <Route path="*" element={<FourOhFour />} />
	// Can you guess why?
	const { uuid } = useParams();

	// {"status":"success","data":{"coin":{"uuid":"Qwsogvtv82FCd","symbol":"BTC","name":"Bitcoin","description":"Bitcoin is a digital currency with a finite supply, allowing users to send/receive money without a central bank/government, often nicknamed \"Digital Gold\".","color":"#f7931A","iconUrl":"https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg","websiteUrl":"https://bitcoin.org","links":[{"name":"bitcoin.org","type":"website","url":"https://bitcoin.org"},{"name":"bitcoinmagazine.com","url":"https://bitcoinmagazine.com/","type":"website"},{"name":"bitcointalk.org","url":"https://bitcointalk.org/","type":"bitcointalk"},{"name":"blockchain.com","url":"https://www.blockchain.com/explorer","type":"explorer"},{"name":"bitcoin/bitcoin","url":"https://github.com/bitcoin/bitcoin","type":"github"},{"name":"r/bitcoin","url":"https://www.reddit.com/r/bitcoin/","type":"reddit"},{"name":"Bitcoin_Magazine","url":"https://t.me/Bitcoin_Magazine","type":"telegram"},{"name":"bitcoin","url":"https://t.me/bitcoin","type":"telegram"},{"name":"Bitcoin Whitepaper","url":"https://bitcoin.org/bitcoin.pdf","type":"whitepaper"}],"supply":{"confirmed":true,"supplyAt":1706020922,"max":"21000000","total":"19606281","circulating":"19606281"},"numberOfMarkets":3359,"numberOfExchanges":121,"24hVolume":"50821012130","marketCap":"758331574890","fullyDilutedMarketCap":"812237826882","price":"38677.99175629224","btcPrice":"1","priceAt":1706020860,"change":"-5.02","rank":1,"sparkline":["40734.14414520886","40554.429970853256","40568.95440186628","40655.1906825995","40576.355903475276","39983.20067504287","40111.98272470739","40041.047484049115","39866.50518195774","39698.95676657087","39735.13277738244","39822.19937036832","39961.928106214764","40059.09789284699","40124.471650637","40110.93300583304","40071.963934750645","39892.393530506684","39646.07909701351","39208.78565172217","39029.16593519608","38882.22054844276","38903.4840110668",null],"allTimeHigh":{"price":"68763.41083248306","timestamp":1636502400},"coinrankingUrl":"https://coinranking.com/coin/Qwsogvtv82FCd+bitcoin-btc","tier":1,"lowVolume":false,"listedAt":1330214400,"hasContent":true,"notices":null,"tags":["layer-1","proof-of-work"]}}}

	const [coinInfo, setCoinInfo] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch(`https://api.coinranking.com/v2/coin/${uuid}`)
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
				<Card>
					<Flex direction="column">
						<div className="flex flex-row items-center gap-x-2">
							<img className="size-8" src={coinInfo.data.coin.iconUrl} alt="Coin Icon" />
							<Text className="text-4xl font-bold">
								{coinInfo.data.coin.name} ({coinInfo.data.coin.symbol})
							</Text>
						</div>
						<Text>{coinInfo.data.coin.description}</Text>
						<Text>Price: {Number(coinInfo.data.coin.price).toFixed(2)} USD</Text>
						<Text>Market Cap: {coinInfo.data.coin.marketCap ?? "N/A"}</Text>
					</Flex>
				</Card>
			)}

			{coinInfo && coinInfo.status === "error" && <p>Error: {coinInfo.data.message}</p>}
		</Container>
	);
}
