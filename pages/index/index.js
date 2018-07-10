//index.js
//获取应用实例
const app = getApp()
let QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
let qqmapsdk;
var demo = new QQMapWX({
  key: '57EBZ-BVNR4-EPCUR-XMX67-MIFSO-RDBFU' // 必填
});
let bmap = require('../../utils/bmap-wx.js');
var BMap = new bmap.BMapWX({
  ak: 'YGi3dgLGQxPLid9zb7U7s7fuE4M9DYtn'
}); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:"",
    weather_data:[] ,
    nowWeather:'',
    nowDu:'',
    diwen:'',
    deg:'',
    wenther:'',
    fengxiang:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocal();
  },
  // 获取经纬度
  getLocal() {
    let _this = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        _this.getCity(latitude, longitude) ; 
      }
    }) ;
    BMap.weather({
      success: function(res){
        _this.setData({
          weather_data: res.originalData.results[0].weather_data.splice(1, 4),
          nowWeather: res.currentWeather[0].date,
          nowDu: res.currentWeather[0].temperature,
          wenther: res.currentWeather[0].weatherDesc ,
          fengxiang: res.currentWeather[0].wind,
          deg: res.originalData.results[0].index[0].des
        }) ; 
        console.log(res.currentWeather[0]) ; 
        // console.log(_this.data.weather_data, res.originalData.results[0].index[0].des) ; 
      }
    })


  },
  // 获取当前城市
  getCity(latitude, longitude) { 
    let _this = this ; 
    let city = null ; 
    demo.reverseGeocoder({
      location: {
        latitude: latitude ,
        longitude: longitude
      },
      success: function (res) {
        city = res.result.address_component.city ; 
        _this.setData({
          city,
        })
      },
    });
  }
  
})