// code mirror plugin for jscs / ESLint

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("./node_modules/codemirror/lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["./node_modules/codemirror/lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})
(function(CodeMirror) {
	"use strict";

	function validator(text, options) {
		return options.checker(text, options);
	}

	CodeMirror.processJscsChecks = function(linter, text) {
		var jscsErrors = linter( text );

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

	CodeMirror.asyncValidator = function(text, updateLinting, options, cm) {
		options.requestValidation(text, function(text) {
			var lints = validator(text, options)
			updateLinting(cm, lints)
		});
	}

});