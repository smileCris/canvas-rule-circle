//index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    progress_txt: '计算中...',
    progress_num: '',
    count: 0, // 设置 计数器 初始为0
    countTimer: null, // 设置 定时器 初始为null
    showModal: false,
    value: 60.0,
    val: 60.0,
    styles: {
      line: '#fedfdf',
      bginner: '#fdfdfd',
      bgoutside: '#fdfdfd',
      lineSelect: '#ff7e7c',
      font: '#ffa5a5'
    },
    bgImg: '',
    canvasImg: ''
  },

  // 轨道圆环
  drawProgressbg: function() {
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.setLineWidth(4); // 设置圆环的宽度
    ctx.setStrokeStyle('#fdb6ba'); // 设置圆环的颜色
    ctx.setLineCap('round') // 设置圆环端点的形状
    ctx.beginPath(); //开始一个新的路径
    ctx.arc(85, 85, 66, 0, 2 * Math.PI, false);
    //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx.stroke(); //对当前路径进行描边
    ctx.draw();
  },

  // 转圈动画
  drawCircle: function(step) {
    var context = wx.createCanvasContext('canvasProgress');
    // 设置渐变
    var gradient = context.createLinearGradient(200, 100, 100, 200);
    gradient.addColorStop("0", "#fdb6ba");
    gradient.addColorStop("0.3", "#fe9191");
    gradient.addColorStop("1", "#ff7e7c");

    context.setLineWidth(10);
    context.setStrokeStyle(gradient);
    context.setLineCap('round')
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(85, 85, 66, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw();
  },

  countInterval: function() {
    this.setData({
      progress_txt: '计算中...',
      progress_num: '',
      count: 0,
      // canvasImg: '',
      // bgImg: ''
    })
    this.data.count = 0 // init data
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时2秒绘一圈
    this.countTimer = setInterval(() => {
      if (this.data.count <= 20) {
        /* 绘制彩色圆环进度条  
        注意此处 传参 step 取值范围是0到2，
        所以 计数器 最大值 20 对应 2 做处理，计数器count=20的时候step=2
        */
        this.drawCircle(this.data.count / (20 / (2 * this.data.value / 100)))
        this.data.count++;
      } else {
        this.setData({
          progress_txt: "已完成",
          progress_num: this.data.value,
          val: this.data.value
        });
        clearInterval(this.countTimer);
        this.handleCanvarToImg(this, 'canvasProgressbg', 1);
        this.handleCanvarToImg(this, 'canvasProgress', 2);
      }
    }, 100)
  },

  // 画布转图片
  handleCanvarToImg(that, canvasId, imgData) {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 170,
      height: 170,
      canvasId: canvasId,
      success: function(res) {
        imgData == 1 ?
          that.setData({
            bgImg: res.tempFilePath
          }) :
          that.setData({
            canvasImg: res.tempFilePath
          });
      }
    });
  },

  // 标尺
  bindvalue: function(e) {
    this.setData({
      value: e.detail.value
    })
  },

  changeModal: function() {
    this.setData({
      showModal: !this.data.showModal
    })
  },

  submitGoal: function() {
    console.log(this.data.value)
    this.setData({
      bgImg: '',
      canvasImg: ''
    })
    this.changeModal();
    this.drawProgressbg();
    this.countInterval();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.drawProgressbg();
    // this.drawCircle(1.5);
    this.countInterval();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})