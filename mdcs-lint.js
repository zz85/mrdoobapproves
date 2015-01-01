// code mirror plugin for node-jscs

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

})(CodeMirror);