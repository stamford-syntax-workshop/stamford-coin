import { useEffect, useState } from "react";
const BTC_INFO_URL = "https://api.coinranking.com/v2/coins?search=bitcoin";

function App() {
	const [btcInfo, setBtcInfo] = useState(null);

	useEffect(() => {
		fetch(BTC_INFO_URL)
			.then((res) => res.json())
			.then((data) => setBtcInfo(data))
			.catch((err) => console.log(err));
	}, []);

	const { status, data } = btcInfo ? btcInfo : { status: "loading", data: null };

	// BTC UUID Qwsogvtv82FCd
	return (
		<div>
			{status === "success" ? (
				data.coins.map((coin) => {
					return (
						<div key={"coindiv_" + coin.uuid}>
							<h1>
								{coin.name} ({coin.symbol}) - {Number(coin.price).toFixed(2)}$
							</h1>
						</div>
					);
				})
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}

export default App;
