// code mirror plugin for node-jscs

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("./node_modules/codemirror/lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["./bower_components/codemirror/lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})
(function(CodeMirror) {
	"use strict";

	function validator(text, options) {

		var jscsErrors = options.jscsChecker( text );

		if (!jscsErrors) return [];

		var errorList = jscsErrors.getErrorList();

  		var hintErrors;

  		// convert to Code mirror lint errors format
		hintErrors = errorList.map(function(error) {

			// error.message
			return {
				message: jscsErrors.explainError(error)
				 + ' \n\n(Rule: ' + error.rule + ')\n ',
				// severity: 'warning',
				from: CodeMirror.Pos(error.line - 1, error.column),
			}

		});

		return hintErrors;
	}

	CodeMirror.registerHelper("lint", "javascript", validator);

	CodeMirror.jscsAsyncValidator = function(text, updateLinting, options, cm) {
		options.requestValidation(text, function(text) {
			var lints = validator(text, options)
			updateLinting(cm, lints)
		});
	}

});