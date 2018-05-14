package com.sam.controller;

import com.sam.constant.Constant;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.api.WxConsts;
import me.chanjar.weixin.common.exception.WxErrorException;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.bean.result.WxMpOAuth2AccessToken;
import me.chanjar.weixin.mp.bean.result.WxMpUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
import java.net.URLEncoder;

/**
 * 微信授权
 *
 * @author sam
 * @since 2018/3/28
 */
@Slf4j
@Controller
@RequestMapping("/api/wechat")
public class WechatController {

    @Autowired
    private WxMpService wxMpService;

    /**
     * 授权接口
     *
     * @param returnUrl 授权过程全部完毕后返回的页面
     * @return
     */
    @GetMapping("/authorize")
    public String authorize(@RequestParam(value = "returnUrl", defaultValue = "/") String returnUrl) {
        String redirectURI = Constant.BASE_HOST + "/api/wechat/userInfo";
        String scope = WxConsts.OAUTH2_SCOPE_USER_INFO;
        String state = URLEncoder.encode(returnUrl);
        return "redirect:" + wxMpService.oauth2buildAuthorizationUrl(redirectURI, scope, state);
    }

    /**
     * 获取用户信息（微信授权通过后，从微信服务器重定向回来）
     *
     * @param code
     * @param returnUrl 微信传回来的自定义信息 state
     * @return
     */
    @GetMapping("/userInfo")
    public String userInfo(@RequestParam("code") String code, @RequestParam("state") String returnUrl, HttpSession session) {
        WxMpOAuth2AccessToken wxMpOAuth2AccessToken;
        WxMpUser wxMpUser;
        try {
            wxMpOAuth2AccessToken = wxMpService.oauth2getAccessToken(code);
            wxMpUser = wxMpService.oauth2getUserInfo(wxMpOAuth2AccessToken, null);
        } catch (WxErrorException e) {
            e.printStackTrace();
            return "error/error";
        }

        String openId = wxMpUser.getOpenId();
        log.info("openId", openId);
        //TODO 通过openId从数据库中查询User，如果没有则新增

        // 缓存在session中
        session.setAttribute("wxMpUser", wxMpUser);

        return "redirect:" + returnUrl;
    }


}
