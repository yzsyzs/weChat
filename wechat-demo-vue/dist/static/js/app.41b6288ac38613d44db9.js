webpackJsonp([1],{NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t("7+uW"),c={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]};var a=t("VU/8")({name:"App"},c,!1,function(e){t("gsu9")},null,null).exports,i=t("/ocq"),r=t("//Fk"),s=t.n(r),u=t("mtWM"),l=t.n(u);l.a.defaults.timeout=1e4,l.a.interceptors.request.use(function(e){return e},function(e){return s.a.reject(e)}),l.a.interceptors.response.use(function(e){return e},function(e){if(console.error(e),e.response)switch(e.response.status){case 401:case 403:return s.a.reject(e.response?e.response:e)}return s.a.reject(e.response.data)});var d=l.a,f=function(e){return d.get("/api/init/authorize?url="+e)},p=function(e){return d.get("/api/init/wxJsapiSignature",{params:{url:e}})},m=t("fxnj"),g=t.n(m),h=function(e,n){var t=window.location.href;f(t).then(function(t){200==t.data.code?e(t.data.wxMpUser):500==t.data.code?window.location.href=t.data.redirect:n(t.data.msg)}).catch(function(e){n(e)})},v=function(e,n){var t=window.location.href;p(t).then(function(t){var o=t.data.wxJsapiSignature;g.a.config({debug:!0,appId:o.appId,timestamp:o.timestamp,nonceStr:o.nonceStr,signature:o.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone","chooseImage","previewImage","uploadImage","downloadImage","getLocation","openLocation","openAddress","scanQRCode"]}),g.a.ready(function(){e()}),g.a.error(function(e){console.log(e),n(e)})}).catch(function(e){console.log(e),n(e)})},w=function(e,n,t){var o=e.shareTitle||"分享到好友的标题xxx",c=e.shareDesc||"分享内容xxx",a=e.shareLink||window.location.href,i=e.shareImgUrl||"shareImg.jpg";g.a.onMenuShareTimeline({title:o,link:a,imgUrl:i,success:function(){n("分享到朋友圈")},cancel:function(){t("取消分享到朋友圈")}}),g.a.onMenuShareAppMessage({title:o,desc:c,link:a,imgUrl:i,type:"link",dataUrl:"",success:function(){n("分享到微信朋友")},cancel:function(){t("取消分享到微信朋友")}}),g.a.onMenuShareQQ({title:o,desc:c,link:a,imgUrl:i,success:function(){n("分享到QQ")},cancel:function(){t("取消分享到QQ")}}),g.a.onMenuShareWeibo({title:o,desc:c,link:a,imgUrl:i,success:function(){n("分享到腾讯微博")},cancel:function(){t("取消分享到腾讯微博")}}),g.a.onMenuShareQZone({title:o,desc:c,link:a,imgUrl:i,success:function(){n("分享到QQ空间")},cancel:function(){t("取消分享到QQ空间")}})},k=function(e,n){g.a.chooseImage({count:e,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(e){var t=e.localIds;n(t)}})},b=function(e,n){!function e(n,t,o){g.a.getLocalImgData({localId:n[0],success:function(c){var a=c.localData;t.push(a),n.splice(0,1),0===n.length?o(t):e(n,t,o)}})}(e,[],n)},x=function(e){g.a.previewImage(e)},I=function(e){g.a.getNetworkType({success:function(n){var t=n.networkType;e(t)}})},M=function(e,n){g.a.getLocation({type:e,success:function(e){n(e)}})},S=function(e){g.a.openLocation(e)},_=function(e){g.a.openAddress({success:function(n){e(n)}})},U={name:"HelloWorld",data:function(){return{wxMpUser:{city:"",country:"",groupId:null,headImgUrl:"",language:"",nickname:"",openId:"",province:"",remark:null,sex:"男",subscribe:null,subscribeTime:null,tagIds:null,unionId:null},imgSrcList:[]}},created:function(){var e=this;h(function(n){console.log(n),e.wxMpUser=n},function(e){console.log(e)}),v(function(){var e={shareTitle:"分享到好友的标题xxx",shareDesc:"分享内容xxx",shareLink:window.location.href,shareImgUrl:"分享的图标"};w(e,function(e){console.log(e)},function(e){console.log(e)})},function(e){console.log(e)})},methods:{getNetworkType:function(){I(function(e){alert(e)})},getLocation:function(){M("gcj02",function(e){var n=e.latitude,t=e.longitude;alert(n+":"+t),S({latitude:n,longitude:t,name:"Sam的地盘",address:"Sam的地盘，自己做主。",scale:15,infoUrl:"http://www.magicalsam.com"})})},openAddress:function(){_(function(e){var n=e.userName,t=e.detailInfo,o=e.telNumber;alert(n+" "+o+" "+t)})},chooseImage:function(){var e=this;k(1,function(n){b(n,function(n){e.imgSrcList=n})})},previewImage:function(){x({current:"http://oukgvmfjs.bkt.clouddn.com/mma-work-officalsite/adverteditor/b918dee2-f5e4-4b2d-80a9-e1cc5a8d1d22.jpg?imageView2/2/w/830/h/456",urls:["http://oukgvmfjs.bkt.clouddn.com/mma-work-officalsite/adverteditor/b918dee2-f5e4-4b2d-80a9-e1cc5a8d1d22.jpg?imageView2/2/w/830/h/456","http://oukgvmfjs.bkt.clouddn.com/mma-work-officalsite/adverteditor/77ec3762-d1a5-4666-be87-d8ee308a18e3.jpg?imageView2/2/w/830/h/456","http://oukgvmfjs.bkt.clouddn.com/mma-work-officalsite/adverteditor/1d06da24-9b9f-4861-b21c-97fd95ed694f.jpg?imageView2/2/w/830/h/456"]})}}},j={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticStyle:{width:"100%"}},[t("h3",[e._v("\n    "+e._s(e.wxMpUser.nickname+" | "+e.wxMpUser.country+"-"+e.wxMpUser.province+"-"+e.wxMpUser.city)+"\n  ")]),e._v(" "),t("button",{on:{click:e.getNetworkType}},[e._v("获取网络状态")]),e._v(" "),t("button",{on:{click:e.getLocation}},[e._v("获取地理位置")]),e._v(" "),t("button",{on:{click:e.openAddress}},[e._v("获取微信地址")]),e._v(" "),t("button",{on:{click:e.chooseImage}},[e._v("选择图片")]),e._v(" "),t("button",{on:{click:e.previewImage}},[e._v("预览图片")]),e._v(" "),e._l(e.imgSrcList,function(e){return t("img",{attrs:{src:e}})})],2)},staticRenderFns:[]};var y=t("VU/8")(U,j,!1,function(e){t("odmx")},"data-v-994efdcc",null).exports;o.a.use(i.a);var Q=new i.a({mode:"history",routes:[{path:"/",name:"HelloWorld",component:y}]});o.a.config.productionTip=!1,new o.a({el:"#app",router:Q,components:{App:a},template:"<App/>"})},gsu9:function(e,n){},odmx:function(e,n){}},["NHnr"]);
//# sourceMappingURL=app.41b6288ac38613d44db9.js.map