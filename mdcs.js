var mdcs = {
    "requireCurlyBraces": ["while", "do", "try", "catch"],
    "requireSpaceAfterKeywords": ["if", "else", "for", "while", "do", "switch", "return", "try", "catch"],
    "requireSpaceBeforeKeywords": ["else"],
    "requireSpacesInFunctionExpression": {
        "beforeOpeningCurlyBrace": true
    },
    "requirePaddingNewlinesInBlocks": true,
    "requireSpacesInsideParentheses": "all",
    "requireSpacesInsideObjectBrackets": "all",
    "requireSpacesInsideBrackets": {
        "allExcept": [ "[", "]" ]
    },
    "requireSpaceBeforeBlockStatements": true,
    "requireSpacesInForStatement": true,
    "requireSpaceBeforeObjectValues":true,
    "requireSpaceBetweenArguments": true,
    "disallowKeywords": [ "with" ],
    "requireLineFeedAtFileEnd": true,
    "validateLineBreaks": "LF",
    "validateIndentation": "\t",
    "requireSpaceAfterPrefixUnaryOperators": true,
    "requireSpaceBeforePostfixUnaryOperators": ["++", "--"],
    "requireSpaceBeforeBinaryOperators": true,
    "requireSpaceAfterBinaryOperators": true,
    "disallowSpaceBeforeBinaryOperators": [","],
    "disallowSpacesInFunctionDeclaration": {
        "beforeOpeningRoundBrace": true
    },
    "requireSpacesInAnonymousFunctionExpression": {
        "beforeOpeningRoundBrace": true
    },
    "requireSpacesInConditionalExpression": {
        "afterTest": true,
        "beforeConsequent": true,
        "afterConsequent": true,
        "beforeAlternate": true
    },
    "disallowTrailingWhitespace": true,
    "disallowMultipleSpaces": true
};

if ( typeof(module) !== 'undefined' ) {
    module.exports = mdcs;
}