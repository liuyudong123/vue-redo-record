/***
面向对象的撤销库，支持多对象多属性

1、dom上绑定事件和处理方法

<button @click="set(item,'sex',20)">集体修改name</button>


2、方法中调用start和end

set(item,attr,val){
	record.start([item],[attr]);
	item[attr]=val;
	record.end();
}


3、监控按键调用ctrlz和ctrly方法

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
***/

var record = {
	// 存记录，通过start和end成对出现，保证这个数组的记录数量一定要是双数
	history: [],
	// 记录索引
	history_index: 0,
	// 缓存start函数的参数，供end函数使用
	temp_param: null,
	// 更新索引
	updateHistoryIndex() {
		this.history_index = this.history.length;
	},
	/***
	改前 调用此方法缓存一道改前的数据
	改后 再次调用此方法相同的参数和方法再一次将改过后的属性缓存
	@param obj_arr[obj, obj] 要处理的对象数组
	@param temp_attr ["name","sex"] 要缓存的对象属性
	@return [{obj:obj1,attr:{name:1,sex:2}},{obj:obj2,attr:{name:2,sex:3}}]
	*/
	start(obj_arr, temp_attr, is_end) {

		// 缓存参数
		this.temp_param = is_end ? null : arguments;

		// 中途修改需要断尾
		if (this.history_index != this.history.length) {
			var start_address = this.history_index;
			this.history.splice(start_address, this.history.length - start_address);
		}

		// 提取指定的属性
		var temp_arr = [];
		obj_arr.forEach((o, i) => {
			var attrs = {};
			temp_attr.forEach((o1, i1) => {
				attrs[o1] = o[o1];
			})
			temp_arr.push({
				obj: o,
				attr: attrs
			});
		});

		// 入堆
		this.history.push(temp_arr);

		// 更新长度
		this.updateHistoryIndex();

		// 将结果返回
		return temp_arr;
	},
	// 用来给start的收尾的
	end() {
		this.start(...this.temp_param, true);
	},
	// 撤销
	ctrlz() {
		if (this.history_index != 0) {
			this.history_index -= 2;
			var history = this.history[this.history_index];
			history.forEach((o, i) => {
				for (var key in o.attr) {
					o.obj[key] = o.attr[key];
				}
			})
		}
	},
	// 重做
	ctrly() {
		if (this.history_index < this.history.length) {
			this.history_index += 2;
			var history = this.history[this.history_index - 1];
			history.forEach((o, i) => {
				for (var key in o.attr) {
					o.obj[key] = o.attr[key];
				}
			})
		}
	}
};