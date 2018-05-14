<template>
    <div style="width: 100%">
        <h3>
            {{ wxMpUser.nickname +' | '+ wxMpUser.country+'-'+wxMpUser.province+'-'+wxMpUser.city}}
        </h3>
        <button @click="getNetworkType">获取网络状态</button>
        <button @click="getLocation">获取地理位置</button>
        <button @click="openAddress">获取微信地址</button>
        <button @click="chooseImage">选择图片</button>
        <button @click="previewImage">预览图片</button>
        <img v-for="imgSrc in imgSrcList" :src="imgSrc"/>
    </div>
</template>

<script>
    import wechat from '../wechat/index'

    export default {
        name: 'HelloWorld',
        data () {
            return {
                // 微信用户信息
                wxMpUser: {
                    city: "",
                    country: "",
                    groupId: null,
                    headImgUrl: '',
                    language: "",
                    nickname: "",
                    openId: "",
                    province: "",
                    remark: null,
                    sex: "男",
                    subscribe: null,
                    subscribeTime: null,
                    tagIds: null,
                    unionId: null
                },
                imgSrcList: []
            }
        },
        created () {
            let this_ = this
            ////////////// 1、授权获取用户信息 //////////////
            wechat.authorize(function (wxMpUser) {
                console.log(wxMpUser)
                this_.wxMpUser = wxMpUser
            }, function (err) {
                console.log(err)
            })
            ////////////// 2、初始化微信配置config //////////////
            wechat.initConfig(function () {
                // 初始化成功
                ////////////// 3、配置微信分享（注：需要在初始化微信配置config成功后才能执行）//////////////
                let options = {
                    shareTitle: '分享到好友的标题xxx',
                    shareDesc: '分享内容xxx',
                    shareLink: window.location.href, // 注：分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致，不然分享配置无效
                    shareImgUrl: '分享的图标'
                }
                wechat.configWechatShare(options, function (res) {
                    // 分享成功回调
                    console.log(res)
                }, function (res) {
                    // 分享取消回调
                    console.log(res)
                })
            }, function (err) {
                // 初始化失败
                console.log(err)
            })
        },
        methods: {
            // 1、获取网络状态
            getNetworkType: function () {
                wechat.getNetworkType(function (res) {
                    alert(res)
                })
            },
            // 2、获取地理位置 经纬度
            getLocation: function () {
                // type: 默认为wgs84的gps坐标，如果要返回直接给openLocation用的(腾讯地图)火星坐标，可传入'gcj02'
                let type = 'gcj02'
                wechat.getLocation(type, function (res) {
                    let latitude = res.latitude   // 纬度，浮点数，范围为90 ~ -90
                    let longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
                    // let speed = res.speed         // 速度，以米/每秒计
                    // let accuracy = res.accuracy   // 位置精度
                    alert(latitude + ':' + longitude)

                    // 3、使用微信内置地图查看位置
                    wechat.openLocation({
                        latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
                        longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
                        name: 'Sam的地盘', // 位置名
                        address: 'Sam的地盘，自己做主。', // 地址详情说明
                        scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
                        infoUrl: 'http://www.magicalsam.com' // 在查看位置界面底部显示的超链接,可点击跳转
                    })

                })
            },
            // 4、共享收货地址，获取微信地址
            openAddress: function () {
                wechat.openAddress(function (res) {
                    var userName = res.userName // 收货人姓名
                    // var postalCode = res.postalCode // 邮编
                    // var provinceName = res.provinceName // 国标收货地址第一级地址（省）
                    // var cityName = res.cityName // 国标收货地址第二级地址（市）
                    // var countryName = res.countryName // 国标收货地址第三级地址（国家）
                    var detailInfo = res.detailInfo // 详细收货地址信息
                    // var nationalCode = res.nationalCode // 收货地址国家码
                    var telNumber = res.telNumber // 收货人手机号码
                    alert(userName + ' ' + telNumber + ' ' + detailInfo)
                })
            },
            // 5、调用微信接口选择图片
            chooseImage: function () {
                let this_ = this
                wechat.chooseImage(1, function (localIds) {
                    // localIds ：返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片，
                    //            但在部分场景下可能无效，此时可以使用getLocalImgData来直接获取数据。

                    // !!! 通过localIds获取本地图片的base64数据，用于img标签显示 !!!
                    wechat.getLocalImgData(localIds, function (imgData) {
                        this_.imgSrcList = imgData
                    })

                })
            },
            // 6、预览图片（微信内置预览图片功能）
            previewImage: function () {
                let currentImg = 'http://oukgvmfjs.bkt.clouddn.com/mma-work-officalsite/adverteditor/b918dee2-f5e4-4b2d-80a9-e1cc5a8d1d22.jpg?imageView2/2/w/830/h/456'
                let imgs = ['http://oukgvmfjs.bkt.clouddn.com/mma-work-officalsite/adverteditor/b918dee2-f5e4-4b2d-80a9-e1cc5a8d1d22.jpg?imageView2/2/w/830/h/456', 'http://oukgvmfjs.bkt.clouddn.com/mma-work-officalsite/adverteditor/77ec3762-d1a5-4666-be87-d8ee308a18e3.jpg?imageView2/2/w/830/h/456', 'http://oukgvmfjs.bkt.clouddn.com/mma-work-officalsite/adverteditor/1d06da24-9b9f-4861-b21c-97fd95ed694f.jpg?imageView2/2/w/830/h/456']
                wechat.previewImage({
                    current: currentImg, // 当前显示图片的http链接
                    urls: imgs // 需要预览的图片http链接列表
                })
            }
        }
    }
</script>
<style scoped>
    button {
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 12px 28px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 12px;
        border-radius: 5px;
        margin: 5px;
    }

    img {
        width: 100%;
        height: auto;
    }
</style>
