import { Theme } from "@radix-ui/themes";
import PropTypes from "prop-types";
import React from "react";

import ApplicationHeader from "./components/ApplicationHeader";

export default function AppLayout({ children }) {
	return (
		<Theme appearance="dark" accentColor="blue" grayColor="sand">
			<ApplicationHeader />
			{children}
		</Theme>
	);
}

AppLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
