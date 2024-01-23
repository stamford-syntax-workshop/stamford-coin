import { Container } from "@radix-ui/themes";
import React from "react";
import { Link } from "react-router-dom";

export default function ApplicationHeader() {
	return (
		<Container className="mb-4 uppercase">
			<Link to="/" className="hover:font-bold">
				Home
			</Link>
		</Container>
	);
}
