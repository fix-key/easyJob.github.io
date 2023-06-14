/**
 *
 * @authors Your Name (you@example.org)
 * @date    2022-02-24 00:41:43
 * @version $Id$
 */

function animate(obj, target, callback) {
    // 先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 步长值写到定时器的里面
        // 把我们步长值改为整数 不要出现小数的问题
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - window.pageYOffset) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (parseInt(window.pageYOffset) == target) {
            // 停止动画 本质是停止定时器
            clearInterval(obj.timer);
            // 回调函数写到定时器结束里面
            // if(callback){
            //     callback();
            // }
            callback && callback();
        }
        // 把每次加1 这个步长值改为一个慢慢变小的值 步长公式：（目标值 - 现在的位置）/ 10
        // obj.style.left = window.pageYOffset + step + 'px';
        window.scroll(0, window.pageYOffset + step);
    }, 15);
}