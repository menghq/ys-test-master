<template>
    <div class=''>
        <h1>这是首页，测试layui</h1>
        <span>(但不推荐vue和layui一起使用。因为layui是底层dom操作，基于jQuery，但是Vue.js并不推荐直接进行底层dom操作)</span>
        <div class="layui-tab layui-tab-card">
            <ul class="layui-tab-title">
                <li class="layui-this">轮播</li>
                <li>动画</li>
                <li>按钮/弹出层</li>
                <li>form表单</li>
                <li>流加载</li>
                <li>导航</li>
            </ul>
            <div class="layui-tab-content" :style="{height:newHeight,'overflow':'auto'}">
                <div class="layui-tab-item layui-show">
                    <div class="layui-carousel" id="test1">
                        <div carousel-item>
                            <div><img src="/static/imgs/Lavender.jpg"></div>
                            <div><img src="/static/imgs/starry-sky.jpg"></div>
                            <div><img src="/static/imgs/starry-sky2.jpg"></div>
                            <div><img src="/static/imgs/starry-sky3.jpg"></div>
                            <div><img src="/static/imgs/starry-sky4.png"></div>
                        </div>
                    </div>
                </div>

                <div class="layui-tab-item">
                    <div class="animbox">
                        <div class="layui-anim layui-anim-rotate"><span>旋转360度</span></div>
                    </div>
                     <div class="animbox">
                        <div class="layui-anim layui-anim-fadein"><span>渐现</span></div>
                    </div>
                     <div class="animbox">
                        <div class="layui-anim layui-anim-scaleSpring"><span>弹簧式放大</span></div>
                    </div>
                    
                    <div class="animbox">
                        <div class="layui-anim layui-anim-rotate layui-anim-loop"><span>循环动画</span></div>
                    </div>    
                </div>

                <div class="layui-tab-item">
                    <button type="button" class="layui-btn" @click="conso">一个标准的按钮</button>
                    <button type="button" class="layui-btn layui-btn-radius layui-btn-normal" @click="baidabtn">百搭按钮</button>
                    <button type="button" class="layui-btn layui-btn-sm layui-btn-radius layui-btn-danger" @click="smbtn">小型警告</button>
                    <button type="button" class="layui-btn layui-btn-xs layui-btn-radius layui-btn-warm" @click="minibtn">迷你暖色</button>
                </div>

                <div class="layui-tab-item">
                    <form class="layui-form" action="">
                    <div class="layui-form-item">
                        <label class="layui-form-label">输入框</label>
                        <div class="layui-input-block">
                        <input type="text" name="title" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">密码框</label>
                        <div class="layui-input-inline">
                        <input type="password" name="password" required lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input">
                        </div>
                        <div class="layui-form-mid layui-word-aux">辅助文字</div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">选择框</label>
                        <div class="layui-input-block">
                        <select name="city" lay-verify="required">
                            <option value=""></option>
                            <option value="0">北京</option>
                            <option value="1">上海</option>
                            <option value="2">广州</option>
                            <option value="3">深圳</option>
                            <option value="4">杭州</option>
                        </select>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">复选框</label>
                        <div class="layui-input-block">
                        <input type="checkbox" name="like[write]" title="写作">
                        <input type="checkbox" name="like[read]" title="阅读" checked>
                        <input type="checkbox" name="like[dai]" title="发呆">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">开关</label>
                        <div class="layui-input-block">
                        <input type="checkbox" name="switch" lay-skin="switch">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">单选框</label>
                        <div class="layui-input-block">
                        <input type="radio" name="sex" value="男" title="男">
                        <input type="radio" name="sex" value="女" title="女" checked>
                        </div>
                    </div>
                    <div class="layui-form-item layui-form-text">
                        <label class="layui-form-label">文本域</label>
                        <div class="layui-input-block">
                        <textarea name="desc" placeholder="请输入内容" class="layui-textarea"></textarea>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-block">
                        <button class="layui-btn" lay-submit lay-filter="formDemo">立即提交</button>
                        <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                        </div>
                    </div>
                    </form>
                </div>

                <div class="layui-tab-item">
                    <fieldset class="layui-elem-field layui-field-title">
                        <legend>信息流 - 手工加载</legend>
                    </fieldset>
                    <ul class="flow-default" style="height: 300px;" id="LAY_demo2"></ul>
                </div>

                <div class="layui-tab-item">
                    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
                        <legend>水平导航菜单</legend>
                    </fieldset>
                        
                    <ul class="layui-nav">
                        <li class="layui-nav-item"><a href="">最新活动</a></li>
                        <li class="layui-nav-item layui-this">
                            <a href="javascript:;">产品</a>
                            <dl class="layui-nav-child">
                            <dd><a href="">选项1</a></dd>
                            <dd><a href="">选项2</a></dd>
                            <dd><a href="">选项3</a></dd>
                            </dl>
                        </li>
                        <li class="layui-nav-item"><a href="">大数据</a></li>
                        <li class="layui-nav-item">
                            <a href="javascript:;">解决方案</a>
                            <dl class="layui-nav-child">
                            <dd><a href="">移动模块</a></dd>
                            <dd><a href="">后台模版</a></dd>
                            <dd class="layui-this"><a href="">选中项</a></dd>
                            <dd><a href="">电商平台</a></dd>
                            </dl>
                        </li>
                        <li class="layui-nav-item"><a href="">社区</a></li>
                    </ul>

                    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
                        <legend>垂直导航菜单</legend>
                    </fieldset>
                    
                    <ul class="layui-nav layui-nav-tree layui-inline" lay-filter="demo" style="margin-right: 10px;">
                        <li class="layui-nav-item layui-nav-itemed">
                            <a href="javascript:;">默认展开</a>
                            <dl class="layui-nav-child">
                            <dd><a href="javascript:;">选项一</a></dd>
                            <dd><a href="javascript:;">选项二</a></dd>
                            <dd><a href="javascript:;">选项三</a></dd>
                            <dd><a href="">跳转项</a></dd>
                            </dl>
                        </li>
                        <li class="layui-nav-item">
                            <a href="javascript:;">解决方案</a>
                            <dl class="layui-nav-child">
                            <dd><a href="">移动模块</a></dd>
                            <dd><a href="">后台模版</a></dd>
                            <dd><a href="">电商平台</a></dd>
                            </dl>
                        </li>
                        <li class="layui-nav-item"><a href="">云市场</a></li>
                        <li class="layui-nav-item"><a href="">社区</a></li>
                    </ul>
                </div>
            </div>
        </div>
       

    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    newHeight:null,
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
   
    this.newHeight=window.innerHeight-262+'px';
    window.onresize = function() {
      this.newHeight=window.innerHeight-262  +'px';
    };
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
 console.log(window.innerHeight,'height')
  //form表单 监听提交
  layui.form.render();
  layui.form.on('submit(formDemo)', function(data){
        layer.msg(JSON.stringify(data.field));
        return false;
    });
  

  //轮播  建造实例
  layui.carousel.render({
    elem: '#test1'
    ,width: '100%' //设置容器宽度
    ,arrow: 'always' //始终显示箭头
    //,anim: 'updown' //切换动画方式
  });

  
  layui.element.render();
  //监听导航点击
  layui.element.on('nav(demo)', function(elem){
    //console.log(elem)
    layer.msg(elem.text());
  });

  
  layui.flow.load({
    elem: '#LAY_demo2' //流加载容器
    ,scrollElem: '#LAY_demo2' //滚动条所在元素，一般不用填，此处只是演示需要。
    ,isAuto: false
    ,isLazyimg: true
    ,done: function(page, next){ //加载下一页
      //模拟插入
      setTimeout(function(){
        var lis = [];
        for(var i = 0; i < 6; i++){
          lis.push('<li><img src="/static/imgs/liuupload.jpg?v='+ ( (page-1)*6 + i + 1 ) +'"></li>')
        }
        next(lis.join(''), page < 6); //假设总页数为 6
      }, 500);
    }
  });
  

},
//方法集合
methods: {
    conso(){
        //layer.msg('这是首页'); 
        layer.confirm('这是首页，测试layui',{
            anim: 1
            ,btn: ['按钮一', '按钮二', '按钮三'] //可以无限个按钮
            ,btn3: function(index, layero){
                //按钮【按钮三】的回调
                layer.msg('按钮3')
            }
            }, function(index, layero){
            //按钮【按钮一】的回调
                layer.msg('按钮1')
            }, function(index){
            //按钮【按钮二】的回调
                layer.msg('按钮2')
            });
    },
    baidabtn(){
        layer.msg('不开心。。', {icon: 5,anim: 3});
    },
    smbtn(){
        layer.open({
            title: '小型警告'
            ,content: '可以填写任意的layer代码'
            ,anim:6
        });
    },
    minibtn(){
        layer.tab({
            anim:2,
            area: ['600px', '300px'],
            tab: [{
                title: 'TAB1', 
                content: '内容1'
            }, {
                title: 'TAB2', 
                content: '内容2'
            }, {
                title: 'TAB3', 
                content: '内容3'
            }]
        });   
    }
    },
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

.animbox{
    display:inline-block;
    width:100px;
    height:100px;
    background:lightblue;
    border-radius:50%;
    text-align:center;
    line-height:100px
}
img{
    width:100%;
    height:100%;
}
/deep/ .layui-form-selectup dl{
    top:0;
    bottom:auto;
}
/deep/ .flow-default li{
    display:inline-block;
    width:48%;
    margin:0 5px 10px 0;
    img{
        width:100%;
    }
}
</style>