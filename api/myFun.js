class PublicFun {
		//复制
		cody(data) {
			uni.setClipboardData({
				data: data,
				success: (res) => {
					uni.showToast({
						icon:'none',
						title: '复制成功'
					})
				},
				fail: err => {
					uni.showToast({
						icon:'none',
						title: '复制失败'
					})
				}
			});
		}
}

export const publicFun = new PublicFun();
