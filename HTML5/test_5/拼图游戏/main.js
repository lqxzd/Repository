let tileArray = new Array(); //存储切片的二维数组
let img = new Image();//在画布中要绘制的图片
let imgSize = 300; //图片大小
let ctx;//画笔
let emptyObj = new Object();//空白图片
let tilelen;//切片大小
let minute = document.getElementById("minute");
let second = document.getElementById("second");
let gameTime = null;
let time = 0;

img.src="./image/pintu.jpg"

//计时器
function timer(){
    time += 1;//每秒加1
    let min = parseInt(time / 60);//计算分钟数
    let sec = time % 60;//计算秒

    if (sec < 10) {
        second.innerText = "0" + sec;
    } else {
        second.innerText = sec;
    }

    if (min < 10) {
        minute.innerText = "0" + min;
    } else {
        minute.innerText = min;
    }
}

//游戏准备
function ready() {
    let puzzle = document.getElementById("puzzle"); //获得canvas标签
    ctx = puzzle.getContext("2d");
    
}

//根据游戏级别初始化
function initGame(num) {

    //开始计时
    clearInterval(gameTime);
    time=0;
    gameTime = setInterval(timer,1000);

    //将原图片坐标存入二维数组
    for (let i = 0; i < num; i++) {
        tileArray[i] = new Array(); //行
        for (let j = 0; j < num; j++) {
            let obj = new Object(); //定义一个对象
            obj.x = i;
            obj.y = j;
            tileArray[i][j] = obj; //列
        }
    }

    //得到切片大小
    tilelen = imgSize / num;

    //对二维数组切片进行随机排列
    shuffle();

    //判断随机之后的拼图是否有解，如果有解就绘制，如果无解重新排列
    let solved = workabel();
    if (solved) {
        //按照二维数组绘制图片到画布
        redraw();
    } else {
        initGame(num);
    }
    //按照二维数组绘制图片到画布
    redraw();
}

//随机排列二维数组
function shuffle() {
    let num = tileArray.length; //二维数组的长度
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            //获取随机位置
            let ri = Math.floor(Math.random() * num);
            let rj = Math.floor(Math.random() * num);
            //当前ij元素交换位置
            let t = tileArray[i][j];
            tileArray[i][j] = tileArray[ri][rj];
            tileArray[ri][rj] = t;
        }
    }
    //找到左上角(0,0)的位置设为空白，而且保证切片在正确的位置上
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            //如果横纵坐标都为0，则与数组里的(0,0)交换位置，确保左上角对应左上角
            if (tileArray[i][j].x == 0 && tileArray[i][j].y == 0) {
                let t = tileArray[i][j];
                tileArray[i][j] = tileArray[0][0];
                tileArray[0][0] = t;
                break;
            }
        }
    }
    //标记(0,0)为空白图片，画布中(i,j)坐标
    emptyObj.i = 0;
    emptyObj.j = 0;
}


//重新绘制图片
function redraw() {
    let num = tileArray.length; //二维数组的长度
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            //原图片的坐标
            let curimg = tileArray[i][j];//得到真实图片的坐标
            //绘制一个小切片
            ctx.drawImage(img, curimg.x * tilelen, curimg.y * tilelen, tilelen, tilelen, i * tilelen, j * tilelen, tilelen, tilelen);
        }
    }
    ctx.clearRect(0, 0, imgSize, imgSize);
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            //原图片的坐标
            let curimg = tileArray[i][j];//得到真实图片的坐标
            //设置当前图片如果为空白的话就不绘制
            if (i == emptyObj.i && j == emptyObj.j) {

            } else {
                //绘制一个小切片
                ctx.drawImage(img, curimg.x * tilelen, curimg.y * tilelen, tilelen, tilelen, i * tilelen, j * tilelen, tilelen, tilelen);
            }
        }
    }
}

function move(e) {
    //获得点击的位置，获得下标
    let ci = Math.floor(e.offsetX / tilelen);
    let cj = Math.floor(e.offsetY / tilelen);
    //如果点击的切片与空白相邻，则与空白交换位置。
    //要么横坐标一样要么纵坐标一样，两坐标分别相减等于1则相邻
    if (Math.abs(ci - emptyObj.i) + Math.abs(cj - emptyObj.j) == 1) {
        let t = tileArray[ci][cj];
        tileArray[ci][cj] = tileArray[emptyObj.i][emptyObj.j];
        tileArray[emptyObj.i][emptyObj.j] = t;
        //修改空白图片的坐标
        emptyObj.i = ci;
        emptyObj.j = cj;
        //重新绘图
        redraw();
    }
    let success = isSuccess();
    //如果success为true则重新绘制整张图
    if (success) {
        ctx.drawImage(img, 0, 0, imgSize, imgSize, 0, 0, imgSize, imgSize);
        //加文字
        ctx.font = 'bold 50px 宋体'; //字体样式
        ctx.fillStyle = 'red'; //字体颜色
        ctx.fillText("游戏成功", 50, 150); //文字内容，位置
        clearInterval(gameTime);
    }
}
//判断游戏是否完成
function isSuccess() {
    let num = tileArray.length;
    let success = true;
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            //当前ij与tileArray[i][j]存储元素完全相同，则完成；如果有一个不一样则返回false
            if (tileArray[i][j].x != i || tileArray[i][j].y != j) {
                success = false;
                break;
            }
        }
    }
    return success;
}

//判断拼图是否有解
function workabel() {
    let num = tileArray.length;
    let arr1 = new Array();
    //将二维数组坐标转换为数字存入一维数组
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            let ri = tileArray[i][j].x;
            let rj = tileArray[i][j].y;
            arr1.push(ri * num + rj);
        }
    }
    //求arr1的逆序数
    let total = 0;
    for (let i = 0; i < num * num; i++) {
        for (let j = i + 1; j < num * num; j++) {
            if (arr1[i] > arr1[j]) { total++; }
        }
    }
    if (total % 2 == 0) {
        return true;
    } else {
        return false;
    }
}