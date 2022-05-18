const canvas = document.querySelector('#jsCanvas');
const colors = document.querySelectorAll('.jsColor');
const ctx = canvas.getContext("2d");
const range = document.querySelector('#jsRange');
const mode = document.querySelector('#jsMode');
const clear = document.querySelector('#jsClear');
const saveBtn = document.querySelector('#jsSave');
const erase = document.getElementById("jsErase");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = "INITIAL_COLOR";
ctx.fillStyle = "INITIAL_COLOR"
ctx.lineWidth = 2.5;

background = "white";

let painting = false;
let filling = false;

function stopPainting(event) {
	painting = false;
}

function startPainting(event) {
	painting = true;
}

function onMouseMove(event) {
	const x = event.offsetX;
	const y = event.offsetY;
	if (!painting) {
		//경로를 만든다

		ctx.beginPath();
		//경로 생성
		ctx.moveTo(x, y);
		//선 시작 좌표
	} else {
		//그린다.

		ctx.lineTo(x, y);
		//선 끝 좌표
		ctx.stroke();
		//선 그리기
	}
}

function handleColorClick(event) {
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;

}

function handleRangeChange(event) {
	const strokeSize = event.target.value;
	ctx.lineWidth = strokeSize;
}

function handleModeClick() {
	if (filling === true) {
		filling = false;
		mode.innerText = "Fill";
	} else {
		filling = true;
		mode.innerText = "Paint";
	}
}

function handleCanvasClick(event) {


	if (filling) {
		ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
	}
}

function handleSaveClick(event) {
	const image = canvas.toDataURL();
	const link = document.createElement("a");
	link.href = image;
	link.download = "PaintJS";
	link.click();
}


function handleResetClick(event) {
	window.location.reload();
}




if (canvas) {
	canvas.addEventListener('mousemove', onMouseMove);
	canvas.addEventListener('mousedown', startPainting);
	canvas.addEventListener('mouseup', stopPainting);
	canvas.addEventListener('mouseleave', stopPainting);
	canvas.addEventListener('click', handleCanvasClick);
}



function handleEraseClick() { 
	// painting = true;
  ctx.strokeStyle = background;
}

Array.from(colors).forEach(potato =>
	potato.addEventListener("click", handleColorClick));

if (range) {
	range.addEventListener("input", handleRangeChange);
}

if (mode) {
	mode.addEventListener('click', handleModeClick);
}



if (saveBtn) {
	saveBtn.addEventListener("click", handleSaveClick);
}

clear.addEventListener('click', handleResetClick);


erase.addEventListener("click", handleEraseClick);
