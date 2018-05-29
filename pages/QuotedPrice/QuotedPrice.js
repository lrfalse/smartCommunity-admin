//获取应用实例
const app = getApp()

Page({
  data: {
    // 菜单obj
    order:{
      state: '未计算',
      time: '2017-11-06',
      mainOrder: 'BJ20171101-0000001',
      childrenOrder: 'BJ20171101-0000001',
      technics: [
        {
          text: '覆膜',
          checked: false,
        }, {
          text: 'UV',
          checked: false,
        }, {
          text: '骑马订',
          checked: false,
        }, {
          text: '胶订',
          checked: false,
        }, {
          text: '锁线',
          checked: false,
        }, {
          text: '烫金',
          checked: false,
        }, {
          text: '模切',
          checked: false,
        }, {
          text: '对裱',
          checked: false,
        },
      ],
    },
    // 图文obj
    picther: {
      checked: false,
      title: '图文制作费',
      option: [
        '画册1',
        '画册2',
        '画册3',
      ],
      selected: '画册1',
      price: '',
      number:'',
      total: '',
    },
    
  },
  // 工艺选择
  technicSelect(e){
    console.log(e)
  },
  // 图文类 选择
  bindPickerChange(e){
    let value = this.data.picther.option[e.detail.value]
    this.data.picther.selected = value
    this.setData({
      picther: this.data.picther
    })
  },

  // 转发
  onShareAppMessage() {
    return {
      title: '印刷报价器',
      path: '/pages/QuotedPrice/QuotedPrice',
      success(e) {
        console.log(1212)
      }
    }
  },
})