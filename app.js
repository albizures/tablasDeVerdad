var TRUE = 'V',
	FALSE = 'F';
// estos son los operadores que es una coleccion de objectos
// que tiene el texto que va a salir en pantalla y la funcion que se va usar
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
	}
];
// esto es para que se ejecute la funcion cuando termine de carga la pagina
window.onload = function () {
	// esto es para que cuando se le de click a un operador se ejecute una funcion en este caso es onClickOperator
	$('.operator').click(onClickOperator);
	// esto es para que cuando se le de click a una variable se ejecute una funcion en este caso es onClickVariable
	$('.variable').click(onClickVariable);
	// se llama operateAll recien cargada la pagina para que salgan los valores iniciales
	operateAll();
}
function onClickVariable() {
	// este es codigo que sirve para negar o quitar la negacion de una variable
	var not = this.getAttribute('data-not') === TRUE;
	if (not) {
		this.setAttribute('data-not', FALSE);
		this.textContent = this.textContent.replace('¬', '');
	} else {
		this.setAttribute('data-not', TRUE);
		this.textContent = '¬' + this.textContent;
	}
	// se llama operateAll despues de negar o quitar la negacion a una variable
	operateAll();
}
function onClickOperator() {
	// este es codigo que sirve para cambiar los operadores que se van a usar
	var next = this.getAttribute('data-operator');
	next = Number(next) + 1;
	if (next > 3) {
		next = 0;
	}
	this.textContent = operators[next].text;
	this.setAttribute('data-operator', next);
	// se llama operateAll despues de cambiar los operadores que se van a usar
	operateAll();
}

// ######### funciones de ayuda ##########
// getVal devuelve el valor de una celda por su id del html
function getVal(id) {
	var el = document.getElementById(id);
	return el.textContent === TRUE;
}
// setVal le pone un valor a una celda
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
// esta funcion devuelve que operador es el que se va a usar
function getOperator(num) {
	num = document.getElementById('operator' + num).getAttribute('data-operator');
	return operators[num].operator;
}
// esta funcion devuelve true si la variable esta negada
function variableNot(num) {
	var el = document.getElementById('variable' + num),
		not = el.getAttribute('data-not') === TRUE;
	return not;
}

// ######### funciones que son para hacer las operaciones con los operadores ##########
// funcion para recorrer las 8 filas de la tabla
function operateAll() {
	var p, q, r;
	for (var i = 0; i < 8; i++) {
		p = getVal(i + '0');
		q = getVal(i + '1');
		r = getVal(i + '2');
		operateLine(p, q, r, i);
	}
}
// funcion para operar las filas individualmente
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
		tempP = negacion(p);
	} else {
				tempP = p;
	}
	if (variableNot(3)) {
		tempR = negacion(r);
	} else {
			tempR = r;
	}
	result1 = operator1(tempP, tempR);
	setVal(index + '5', result1);

	result2 = operator2(result0, result1);
	setVal(index + '4', result2);
}

// ############## funciones que son para los operadores ##############
function negacion(value) {
	return !value;
}
function disyuncion(value1, value2) {
	if (value1 == false && value2 == false) {
		return false;
	} else {
		return true;
}
}
function conjuncion(value1, value2) {
	if (value1 == true && value2 == true) {
		return true;
	} else {
		return false;
	}
}
function condicional (value1, value2) {
	if (value1 == true && value2 == false) {
		return false;
	} else {
		return true;
	}
}
function bicondicional(value1, value2) {
	return value1 === value2;
}
