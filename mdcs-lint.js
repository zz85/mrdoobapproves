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

	CodeMirror.registerHelper("lint", "javascript", validator);

	CodeMirror.asyncValidator = function(text, updateLinting, options, cm) {
		options.requestValidation(text, function(text) {
			var lints = validator(text, options)
			updateLinting(cm, lints)
		});
	}

});