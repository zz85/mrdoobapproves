const JscsStringChecker = require('jscs/lib/string-checker');
const mdcs = require('./mdcs');

const checker = new JscsStringChecker();
checker.registerDefaultRules();

const configuration = checker.getConfiguration();
const presets = configuration.getRegisteredPresets();
configuration.registerPreset( 'mdcs', mdcs );
checker.configure( { preset: 'mdcs' } );

// Also see https://github.com/jscs-dev/node-jscs/blob/master/test/data/options/preset/mdcs.js

/**
 * Code style that pass
 */
const ShouldPass = {

Approves: `
function mrdoob() {

	for ( var i = 0; i < 100; i ++ ) {

		hearts();

	}

}
`,

AnonymousFunction: `
Moo = function () {}
`,

NamedFunction: `
function foo() {}
`,

SpacesAfterKeywords: `
var i = 0;
var l = 1000;
`,

WhileLoop: `
while ( i < l ) {

	try {

		i ++;

	} catch ( e ) {

		throw "this is a test"

	}

}
`,

DoWhile: `
do {

	i ++;

} while ( i < l );
`,

NewLinesInBlock: `
if ( true ) {

	doSomething();

}
`,

//"requireSpaceAfterKeywords": ["if", "else", "return" ],
//"requireSpacesInFunctionExpression": {
//    "beforeOpeningCurlyBrace": true
//},

IfElseBlock: `
if ( i < l ) {

	function test( object, geometry ) {

		return ;

	}

} else {

	function test( object, geometry ) {

		return null;

	}

}
`,

// "requireSpaceAfterPrefixUnaryOperators": true,
SpacesAfterOperators: `
x = ! false; // space following logical not
x = ~ y; // space following bitwise not
x = - 5; // space following unary negation (ditto, unary plus)
if ( !! x ) {

}

x ++;
`,

// requireSpacesInsideParentheses
// requireSpaceBetweenArguments
SpacesBetweenArguments: `
test( 1, 2 );
`,

//"requireSpaceAfterKeywords": ["for", "switch"]
//"requireSpaceBeforeBlockStatements": true
//"requireSpaceAfterPrefixUnaryOperators": ["++", "--"],
BlockStatements: `
for ( var i = 0; i < l; i ++ ) {

	switch ( i ) {

		case 0: this.x = i --; break;
		case 1: this.y = ++ i; break;
		case 2: this.z = -- i; break;
		default: throw new Error( "index is out of range: " + index );

	}

}
`,

Operators: `
//"requireSpacesInsideObjectBrackets": "all",
//"requireSpacesInsideBrackets": "allButNested",
//"disallowSpaceBeforeBinaryOperators": [","]
var a = { test : { test2 : true }, test3 : { test4 : true } };
var b = [[ 1, 2 ], [ 3, 4 ], [ 5, 6 ]];

//"requireSpaceBeforeBinaryOperators": [ "+", "-", "/", "*", "=", "==", "===", "!=", "!==", ">", ">=", "<", "<=" ]
//"requireSpaceAfterBinaryOperators": [ "+", "-", "/", "*", "=", "==", "===", "!=", "!==", ">", ">=", "<", "<=" ]
//"requireSpacesInConditionalExpression": { "afterTest": true, "beforeConsequent": true, "afterConsequent": true, "beforeAlternate": true}
var c = ( ( d + e - f / g * h ) == i );
var j = k ? l : m;
//"requireLineFeedAtFileEnd": true,
`

};

const ShouldFail = {
ShouldHaveSpaces: `
for (var j=0;j<100;j++) {
	fail();
}

if(moo) {
  ho();
}else{
	nah
}
`
};


Object.keys(ShouldPass).forEach((k) => {
    let errors = checker.checkString( ShouldPass[k] );
    let list = errors.getErrorList()
    // console.log('Should pass', k, list);
    console.assert(list.length === 0, k);
});


Object.keys(ShouldFail).forEach((k) => {
    let errors = checker.checkString( ShouldFail[k] );
    let list = errors.getErrorList()
    // console.log('Should fail', k, list);
    console.assert(list.length > 0, k);
});