var TRUE = 'V',
	FALSE = 'F';
var operators = [
	{
		operator : conjuncion,
		text : '∧'
	},
	{
		operator : disyuncion,
		text : '∨'
	},
	{
		operator : condicional,
		text : '->'
	},
	{
		operator : bicondicional,
		text : '<->'
	},
	{
		operator : negacion,
		text : '¬'
	}
];
window.onload = function () {
	$('.operator').click(onClickOperator);
	$('.variable').click(onClickVariable);
	operateAll();
}
function onClickVariable() {
	var not = this.getAttribute('data-not') === TRUE;
	if (not) {
		this.setAttribute('data-not', FALSE);
		this.textContent = this.textContent.replace('¬', '');
	} else {
		this.setAttribute('data-not', TRUE);
		this.textContent = '¬' + this.textContent;
	}
	operateAll();
}
function onClickOperator() {
	var next = this.getAttribute('data-operator');
	next = Number(next) + 1;
	console.log(next);
	if (next > 3) {
		next = 0;
	}
	this.textContent = operators[next].text;
	console.log(next);
	this.setAttribute('data-operator', next);
	operateAll();
}
function getVal(id) {
	var el = document.getElementById(id);
	return el.textContent === TRUE;
}
function setVal(id, val) {
	var el = document.getElementById(id);
	val = val? TRUE : FALSE;
	if (el.textContent != val) {
		el.classList.add('value-change');
		setTimeout(function () {
			el.classList.remove('value-change');
		}, 400);
		el.textContent = val;
	}
}
function getOperator(num) {
	num = document.getElementById('operator' + num).getAttribute('data-operator');
	return operators[num].operator;
}
function variableNot(num) {
	var el = document.getElementById('variable' + num),
		not = el.getAttribute('data-not') === TRUE;
	return not;
}
function operateAll() {
	var p, q, r;
	for (var i = 0; i < 8; i++) {
		p = getVal(i + '0');
		q = getVal(i + '1');
		r = getVal(i + '2');
		operateLine(p, q, r, i);
	}
}
function operateLine(p, q, r, index) {
	var operator0 = getOperator(0),
		operator1 = getOperator(1),
		operator2 = getOperator(2),
		result0, result1, result2,
		tempP, tempQ, tempR;

	if (variableNot(0)) {
		tempP = negacion(p);
	} else {
		tempP = p;
	}
	if (variableNot(1)) {
		tempQ = negacion(q);
	} else {
		tempQ = q;
	}
	result0 = operator0(tempP, tempQ);
	setVal(index + '3', result0);


	if (variableNot(2)) {
		tempQ = negacion(q);
	} else {
		tempQ = q;
	}
	if (variableNot(3)) {
		tempR = negacion(r);
	} else {
		tempR = r;
	}
	result1 = operator1(tempQ, tempQ);
	setVal(index + '5', result1);

	result2 = operator2(result0, result1);
	setVal(index + '4', result2);

}

function negacion(value) {
	return !value;
}
function disyuncion(value1, value2) {
	return value1 || value2;
}
function conjuncion(value1, value2) {
	return value1 && value2;
}
function condicional (value1, value2) {
	return !value1 || value2;
}
function bicondicional(value1, value2) {
	return value1 === value2;
}
