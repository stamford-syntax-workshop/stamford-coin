import { useState } from "react";

import { Button, Container, Flex, Strong, Text, TextField } from "@radix-ui/themes";
import { IconSearch } from "@tabler/icons-react";

import { Link } from "react-router-dom";

function App() {
	const [btcInfo, setBtcInfo] = useState(null);

	const { status, data } = btcInfo ? btcInfo : { status: "init", data: null };

	// BTC UUID Qwsogvtv82FCd

	return (
		<Container>
			<Flex direction="column" gap="4" >
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
					</Flex>
				</form>

				{btcInfo && status === "loading" && <Text>Loading...</Text>}
				{status === "error" && <Text>Error: {data.message}</Text>}
				{status === "success" && (
						<Flex direction="column" gap="4">
							<Text align="center" size="5" color="green">Success!</Text>
							{data.coins.map((coin) => (
								<Link 
									key={"coin_" + coin.uuid} 
									to={`/coins/${coin.uuid}`} 
									className="p-1 rounded hover:bg-blue-500/50 "
								>
									<Text>
										<Strong>{coin.name}</Strong> ({coin.symbol})
									</Text>
								</Link>
							))}
						</Flex>
				)}
			</Flex>
		</Container>
	);
}

export default App;
