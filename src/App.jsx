import { useState } from "react";

import { Button, Container, Flex, Strong, Text, TextField } from "@radix-ui/themes";
import { IconChartDots3, IconCoin, IconSearch } from "@tabler/icons-react";

function App() {
	const [btcInfo, setBtcInfo] = useState(null);

	const { status, data } = btcInfo ? btcInfo : { status: "loading", data: null };

	// BTC UUID Qwsogvtv82FCd

	return (
		<Container>
			<Flex direction="column" gap="4">
				<Text>Hello from Radix Themes!</Text>
				<form
					onSubmit={(e) => {
						e.preventDefault();

						const formData = new FormData(e.target);
						const cryptoName = formData.get("crypto_name_field");

						if (!cryptoName) throw new Error("No crypto name provided");

						fetch(`https://api.coinranking.com/v2/coins?search=${cryptoName}`)
							.then((res) => res.json())
							.then((data) => setBtcInfo(data))
							.catch((err) => console.log(err));
					}}
				>
					<Flex direction="column" gap="2">
						<TextField.Root>
							<TextField.Slot>
								<IconSearch height="16" width="16" />
							</TextField.Slot>
							<TextField.Input name="crypto_name_field" placeholder="Search for a crypto currency…" />
						</TextField.Root>
						<div className="ml-auto">
							<Button>Search</Button>
						</div>
						<div className="flex flex-row">
							<div className="relative h-64 w-64">
								<IconCoin className="h-full w-full" />
							</div>
							<div className="relative h-64 w-64">
								<IconChartDots3 className="h-full w-full" />
							</div>
						</div>
					</Flex>
				</form>

				{btcInfo && status === "loading" && <Text>Loading...</Text>}
				{/* {status === "error" && <Text>Error: {data.message}</Text>} */}
				{status === "success" && (
					<Flex direction="column" gap="4">
						<Text>Success!</Text>
						{data.coins.map((coin) => (
							<Text key={"coin_" + coin.uuid}>
								<Strong>{coin.name}</Strong> ({coin.symbol})
							</Text>
						))}
					</Flex>
				)}
			</Flex>
		</Container>
	);
}

export default App;
