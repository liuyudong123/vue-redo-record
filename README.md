![](https://ioxz.top/d/645b68a6ebdcf.jpg)
#面向对象的撤销库，支持多对象多属性

##0、引入js
```html
<script src="js/record.js"></script>
```

##1、dom上绑定事件和处理方法
```html
<button @click="set(item,'sex',20)">集体修改name</button>
```

##2、方法中调用start和end
```js
set(item,attr,val){
	record.start([item],[attr]);
	item[attr]=val;
	record.end();
}
```

##3、监控按键调用ctrlz和ctrly方法
```js
$(window).keydown(function(e){
	// 90 ctrl+z
	if(e.ctrlKey&&e.keyCode==90){
		record.ctrlz();
	}
	// 89 ctrl+y
	if(e.ctrlKey&&e.keyCode==89){
		record.ctrly();
	}
})
```