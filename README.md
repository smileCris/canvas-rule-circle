### 主要难点
1. 转圈圈动画 参考文章 [戳我](https://blog.csdn.net/wangqin2734/article/details/79347273)
2. 刻度尺实现 参考开源插件 [戳我](https://github.com/mehaotian/wx-scale)
3. 解决canvas层级问题，因为最上层用到了刻度尺，[cover-view](https://developers.weixin.qq.com/miniprogram/dev/component/cover-view.html)不可用。故在canvas画布画完的时候转换为图片，选择变量重绘时再转为canvas画布，重绘完成就替换为图片。

### 实现效果
<video autoplay loop muted width="300">
	<source id="mp4" src="https://files.catbox.moe/jja89b.mp4" type="video/mp4">
</video>
