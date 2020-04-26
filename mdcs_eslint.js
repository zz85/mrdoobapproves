/* MrDoob Code Style ESLint */
/*

See http://eslint.org/docs/rules/

"off" or 0 - turn the rule off
"warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
"error" or 2 - turn the rule on as an error (exit code is 1 when triggered)

*/


const mdcs_eslint = {
  "env": {
    "browser": true,
    "node": true,
    "es2020": true,
  },
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    /*
    Stylistic Issues
    http://eslint.org/docs/rules/#stylistic-issues
    */

    "array-bracket-spacing": ["error", "always", { "singleValue": true, "arraysInArrays": false }],
    "block-spacing": ["error", "always"],
    "brace-style": [ "error", "1tbs", { "allowSingleLine": true } ],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "comma-style": [ 2, "last" ],
    "computed-property-spacing": ["error", "always"],
    "eol-last": ["error", "always"],
    "func-call-spacing": ["error", "never"],
    "indent": ["error", "tab", { "SwitchCase": 1 }],
    "key-spacing": ["error", { "beforeColon": false }],

    "new-parens": ["error"],
    "no-trailing-spaces": ["error", { "skipBlankLines": false }],
    "no-whitespace-before-property": ["error"],

    "object-curly-spacing": ["error", "always"],

    "padded-blocks": ["error", {
      "blocks": "always",
      "switches": "always",
      "classes": "always"
    }],

    "semi": ["error", "always", { "omitLastInOneLineBlock": true }],
    "semi-spacing": ["error", {"before": false, "after": true}],
    "space-before-blocks": ["error",  { "functions": "always", "keywords": "always", "classes": "always" }],
    "space-before-function-paren": ["error", {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "ignore"
    }],
    "space-in-parens": ["error", "always" ],
    "space-infix-ops": ["error"],
    "space-unary-ops": ["error", {
          "words": true,
          "nonwords": true,
          "overrides": {
          }
    }],

    "keyword-spacing": ["error", { "before": true, "after": true }],
    "padding-line-between-statements": [
      "error",
      { "blankLine": "always", "prev": "block-like", "next": "*" }
    ],

    /* Best Practices */
    // "eqeqeq": 0,                             // Require === and !==
    // "new-cap": 0,                            // Disallow captialized function to be used without new.
    "no-multi-spaces": 2,        // Don't care if there's more than one space anywhere.
    // "no-unused-expressions": 0,  // Don't care if there are unused experssions. eg "flag && doThing();"
    // "consistent-return": 0,      // Don't care if some returns return no value

    /* Variables */
    "no-undef": 1,
    "no-unused-vars": 1,

    /* Possible Errors */
    "no-extra-semi": 1,                      // Disallow extra semicolons. Example function foo() { };


    // "camelcase": 0,                          // Disallow names_with_underscore
    // "no-mixed-spaces-and-tabs": 0,           // Disallow both spaces and tabs in the same line for indenting
    // "strict": 0,                             // Require "use strict"

    // "yoda": 0,                   // Don't care if it's "if (1 == v)" or "if (v == 123)".
    // "no-empty": 0,               // Don't care if we have empty blocks
    // "no-shadow": 0,              // Don't care if the same variable name is used in an inner scope.

    // "dot-notation": 0,           // Don't care if it's obj["prop"] instead of obj.prop
    // "no-console": 0,             // allow the use of console
    // "curly": 0,                  // Don't require all if statements to have curly braces
    // "no-redeclare": 0,           // Don't care if var declared more than once in same scope. eg for (var x, ...) for (var x, ...);
    // "quotes": 0,                 // Don't care if quotes are double or single
    // "no-use-before-define": 0,   // don't care if something is used before it's defined.
    // "no-underscore-dangle": 0,   // don't care if var starts with underscore
  },
  "globals": {
    "THREE": false,        // Don't allow overriding THREE
    "console": true,       // Define console and allow it to be overridden
  }
}

if ( typeof(module) !== 'undefined' ) {
    module.exports = mdcs_eslint;
}
