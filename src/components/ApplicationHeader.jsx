import { Container } from "@radix-ui/themes";
import React from "react";
import { Link } from "react-router-dom";

export default function ApplicationHeader() {
	return (
		<Container className="mb-4 uppercase bg-gray-800/50 p-1">
			<Link to="/" className="hover:text-orange-600/75">Home</Link>
		</Container>
	);
}
