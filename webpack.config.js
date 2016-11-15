// webpack.config.js

var CODEMIRROR_BASE = './node_modules/codemirror';

var codemirror = [

	'/lib/codemirror.js',
	'/mode/javascript/javascript.js',

	'/addon/edit/trailingspace.js',
	'/addon/edit/matchbrackets.js',
	'/addon/edit/closebrackets.js',

	'/addon/lint/lint.js',

	'/addon/lint/lint.css',
	'/lib/codemirror.css',
	'/addon/merge/merge.css',
];

codemirror = codemirror.map(function(path) {
	return CODEMIRROR_BASE + path;
});

var entries = [


].concat(codemirror).concat([
	'./mdcs-merge.js',
	'./mdcs-lint.js',
	'./mdcs-main.js'
]);

module.exports = {
	module: {
		loaders: [
			{ test: /\.css$/, loader: "style-loader!css-loader" },
			{ test: /\.json$/, loader: "json-loader" },
		]
	},

	// devtool: "source-map",

	entry: entries,

	output: {
		filename: 'build/mdcs_bundle.js'
	},

	node: {
		fs: "empty",
		net: 'empty',
		tls: 'empty',
		dns: 'empty',
		module: 'empty'
	}
};
