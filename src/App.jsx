import { useEffect, useState } from "react";

import { Button, Card, Container, Flex, Heading, Strong, Text, TextField } from "@radix-ui/themes";
import { IconSearch } from "@tabler/icons-react";

import { Link } from "react-router-dom";

function App() {
	const [top10CoinInfo, setTop10CoinInfo] = useState();
	const [btcInfo, setBtcInfo] = useState(null);

	const { status, data } = btcInfo ? btcInfo : { status: "init", data: null };

	useEffect(() => {
		fetch("https://api.coinranking.com/v2/coins?limit=10", {
			headers: {
				"x-access-token": "coinrankingd92e81e850707d5a4e21a45825ff2aabf6e45cf6617a7d57",
			},
		})
			.then((res) => res.json())
			.then((data) => setTop10CoinInfo(data))
			.catch((err) => console.log(err));
	}, []);

	// BTC UUID Qwsogvtv82FCd
	console.log(btcInfo);

	return (
		<Container>
			<Flex direction="column" gap="4">
				<form
					onSubmit={(e) => {
						e.preventDefault();

						const formData = new FormData(e.target);
						const cryptoName = formData.get("crypto_name_field");

						if (!cryptoName) throw new Error("No crypto name provided");

						fetch(`https://api.coinranking.com/v2/coins?search=${cryptoName}`, {
							headers: {
								"x-access-token": "coinrankingd92e81e850707d5a4e21a45825ff2aabf6e45cf6617a7d57",
							},
						})
							.then((res) => res.json())
							.then((data) => setBtcInfo(data))
							.catch((err) => console.log(err));
					}}
				>
					<Flex direction="row" gap="2">
						<TextField.Root className="w-full">
							<TextField.Slot>
								<IconSearch height="16" width="16" />
							</TextField.Slot>
							<TextField.Input name="crypto_name_field" placeholder="Search for a crypto currency…" />
						</TextField.Root>
						<div className="ml-auto">
							<Button>Search</Button>
						</div>
					</Flex>
				</form>

				<Heading>Top 10 Coins Right Now</Heading>
				<div className="flex w-full flex-row gap-x-2 overflow-x-auto pb-4">
					{
						// This is a ternary operator. It's like an if statement, but it's an expression.
						// It's like saying "if top10CoinInfo is truthy, then return the first thing, otherwise return the second thing"
						// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
						top10CoinInfo && top10CoinInfo.data ? (
							// This is a map. It's like a for loop, but it's an expression.
							// It's like saying "for each element in top10CoinInfo.data.coins, return the first thing"
							// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
							top10CoinInfo.data.coins.map((coin) => (
								<Link key={"top10coin_" + coin.uuid} to={`/coins/${coin.uuid}`}>
									<Card>
										<Flex className="h-16" direction="columm" justify="center" align="center">
											<img className="mr-2 size-8" src={coin.iconUrl} alt="Coin Icon" />

											<Text>
												<Strong>{coin.name}</Strong>
											</Text>

											<Text>&nbsp;#{coin.rank}</Text>
										</Flex>
									</Card>
								</Link>
							))
						) : (
							<Text>Loading...</Text>
						)
					}
				</div>

				{btcInfo && status === "loading" && <Text>Loading...</Text>}
				{btcInfo && btcInfo.status === "success" && btcInfo.data.coins.length === 0 && (
					<Text>No results found</Text>
				)}

				{/* status: "fail", code: "RATE_LIMIT_EXCEEDED" */}
				{status === "fail" && <Text>Error! {btcInfo.message}</Text>}

				{status === "success" && (
					<Flex direction="column" gap="4">
						{data.coins.map((coin) => (
							<Link key={"coin_" + coin.uuid} to={`/coins/${coin.uuid}`}>
								<Flex direction="row" align="center" gap="2">
									<img src={coin.iconUrl} className="size-8" alt="Coin Logo" />
									<Text>
										<Strong>{coin.name}</Strong> ({coin.symbol}) [#{coin.rank}]
									</Text>
								</Flex>
							</Link>
						))}
					</Flex>
				)}
			</Flex>
		</Container>
	);
}

export default App;
