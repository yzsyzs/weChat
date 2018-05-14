package com.sam.controller;

import me.chanjar.weixin.common.bean.WxJsapiSignature;
import me.chanjar.weixin.common.exception.WxErrorException;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.bean.result.WxMpUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * @author sam
 * @since 2017/9/6
 */
@RestController
@RequestMapping("/api/init")
public class InitController {

    @Autowired
    private WxMpService wxMpService;

    /**
     * 初始化信息，微信授权
     *
     * @param request
     * @return
     */
    @GetMapping("/authorize")
    public Map authorize(HttpServletRequest request, String url) throws WxErrorException {

        Map map = new HashMap(5);

        String ua = request.getHeader("user-agent")
                .toLowerCase();
        // 判断是否微信浏览器
        if (ua.indexOf("micromessenger") > 0) {
            // 判断session中是否存在用户信息
            WxMpUser wxMpUser = (WxMpUser) request.getSession().getAttribute("wxMpUser");
            if (wxMpUser == null) {
                map.put("code", 500);
                map.put("msg", "没有获取微信授权");
                map.put("redirect", "/api/wechat/authorize?returnUrl=" + url);
                return map;
            } else {
                map.put("code", 200);
                map.put("msg", "获取成功");
                // 微信用户信息
                map.put("wxMpUser", wxMpUser);
                return map;
            }
        } else {
            // 错误 请在微信中打开
            map.put("code", 501);
            map.put("msg", "请在微信中打开");
            return map;
        }
    }

    /**
     * 获取 权限验证配置
     *
     * @param url 需要获取权限验证配置的url（当前网页的URL，不包含#及其后面部分）
     * @return
     * @throws WxErrorException
     */
    @GetMapping("/wxJsapiSignature")
    public Map wxJsapiSignature(String url) throws WxErrorException {
        Map map = new HashMap(3);
        // js-sdk需要的配置信息
        WxJsapiSignature wxJsapiSignature = wxMpService.createJsapiSignature(url);
        map.put("wxJsapiSignature", wxJsapiSignature);
        map.put("code", 200);
        return map;
    }

}
