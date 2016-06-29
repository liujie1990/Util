;(function(win, lib) {
    var doc = win.document;//获取到document
    var docEl = doc.documentElement;//获取到html
    var metaEl = doc.querySelector('meta[name="viewport"]');//获取到视口标签
    var flexibleEl = doc.querySelector('meta[name="flexible"]');//获取手动设置的meta来控制dpr值
    var dpr = 0;//设备缩放比
    var scale = 0;//屏幕缩放比
    var tid;//定时器变量
    var flexible = lib.flexible || (lib.flexible = {});

    //如果这个标签存在
    if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        // console.log(match);
        if (match) {
            scale = parseFloat(match[1]);
            // console.log(scale);
            dpr = parseFloat(1 / scale);//两者是倒数关系
            // console.log(dpr);
        }
    } else if (flexibleEl) {
        /*
        这里是判断是否存在手动设置的meta标签
        其中initial-dpr会把dpr强制设置为给定的值。如果手动设置了dpr之后，不管设备是多少的dpr，都会强制认为其dpr是你设置的值。
        在此不建议手动强制设置dpr，因为在Flexible中，只对iOS设备进行dpr的判断，对于Android系列，始终认为其dpr为1。
         */
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }
    /*
    在Flexible中，只对iOS设备进行dpr的判断，对于Android系列，始终认为其dpr为1。
     */
    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;//获取设备缩放比
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;//scale和dpr成倒数关系
    }
    //给html标签设置自定义属性data-dpr
    docEl.setAttribute('data-dpr', dpr);
    //通过JS来动态改写meta标签
    //如果不存在metaEl，则动态创建meta标签
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    //刷新当前页面的rem基准值
    function refreshRem(){
        //获取设备的宽度
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 540) {
            width = 540 * dpr;
        }
        var rem = width / 10;//Flexible会将视觉稿分成100份（主要为了以后能更好的兼容vh和vw）
        // console.log(rem);
        //设置html元素的字体大小作为基准值
        docEl.style.fontSize = rem + 'px';
        //当前页面的rem基准值
        flexible.rem = win.rem = rem;
    }
    //监听resize事件
    //当设备屏幕尺寸发生变化时，更新当前页面的rem基准值
    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    //监听pageshow事件
    /*
    火狐和Opera有一个特性，名叫"往返缓存"(back-forward cache,或bfcache),可以在用户使用浏览器的"后退"
    和"前进"按钮时加快页面的转换速度。这个缓存中不仅保存着页面数据，还保存了DOM和JavaScript的状态;
    实际上是将整个页面都保存在了内存里。如果页面位于bfcache中，那么再次打开该页面时就不会触发load事件。
    此外，火狐还提供了一些新事件：
    pageshow事件：这个事件在页面显示时触发，无论该页面是否来自bfcache。在重新加载的页面中，pageshow
    会在load事件触发后触发；而对于bfcache中的页面，pageshow会在页面状态完全恢复的那一刻触发。
    另外要注意：虽然这个事件的目标是document，但必须将其事件处理程序添加到window.
    pageshow事件的event对象还包含一个名为persisted的布尔值属性。如果页面被保存在了bfcache中，则这个属性的
    值为true，否则这个属性值为false
     */
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);
    /*
    window的load事件会在页面中的一切都加载完毕时触发，但这个过程可能会因为要加载的外部
    资源过多而颇费周折。而DOMContentLoaded事件则在形成完整的DOM树之后就会触发，不理会
    图片、js文件、css文件或者其他资源是否已经下载完毕。与load事件不同，DOMContentLoaded支持在
    页面下载的早期添加事件处理程序，这就意味着用户能够尽早地与页面进行交互。

    document.readyState:返回当前文档的状态
    uninitialized - 还未开始载入
    loading - 载入中
    interactive - 已加载，文档与用户可以开始交互
    complete - 载入完成
     */
    if (doc.readyState === 'complete') {
        // alert("readyState");
        //根据不同的dpr来设置不同的字体大小
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
        	// alert("DOMContentLoaded");
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }

    refreshRem();//刷新当前页面的rem基准值
    //flexible.dpr是当前页面的dpr值
    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    //把rem转换为px
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    //把px转换为rem
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }
})(window, window['lib'] || (window['lib'] = {}));
/*
匿名函数自执行
避免重复定义
window['lib'] || (window['lib'] = {}) --> 如果lib已经定义（window['lib']能获取到），就传这个lib
如果没有定义就给lib赋值空对象，并传入lib

这个时候在flexible.js里面的lib其实就已经是window.lib了（js中对象按引用传递）
 */
