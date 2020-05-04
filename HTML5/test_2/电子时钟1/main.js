function Time(bom, use24) {
    this.Bom = Array.from(bom);
    this.format = use24;
    this.classList = ['visible', 'near1', 'near2', 'near3', 'far1', 'far2', 'far3'];
    this.creatDom();
    this.setTime();
}
//生成dom元素
Time.prototype.creatDom = function () {
    for (let i = 0; i < 6; i++) {
        let odiv = "<div class='item'>" + i + "</div>";
        $('.six').append(odiv);
    }
    for (let i = 0; i < 10; i++) {
        let idiv = "<div class='item'>" + i + "</div>";
        $('.ten').append(idiv);
    }
}
//设置当前时间到页面
Time.prototype.setTime = function () {
    let self = this;
    setInterval(function () {
        let presentTime = self.getTime();
        self.Bom.forEach((ele, index) => {
            var n = +presentTime[index];
            var offset = n * 86;
            $(ele).css({
                marginTop: -43 - offset + 'px'
            })
            Array.from(ele.children).forEach(function (ele1, index1) {
                $(ele1).attr('class', self.getClassName(n, index1));
            })
        })
    }, 500)
}
Time.prototype.getClassName = function (n, i) {
    let className = this.classList.find(function (item, index) {
        return i - index === n || i + index === n;
    })
    // console.log(className)
    return className || 'none';
}
//获取当前时间并处理
Time.prototype.getTime = function () {
    let Data = new Date();
    let timeArr = [];
    let timeStr = '';
    timeArr.push(this.format ? Data.getHours() : Data.getHours() % 12 || 12, Data.getMinutes(), Data.getSeconds());
    timeStr = timeArr.reduce(function (p, n) {
        return p + ('0' + n).slice(-2);
    }, '');
    return timeStr;
}
new Time($('.column'), true);