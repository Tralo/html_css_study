window.onload = function(){
	waterfall('main','box');
	var dataInt = {"data":[{"src":"51.jpg"},{"src":"52.jpg"},
		{"src":"53.jpg"},{"src":"54.jpg"},
		{"src":"55.jpg"},{"src":"56.jpg"},
		{"src":"57.jpg"},{"src":"58.jpg"},
		{"src":"59.jpg"},{"src":"60.jpg"}]};
	window.onscroll = function(){
		var oParent = document.getElementById('main');
		if(checkScrollSlide()){
			//将数据快渲染到当前面的尾部
			for(var i = 0; i < dataInt.data.length; i++){
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = "images/" + dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
			
		}
	};
};

function waterfall(parentId,className){
	//将main下的所有class为box的元素取出来
	var oParent = document.getElementById(parentId);

	var oBoxs = getByClass(oParent,className);
	//console.log(oBox.length);
	// 计算整个页面的页数(页面宽/box的宽度)
	var oBoxW = oBoxs[0].offsetWidth;
	//consol e.log(oBoxW);
	var cols = Math.floor(document.documentElement.clientWidth / oBoxW);
	//设置main的宽度
	//console.log(cols);
	oParent.style.cssText = 'width:' + oBoxW * cols + 'px;margin:0 auto';
	var hArr = [];
	for(var i = 0; i < oBoxs.length; i++){
		if(i < cols){
			hArr.push(oBoxs[i].offsetHeight);
		} else {
			var minH = Math.min.apply(null,hArr);
			var index = getMinhIndex(hArr,minH);
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = minH + 'px';
			//oBoxs[i].style.left = oBoxW * index + 'px';
			oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';
			hArr[index] += oBoxs[i].offsetHeight;
		}
	}
	console.log(hArr);
}
//根据class获取元素
function getByClass(parent,clsName){
	var boxArr = new Array();//用来存储获取到的所有class为box元素
	var oElments = parent.getElementsByTagName("*");
	for(var i = 0; i < oElments.length; i++){
		if(oElments[i].className == clsName){
			boxArr.push(oElments[i]);
		}
	}
	return boxArr;
}
function getMinhIndex(arr,val){
	for(var i in arr){
		if(arr[i] == val){
			return i;
		}
	}
}

// 检测是否加载了数据块的加载条件
function checkScrollSlide(){
	var oParent = document.getElementById('main');
	var oBoxs = getByClass(oParent,'box');
	var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop +Math.floor(oBoxs[oBoxs.length - 1].offsetHeight / 2);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	// console.log("scrollTop: " +scrollTop);
	var height = document.body.clientHeight || document.documentElement.clientHeight;
	console.log("height: " +height);
	return (lastBoxH < scrollTop + height) ? true : false;
}


