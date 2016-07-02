function myReady(fn){//fn是domready的回调函数
    //对于现代浏览器，对DOMContentLoaded事件的处理采用标准的事件绑定方式
    if ( document.addEventListener ) {
        document.addEventListener("DOMContentLoaded", fn, false);//false表示在冒泡阶段捕获
    } else {
        IEContentLoaded(fn);//针对ie低版本浏览器
    }
    //IE模拟DOMContentLoaded
    function IEContentLoaded (fn) {
        var d = window.document;//获取document对象(缓存document对象)
        var done = false;//标记变量--为了保证domready回调只执行一次
        //只执行一次用户的回调函数init()
        var init = function () {
            if (!done) {
                done = true;
                fn();//调用domready回调
            }
        };

        (function () {
            try {
                // DOM树未创建完之前调用doScroll会抛出错误
                d.documentElement.doScroll('left');
            } catch (e) {
                //延迟再试一次~
                setTimeout(arguments.callee, 50);//arguments.callee指向当前的函数
                return;//利用return实现递归
            }
            // 没有错误就表示DOM树创建完毕，然后立马执行用户回调
            init();
        })();//立即执行的函数表达式

        //监听document的加载状态
        //d就是缓存的document对象
        d.onreadystatechange = function() {
            // 如果用户是在domReady之后绑定的函数，就立马执行
            if (d.readyState == 'complete') {//判断是否加载完毕
                d.onreadystatechange = null;//清除onreadystatechange()事件
                init();
            }
        }
    }
}
