import { Container, Text } from "@radix-ui/themes";
import React from "react";

export default function FourOhFour() {
	return (
		<div className="flex flex-col items-center justify-center h-96">
			<Text align="center" color="red" size="7">Uh Oh! Stinky!</Text>
			<Text align="center" className="text-2xl text-gray-700">Not Found!</Text>
		</div>
	);
}