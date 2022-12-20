"use strict";

// eslint-disable-next-line no-undef
module.exports = {
	"extends": ["stylelint-config-standard-scss",   "stylelint-config-css-modules"],
	"overrides": [{
		"files": ["**/*.scss"],
		"customSyntax": "postcss-scss"
	}],
};
