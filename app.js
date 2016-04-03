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
	$('.operator').click(onClick);
	operateAll();
}
function onClick() {
	var next = this.getAttribute('data-operator');
	next = Number(next) + 1;
	console.log(next);
	this.textContent = operators[next].text;
	if (next >= 4) {
		next = 0;
	}
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
	console.log(num, operators[num].operator.name);
	return operators[num].operator;
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
		result0,
		result1,
		result2;

	result0 = operator0(p, q);
	setVal(index + '3', result0);

	result1 = operator1(q, r);
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
