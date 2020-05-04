let canvasClock = document.getElementById("clock");
let canvasContext = canvasClock.getContext("2d");		//getContext返回一个对象，该对象提供了用于在画布上绘图的方法和属性
let canvasWidth = canvasContext.canvas.width;
let canvasHeight = canvasContext.canvas.height;
let radius = canvasWidth / 2;
let rem = canvasWidth / 200;

//钟表数字背景
function drawBackground() {
    canvasContext.save();
    canvasContext.translate(radius, radius);        					//移动画布原点到中心点
    canvasContext.beginPath();										//beginPath 开始一条路径，或者重置一条路径
    canvasContext.lineWidth = 8 * rem;									//线条宽度
    canvasContext.arc(0, 0, radius - canvasContext.lineWidth / 2, 0, 2 * Math.PI, false); 		//创建圆形路径s
    canvasContext.stroke();      									//绘制已定义的路径

    //绘制12个数字
    let hourNumber = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    canvasContext.font = 18 * rem + "px Microsoft YaHei";			//设置文本大小
    canvasContext.textAlign = "center";						//设置文本水平对其方式
    canvasContext.textBaseline = "middle";					//设置文本垂直对齐方式
    hourNumber.forEach(function (number, i) {
        let radian = 2 * Math.PI / 12 * i;            		//每个小时的弧度
        let radianX = (radius - 30 * rem) * Math.cos(radian);		//每个小时X坐标
        let radianY = (radius - 30 * rem) * Math.sin(radian);     //每个小时Y坐标
        canvasContext.fillText(number, radianX, radianY);	//绘制“被填充的”文本
    });

    //绘制60个刻度
    for (let i = 0; i < 60; i++) {
        let radian = 2 * Math.PI / 60 * i;
        let x = (radius - 16 * rem) * Math.cos(radian);
        let y = (radius - 16 * rem) * Math.sin(radian);
        canvasContext.beginPath();
        if (i % 5 == 0) {
            canvasContext.fillStyle = "#000";
        }
        else {
            canvasContext.fillStyle = "#ccc";
        }
        canvasContext.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
        canvasContext.fill();
    }
}

//时针
function drawHour(hour, minutes, seconds) {
    canvasContext.save();                        //保存绘画前的画布环境
    canvasContext.beginPath();
    let radianHour = 2 * Math.PI / 12 * hour;
    let radianMinutes = 2 * Math.PI / 12 / 60 * minutes
    let radianSeconds = 2 * Math.PI / 12 / 60 / 60 * seconds;
    canvasContext.rotate(radianHour + radianMinutes + radianSeconds);
    canvasContext.lineWidth = 6 * rem;
    canvasContext.lineCap = "round";
    canvasContext.moveTo(0, 10 * rem);
    canvasContext.lineTo(0, -radius / 2);
    canvasContext.stroke();
    canvasContext.restore();					//还原初始画布环境
}

//分针
function drawMinute(minutes, seconds) {
    canvasContext.save();
    canvasContext.beginPath();
    let radianMinutes = 2 * Math.PI / 60 * minutes;
    let radianSeconds = 2 * Math.PI / 60 / 60 * seconds;
    canvasContext.rotate(radianMinutes + radianSeconds);
    canvasContext.lineWidth = 4 * rem;
    canvasContext.lineCap = "round";
    canvasContext.moveTo(0, 12 * rem);
    canvasContext.lineTo(0, -radius + 30 * rem);
    canvasContext.stroke();
    canvasContext.restore();
}

//秒针
function drawSeconds(seconds) {
    canvasContext.save();
    canvasContext.beginPath();
    canvasContext.fillStyle = "#c14543";
    let radian = 2 * Math.PI / 60 * seconds;
    canvasContext.rotate(radian);
    canvasContext.moveTo(2 * rem, 20 * rem);
    canvasContext.lineTo(-2 * rem, 20 * rem);
    canvasContext.lineTo(-1 * rem, -radius + 18 * rem);
    canvasContext.lineTo(1 * rem, -radius + 18 * rem);
    canvasContext.fill();
    canvasContext.restore();
}

//仿螺丝
function drawDot() {
    canvasContext.save();
    canvasContext.beginPath();
    canvasContext.fillStyle = "#fff";
    canvasContext.arc(0, 0, 2 * rem, 0, 2 * Math.PI, false);
    canvasContext.fill();
    canvasContext.restore();
}

function draw() {
    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    drawBackground();
    drawHour(hour, minutes, seconds);
    drawMinute(minutes, seconds);
    drawSeconds(seconds);
    drawDot();
    canvasContext.restore();
}

draw();
setInterval(draw, 1000);