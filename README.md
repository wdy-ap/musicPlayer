![图片没有显示吗？]( /pics/readme1.png )
## 功能
* 单曲循环、顺序播放、随机播放
* 播放列表切歌
* 专辑封面图旋转

### 功能实现
#### 单曲循环、顺序播放、随机播放
> 当界面处于单曲模式时，ended事件执行重复播放，“上一首”和“下一首”按钮执行顺序播放；
> 当界面处于顺序播放模式时，ended和“上一首”、“下一首”按钮执行顺序播放
> 当界面处于随机播放模式时，ended和“上一首”、“下一首”按钮执行随机播放
#### 播放列表切歌
> 点击播放列表，根据当前序号显示高亮、切换歌曲资源和歌曲信息
#### 专辑封面图旋转
> 在每一个“播放方法”执行后，为封面图的元素用keyframes增加一个动画
#### 重叠(封装)的功能
* 检查当前界面的模式（单曲or顺序or随机），以备给“button的click事件”以及“audio的ended事件”提供支持<br>
* 歌曲被切换时，整个页面（播放列表高亮、包括歌曲src、当前播放歌曲信息）的切换、歌曲播放、专辑封面图旋转<br>
* 根据传入的序号，结合当前序号，引导页面的改变<br>
<br>    * 结合下图构思代码的传承和封装
<br>![图片没有显示吗？]( /pics/readme2.png )
