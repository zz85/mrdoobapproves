// Also see https://github.com/jscs-dev/node-jscs/blob/master/test/data/options/preset/mdcs.js

/**
 * Code style that passes mrdoob
 */
const ShouldPass = {

Approves: `
function mrdoob() {

	for ( var i = 0; i < 100; i ++ ) {

		hearts();

	}

}
`,

NoSpacePriorToTheLeftParentheses: `
var geometry = new THREE.ConvexGeometry( vertices );

var material = new THREE.MeshPhongMaterial( { shading: THREE.FlatShading } );

var mesh = new THREE.Mesh( geometry, material );

scene.add( mesh );
`,

SwitchStatementStyle1: `
switch ( event ) {

	case THREE.ConstantA:

		foo();
		break;

	case THREE.ConstantB:

		bar();
		break;

}
`,

SwitchStatementStyle2: `
switch ( event ) {

	case 1: foo(); break;

	case 2: bar(); break;

}
`,

AnonymousFunction: `
Moo = function () {};
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

		throw "this is a test";

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

		return;

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
var a = { test: { test2: true }, test3: { test4: true } };
var b = [[ 1, 2 ], [ 3, 4 ], [ 5, 6 ]];

//"requireSpaceBeforeBinaryOperators": [ "+", "-", "/", "*", "=", "==", "===", "!=", "!==", ">", ">=", "<", "<=" ]
//"requireSpaceAfterBinaryOperators": [ "+", "-", "/", "*", "=", "==", "===", "!=", "!==", ">", ">=", "<", "<=" ]
//"requireSpacesInConditionalExpression": { "afterTest": true, "beforeConsequent": true, "afterConsequent": true, "beforeAlternate": true}
var c = ( ( d + e - f / g * h ) == i );
var j = k ? l : m;
//"requireLineFeedAtFileEnd": true,
`,

ForLoop: `
for ( a = 0; a < 23; a ++ ) {

	hello = 'world';

}
`,

IfBlock: `
if ( moo ) {

	moo();

} else {

	cow();

}
`,
SemiColons: `
hello_world();
`,
Async: `
async function hello() {
}
`

};

/**
 * Code style that fails mrdoob
 */
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
`,

IfSpace: `
if(moo) {}
`,

IfSpace2: `
if ( moo) {}
`,

IfSpace3: `
if (moo ) {}
`,

IfSpace4: `
if ( moo ) {
	moo();	
}
`,

SomeTrailingSpaceInBlock: `
if ( moo ) {

	moo();
	
} else {

	cow();

}
`,

SpacesPriorToTheLeftParentheses:`
var geometry = new THREE.ConvexGeometry ( vertices );

var material = new THREE.MeshPhongMaterial ( { shading: THREE.FlatShading } );

var mesh = new THREE.Mesh ( geometry, material );

scene.add ( mesh );
`,

Invalids: `
for ( a = 0; a < 23; a ++ ) {
	hello = 'world';
}

for ( a=0; a<23; a ++ ) {

	hello = 'world';

}

for (a = 0; a < 23; a ++) {

	hello = 'world';

}

for ( a = 0;a < 23; a ++ ) {

	hello = 'world';
}
`,

KeySpacing: `
var x = { test : { test2 : true }, test3 : { test4 : true } };
`,

SemiColons: `
hello_world()
`,

BadSwitchBlock: `
switch(event){
case THREE.ConstantA:
foo();
break;
case THREE.ConstantB:
bar();
break;
}
`,

NewLineAfterBlock: `
if ( foo ) {

	bar = 1;

} // blank line missing
bah = 2;
`,

};

/**
 * ESLint Code Style Checking
 */

// See Node API http://eslint.org/docs/developer-guide/nodejs-api.html
const linter = require('eslint').linter;
config = require('./mdcs_eslint');

Object.keys(ShouldPass).forEach((k) => {
	const code = ShouldPass[k];
	const list = linter.verify(code, config).filter(v => v.severity === 2);
	const pass = list.length === 0;

	if (!pass) {
		console.log('Should pass', k, list);
	}

	console.assert(pass, 'Eslint: ' + k + ' should pass');
});

Object.keys(ShouldFail).forEach((k) => {
	const code = ShouldFail[k];
	const list = linter.verify(code, config).filter(v => v.severity === 2);
	const pass = list.length > 0;

	if (!pass) {
		console.log('Should fail', k, list);
	}

	console.assert(pass, 'Eslint: ' + k + ' should fail');
});
