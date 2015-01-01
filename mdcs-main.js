var textarea = document.getElementById('code');
var answer = document.getElementById('answer');
var hints = document.getElementById('hints');
var autocheck = document.getElementById('autocheck');
var merge = document.getElementById('merge');
var mergeButtons = document.getElementById('mergeButtons');

var deferredValidator;
var cmOptions = {
	value: textarea.value,
	mode:  'javascript',
	indentUnit: 4,
	indentWithTabs: true,
	lineNumbers: true,
	matchBrackets: true,
	autoCloseBrackets: true,
	showTrailingSpace: true,
	gutters: [ 'CodeMirror-lint-markers' ],
	lint: {
		async: true,
		getAnnotations: CodeMirror.jscsAsyncValidator,
        requestValidation: function(text, validator) {
			deferredValidator = validator;

			if (autocheck.checked) validator(text);
        }
    },
    // merge plugin - for our case "orginal" means our  "formatted" version.
    origRight: '',
	// connect: 'align',
	collapseIdentical: true,
	allowEditingOriginals: false,
	showDifferences: true,
	revertButtons: true
};

var checker, codeEditor, visibleError;

var loading = document.getElementById('loading');
loading.style.display = 'none';

function init() {

	/*
	 * Init JSCS Checker
	 */

	checker = new JscsStringChecker();

	checker.registerDefaultRules();
	checker.configure({
		preset: 'mdcs'
	});

	/*
	 * Init Code CodeMirror
	 */
	// codeEditor = CodeMirror.fromTextArea( textarea, cmOptions );
	
	textarea.className = 'hide';
	mergeView = CodeMirror.MergeView(merge, cmOptions);
	codeEditor = mergeView.editor();
	formatEditor = mergeView.rightOriginal();
	editMode(true);

}

init();

function hideAnswer() {
	answer.style.opacity = 0;
}

function setAnswer(comment, style) {
	answer.style.opacity = 1;
	answer.textContent = comment;
	answer.className = style;

	setTimeout(hideAnswer, 3000);
}

function check() {
	var code = codeEditor.getValue();
	if (deferredValidator) deferredValidator(code);
}

function jscsCheck( code ) {

	// console.info('checking ' + code + '...');

	if (code.trim().length === 0) {
		setAnswer('Maybe... :)', 'maybe');
		return;
	}

	var errors;
	try {
		console.time('jscs check');
		errors = checker.checkString(code);
		console.timeEnd('jscs check');
	} catch (e) {
		
		// jscs now catches parse error into errorlist, so this shouldn't happen
		setAnswer('oops... something went wrong...', 'no');
		throw(e);
	}

	var errorList = errors.getErrorList();

	console.log( 'checking done. ' + errorList.length + ' errors' );

	if (errorList.length === 0) {
		setAnswer('Possibly \\o/*\\o', 'yes');
	} else {
		setAnswer('No!!! :(', 'no');
	}

	visibleError = errorList[ 0 ];

	if (visibleError) {

		hints.textContent = visibleError.line + ':' + visibleError.column + '\t' + visibleError.message + ' (Rule: ' + visibleError.rule + ')';
		
	} else {

		hints.textContent = '';

	}

	return errors;

}

function gotoError() {
	if (visibleError) {

		var line = visibleError.line - 1;

		var scrollInfo = codeEditor.getScrollInfo();
		var coords = codeEditor.charCoords({line: line, ch: visibleError.column}, "local");

		codeEditor.setCursor(line, visibleError.column, { scroll:false } );

		if (scrollInfo.top > coords.bottom || scrollInfo.top + scrollInfo.clientHeight < coords.top) {
			// out of view
			codeEditor.scrollTo(null, coords.bottom - scrollInfo.clientHeight / 2);

		}

		codeEditor.focus();

	}
}

/*
 * Support Auto-correcting
 */

function format() {
	mergeMode();
	var code = codeEditor.getValue();

	try {
		console.time('jscs format');
		formatEditor.setValue( checker.formatString(code) );

		/*
		// Reverse approach
		codeEditor.setValue( checker.formatString(code) );
		formatEditor.setValue( code );
		*/
		
	} catch (e) {
		alert('oops, i cant format that right now...')
		throw(e);
	} finally {
		console.timeEnd('jscs format');
	}
}

function editMode(init) {
	mergeView.wrapRight.style.display = 'none';
	mergeView.right.gap.style.display = 'none';
	mergeView.wrapEdit.style.width = '100%';
	if (init) {
		setTimeout(function() {
			mergeView.wrapEdit.style.transition = 'width 0.35s ease-out';
		});
	}

	mergeView.setShowDifferences(false);
	mergeButtons.style.display = 'none';
}

function mergeMode() {
	mergeView.wrapEdit.style.width = ''; // 47%
	mergeView.wrapRight.style.display = '';
	mergeView.right.gap.style.display = '';
	mergeButtons.style.display = '';

	// mergeView.wrapEdit.style.transition = 'width 0.2s ease-out';
	mergeView.setShowDifferences(true);
}

function mergeAll() {
	codeEditor.setValue( formatEditor.getValue() );
	editMode();
}

/*
 * Open file
 */

var input, openCallback;

function openFile() {
	openAs(function(text) {
		codeEditor.setValue( text );
	}, document.body);
}

function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

	var f = files[0];
	if (!f) return;

	var reader = new FileReader();

	// Closure to capture the file information.
	reader.onload = function(e) {
		var data = e.target.result;
		openCallback(data);
	};

	reader.readAsText(f);

	input.value = '';
}

function openAs(callback, target) {
	console.log('openfile...');
	openCallback = callback;

	if (!input) {
		input = document.createElement('input');
		input.style.display = 'none';
		input.type = 'file';
		input.addEventListener('change', handleFileSelect);
		target = target || document.body;
		target.appendChild(input);
	}

	var e = document.createEvent("MouseEvents");
	e.initMouseEvent(
		'click', true, false, window, 0, 0, 0, 0, 0,
		false, false, false, false, 0, null
	);
	input.dispatchEvent(e);
}
