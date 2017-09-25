require('../style/index.scss');

//暂时放一下
require('../../article/demo/select/select.scss');


//这个只能load静态html
//var catalogTpl = require('../html/catalog.html');
//console.log(catalogTpl);

//构建目录,获取静态目录数据和ejs模板结合、这个可以load静态ejs且传入参数
var catObj = require('../../catalog.json');
var ejs = require('../html/catalog.ejs');
$('.catalog').html(ejs({catObj: catObj}));

var hljs = require('highlight.js');
var markdownit = require('markdown-it');
var md = markdownit({
    html: true,
    highlight: function (str, lang) {
        //console.log(str, "----------", lang);
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs doc-code"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) {
            }
        }
        return '<pre class="hljs doc-code"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});
$(function () {
    //页面在离开之前，记住右侧处置滚动条的位置
    window.onbeforeunload = function () {
        sessionStorage.rightDivScrollHeight = $('.right').scrollTop();
    };
    //初始化的时候绑定左侧目录点击事件以及初始回选择
    $('.cat-item span').on('click', function (event, needScrollToYScrollPosition) {
        var $this = $(this);
        if (!$this.hasClass('active')) {
            console.log('需要返回原来的位置吗：', needScrollToYScrollPosition ? "需要" : '不需要');
            var deferred = $.get('./article/md/' + $this.data('url'));
            deferred.done(function (data) {
                //加载md文件
                $('.right').html(md.render(data));
                //加载md里面指定的demo html
                var deferredList = $('.right div[data-html-url]').map(function () {
                    var $this = $(this);
                    return $.get($this.data('htmlUrl')).done(
                        function (pageCode) {
                            console.log('执行ajax done:', $this.data('htmlUrl'));
                            var code = '```html\n' + pageCode + '\n```\n';
                            $this.html(pageCode);
                            $this.append(md.render(code));
                        }
                    );
                });
                $.when(deferredList[0], deferredList[1], deferredList[2]).then(function () {
                    console.log('都执行完了!');
                    //记录返回的位置
                    if (needScrollToYScrollPosition) {
                        console.log('原来的位置是：', sessionStorage.rightDivScrollHeight);
                        $('.right').scrollTop(sessionStorage.rightDivScrollHeight);
                    }
                });
            });

            //移除原来的激活span上的样式
            $('.cat-item span').removeClass('active');
            //添加当前激活span上的样式
            $this.addClass('active');
            //记录当前激活索引
            sessionStorage.currentIndex = $this.data('index');
        }
    });

    $('.cat-item span[data-index="' + (sessionStorage.currentIndex || 1) + '"]').trigger('click', [true]);


    //处理右下角小火箭返回顶部效果
    var $backTop = $('.back-top');
    $backTop.on('click', function () {
        $('.right').animate({"scrollTop": '0px'}, 1000);
        return false;
    });
    $('.right').scroll(function () {
        var $this = $(this), scrollHeight = $this.scrollTop();
        if (scrollHeight > 100) {
            $backTop.addClass('show');
        } else {
            $backTop.removeClass('show');
        }
    });

});









