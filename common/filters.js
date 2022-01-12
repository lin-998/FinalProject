/**
* 数据脱敏
* @param {Object} e
* @param {Object} start 前面保留几个字符串
* @param {Object} end 后面保留几个字符串
*/
function numFilter(num, places){
	if(!num)return '0.0000';
	let num1 = num+''
	num1 = num1.split('.')
	if(num1.length==1)return num1[0];
	return num1[0]+'.'+num1[1].substring(0,places)
}
function percent(num){
	if(!num){return '0.0'}
	let num1 = num+''
	num1 = num1.split('.')
	if(num1.length==1)return num1[0];
	num=num1[0]+'.'+num1[1].substring(0,4)
	return (Math.floor(num * 10000) / 100).toFixed(2)
}
function sizeMB(size){
	if(size<1024){
		return size+'B'; 
	}else if(size/1024>=1 && size/1024/1024<1){
		return Math.floor(size/1024*100)/100+'KB';
	}else if(size/1024/1024>=1){
		return Math.floor(size/1024/1024*100)/100+'MB';
	}
}
export default {
	numFilter,
	percent,
	sizeMB
}
// export const numFilter= {
// 	radixPoint(num, places) {
// 		if(!num)return '0.0000';
// 		let num1 = num+''
// 		num1 = num1.split('.')
// 		if(num1.length==1)return num1[0];
// 		return num1[0]+'.'+num1[1].substring(0,places)
// 	}
// }