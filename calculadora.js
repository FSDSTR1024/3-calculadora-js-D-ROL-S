let withCover = true;
let firstTime = true;
let mainEnded = false;
let coverEnded = true;

// Rotacion inicial
document.getElementById('main').addEventListener('click', () => {
	const main = document.getElementById('main');
	main.style.animationName = 'rotateCalculator';

	main.addEventListener('animationend', () => {
		mainEnded = true;
	});
});

// Control del estado de la calculadora con tapa o sin tapa
document.getElementById('cover').addEventListener('click', () => {
	if (!mainEnded || !coverEnded) return;

	coverEnded = false;

	if (withCover) {
		cover.style.animationName = 'removeCover';
		if (calculatorOn) {
			mathField.focus();
		}
	} else {
		cover.style.animationName = 'putCover';

		if (calculatorOn) {
			mathField.blur();
		}
	}

	withCover = !withCover;

	cover.addEventListener('animationend', () => {
		if (firstTime) {
			firstTime = false;
		}

		coverEnded = true;
	});
});

const calculatorScreen = document.getElementById('calculatorScreen');
const calculatorScreenResult = document.getElementById('calculatorScreenResult');

// Inicialización de la biblioteca MathQuill
var MQ = MathQuill.getInterface(2);
const mathField = MQ.MathField(calculatorScreen, {
	spaceBehavesLikeTab: false, // Permite usar el espacio como tabulador dentro de la expresión
});

const mathFieldResult = MQ.MathField(calculatorScreenResult, {
	spaceBehavesLikeTab: false, // Permite usar el espacio como tabulador dentro de la expresión
});

let calculatorOn = false;
let cursorPos = 0;
let history = [];
let lastResult = 0;

document.addEventListener('click', (e) => {
	e.preventDefault();

	//Si la calculadora está encendida
	if (calculatorOn && !withCover) {
		// Le damos el foco a la pantalla aunque se clicke fuera de ella
		mathField.focus();
	}
});

// Control del estado de la calculadora (apagada/encendida)
document.getElementById('on').addEventListener('click', (e) => {
	e.preventDefault();

	// Si la calculadora está apagada, entonces va a encender
	if (!calculatorOn) {
		// Le damos el foco a la pantalla
		mathField.focus();
	}

	// Si la calculadora estaba encendida, entonces la apagamos
	else {
		// Limpiamos el contenido
		mathField.latex('');
		mathFieldResult.latex('');
		history = [];
	}

	// Cambiamos el estado al contrario
	calculatorOn = !calculatorOn;
});

// Escritura de numeros por teclado
calculatorScreen.addEventListener('keydown', (e) => {
	e.preventDefault();

	if (calculatorOn && !withCover) {
		// Si la tecla pulsada es un numero y no es un espacio
		if (!isNaN(e.key) && e.key !== ' ') {
			mathField.write(e.key);
		}
		// Si la tecla pulsada es la flecha arriba
		else if (e.key === 'ArrowUp') {
			// Movemos el cursor al final
			mathField.moveToRightEnd();
		}
		// Si la tecla pulsada es la flecha abajo
		else if (e.key === 'ArrowDown') {
			// Movemos el cursor al principio
			mathField.moveToLeftEnd();
		}
	}
});

// Control de los botones

const buttons = [...document.getElementsByClassName('calculatorButton')];

buttons.forEach((button) => {
	button.addEventListener('click', (e) => {
		if (calculatorOn) {
			e.preventDefault();

			// Si pulsamos AC
			if (button.id === 'clear') {
				// Limpiamos el contenido
				mathField.latex('');
				mathFieldResult.latex('');
			} else if (button.id === 'delete') {
				mathField.keystroke('Backspace');
			} else if (button.id === 'fraction') {
				mathField.cmd('\\frac');
			} else if (button.id === 'sqrt') {
				mathField.cmd('\\sqrt');
			} else if (button.id === 'inverse') {
				mathField.write('\\left(\\right)^{-1}');
			} else if (button.id === 'sin') {
				mathField.write('\\sin\\left(\\right)');
			} else if (button.id === 'cos') {
				mathField.write('\\cos\\left(\\right)');
			} else if (button.id === 'tan') {
				mathField.write('\\tan\\left(\\right)');
			} else if (button.id === 'squared') {
				mathField.write('\\left(\\right)^{2}');
			} else if (button.id === 'raised') {
				mathField.write('{}^{}');
			} else if (button.id === 'log') {
				mathField.write('\\log_{}()');
			} else if (button.id === 'ln') {
				mathField.write('ln()');
			} else if (button.id === 'dot') {
				mathField.write('.');
			} else if (button.id === 'tenRaised') {
				mathField.write('×10^{}');
			} else if (button.id === 'equal') {
				// A la expresion se le reemplazan los casos especiales
				let expression = specialCaseParsing();
				// Guardamos la expresion en el historial
				if (expression.length > 0) AddAccountToHistory();
				// Evaluamos la expresion
				let result = Math.round(evaluatex(expression, { latex: true })() * 10000) / 10000;
				// Mostramos el resultado
				mathFieldResult.latex(result);
				// Guardamos el resultado
				lastResult = result;
			} else {
				mathField.write(button.textContent);
			}
		}
	});
});

function specialCaseParsing() {
	let expression = mathField.latex().replace(/Ans/g, lastResult);
	expression = expression.replace(/\\ln/g, 'log');
	expression = expression.replace(/\\log_(\d+)\((\d+)\)/g, 'logn($2, $1)');
	return expression;
}

// Control de las flechas

const arrows = [...document.getElementById('arrowsContainer').childNodes];

arrows.forEach((arrow) => {
	// Añadimos el evento de click a cada boton de flecha
	arrow.addEventListener('click', (e) => {
		e.preventDefault();

		// Si la calculadora está encendida
		if (calculatorOn) {
			// Si se pulsa la flecha izquierda
			if (arrow.id === 'leftArrow') {
				// Indicar que el cursor se debe mover un espacio hacia la izquierda
				mathField.keystroke('Left');
			}

			// Si se pulsa la flecha derecha
			else if (arrow.id === 'rightArrow') {
				// Indicar que el cursor se debe mover un espacio hacia la derecha
				mathField.keystroke('Right');
			}

			// Si se pulsa la flecha arriba
			else if (arrow.id === 'upArrow') {
				// Indicar que el cursor debe moverse al final
				mathField.moveToRightEnd();
			}

			// Si se pulsa la flecha abajo
			else if (arrow.id === 'downArrow') {
				// Indicar que el cursor debe moverse al principio
				mathField.moveToLeftEnd();
			}
		}
	});
});

// Control del historial

const historyList = document.getElementById('historyList');

function AddAccountToHistory() {
	// Guardamos la expresion en el historial
	history.push(mathField.latex());

	const li = document.createElement('li');
	const mathFieldLi = MQ.MathField(li, {
		spaceBehavesLikeTab: false, // Permite usar el espacio como tabulador dentro de la expresión
	});

	li.addEventListener('click', (e) => {
		e.preventDefault();

		if (calculatorOn && !withCover) {
			mathField.latex(mathFieldLi.latex());
		}
	});

	mathFieldLi.latex(mathField.latex());
	historyList.appendChild(li);
}
