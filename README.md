![](https://ioxz.top/d/645b68a6ebdcf.jpg)

# 面向对象的撤销库，支持多对象多属性

## 0、引入js
```html
<script src="js/record.js"></script>
```

## 1、dom上绑定事件和处理方法
```html
<button @click="set(item,'sex',20)">集体修改name</button>
```

## 2、方法中调用start和end
```js
set(item,attr,val){
	record.start([item],[attr]);
	item[attr]=val;
	record.end();
}
```

## 3、监控按键调用ctrlz和ctrly方法
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

# 方法

## start
`start(obj_arr Array, temp_attr Array, is_end Boolean)`

### obj_arr Array
对象，指要缓存哪些对象

### temp_attr Array
属性数组，指要缓存对象的哪些属性

## end
跟start方法同根生

## ctrlz
键盘事件中使用

## ctrly
键盘事件中使用

# 注意
start方法中的obj_arr的目标是对象，结合vue框架类似的属性驱动，用起来才方便。
