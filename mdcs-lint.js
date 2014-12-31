// code mirror plugin for node-jscs

(function(CodeMirror) {
	"use strict";

	function validator(text, options) {

		var jscsErrors = check( text );
		var errorList = jscsErrors.getErrorList();

  		var hintErrors;

  		// convert to Code mirror lint errors format
		hintErrors = errorList.map(function(error) {

			return {
				message: error.message
					+ ' \n(Rule: ' + error.rule + ')'
					+ '\n' + jscsErrors.explainError(error),
				severity: 'warning',
				from: CodeMirror.Pos(error.line - 1, error.column),
			}

		});

		return hintErrors;
	}

	CodeMirror.registerHelper("lint", "javascript", validator);

})(CodeMirror);