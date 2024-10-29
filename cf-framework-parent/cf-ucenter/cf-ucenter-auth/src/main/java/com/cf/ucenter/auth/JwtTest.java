package com.cf.ucenter.auth;

import com.alibaba.fastjson.JSON;
import com.cf.framework.domain.ucenter.ext.AuthToken;
import com.cf.framework.utils.StringTools;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.jwt.Jwt;
import org.springframework.security.jwt.JwtHelper;
import org.springframework.security.jwt.crypto.sign.RsaSigner;
import org.springframework.security.jwt.crypto.sign.RsaVerifier;
import org.springframework.security.oauth2.provider.token.store.KeyStoreKeyFactory;

import java.io.FileInputStream;
import java.security.KeyPair;
import java.security.KeyStore;
import java.security.PublicKey;
import java.security.interfaces.RSAPrivateKey;

public class JwtTest {

    public static void main(String[] args) throws Exception {
//        test1();
        test2();

    }

    public static void test2() {
        //密钥库文件
        String keystore = "cfzh.keystore";
        //密钥库的密码
        String keystore_password = "123456";

        //密钥库文件路径
        ClassPathResource classPathResource = new ClassPathResource(keystore);
        //密钥别名
        String alias  = "cfzh";
        //密钥的访问密码
        String key_password = "123456";
        //密钥工厂
        KeyStoreKeyFactory keyStoreKeyFactory = new KeyStoreKeyFactory(classPathResource,keystore_password.toCharArray());
        //密钥对（公钥和私钥）
        KeyPair keyPair = keyStoreKeyFactory.getKeyPair(alias, key_password.toCharArray());
        //获取私钥
        RSAPrivateKey aPrivate = (RSAPrivateKey) keyPair.getPrivate();
        //jwt令牌的内容
//        userBasicInfo.setUserpic(StringTools.getRandomString("",10));
        String bodyString = "JSON.toJSONString(userBasicInfo)";
        //生成jwt令牌
        Jwt jwt = JwtHelper.encode(bodyString, new RsaSigner(aPrivate));
        //生成jwt令牌编码
        AuthToken authToken = new AuthToken();
        authToken.setJwt_token(jwt.getEncoded());
        System.out.println(jwt.getEncoded());
        System.out.println("===================================");
        //公钥
//        String publickey = "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsaQdUEim6QYm3/QStkQGko4W7/1FtMnggq9zFdKwomEbqeTOXye34r2qJZQ3xgY+Gl+sHHDk44ENGcyR/NPDwBKZfxrEd3lDJpSAf+JfuwZNchaX08rbR1KlkOgl+MT88zPdHb8dlGE1KwH62LsLOrMA9WvbDTyHFaUdY1yOZVTw4HI5mO47UsBBY62Qif1CAelciWMgWhjwazxHAcFd8EMorFmKBHt8yMVMedK/X7BmCHA4FkZZRqAiZgAStK23V9BhRf9/ZHkfkSH8Epv0sd13+jFhHABvrYR/MUqiXG+Yh/FDcNPNTjfkiHMt0jqU5AdD957jFo+vxRST7Nk8-----END PUBLIC KEY-----";
//        String publickey = "-----BEGIN CERTIFICATE-----MIIDUzCCAjugAwIBAgIEKtXCkjANBgkqhkiG9w0BAQsFADBaMQ0wCwYDVQQGEwR5YW5nMQ0wCwYDVQQIEwR5YW5nMQ0wCwYDVQQHEwR5YW5nMQ0wCwYDVQQKEwR5YW5nMQ0wCwYDVQQLEwR5YW5nMQ0wCwYDVQQDEwR5YW5nMB4XDTI0MTAyODEzMDc1MFoXDTI1MDEyNjEzMDc1MFowWjENMAsGA1UEBhMEeWFuZzENMAsGA1UECBMEeWFuZzENMAsGA1UEBxMEeWFuZzENMAsGA1UEChMEeWFuZzENMAsGA1UECxMEeWFuZzENMAsGA1UEAxMEeWFuZzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMaXas8dl+jrOaNLurPWMoKo7HEcO5kuX7FhrB8piNJM96MGx69eflrGzUONZCqwXAIiA3jLir3rm0XGTTuFb3hvEG8RvSFMFofHOjo/2jFcPrXhAv0G2cK9MFCfsi6m69xq1hbhep1MBXZFO5WOMqLYAaJMq7tXVvnMY38CYc1tQgz2MHCAUh/7LECdjX9UwspmuHvkpI02tg5yohFaGofJ8uXFcZpvJ2N0sbX+ReE4fRCpiFYzWriThmzYpeEElGmGywHp56WPc/MCPI6O4oBYBzF6c5NHXmCAbZQ59TK34dwJvtieyER1tO+vPh23kQ0lQZzwBeC971HERLTdhmUCAwEAAaMhMB8wHQYDVR0OBBYEFF5yeu/kAqIjFY5tuSzS84jUmlTaMA0GCSqGSIb3DQEBCwUAA4IBAQAkh5zqA21lWlJP/RxwRbSe3m2SVNpiF9THnW9O9fvhjIVTQLyJSKaOyUQJLlE7sGc830/R4+n6TE9EV+XB4CjCUsqEtH/FkzetEOJxNjHX1K+BPNVjxXWzCtJWJS4HoamSqr86syH3AgtqCc+8ZR1nPx7V4UgUe/BXD1QYqna1MWZdFmgypbxgcdop26+7T7qhGpJ4JE9T2jh6HqdMT5lMPOKuvbUxQNXWo5GW0rsUkEtBeUxwWdElNawNOrKHBQ2iQGRYMPL8kthaVNlJeSjwgyStjjq51DyxpGp84by8SPMaI+W+iy0Jio7c9W3TowpQ1+8eQMzBHColcydRo+En-----END CERTIFICATE-----";
        String publickey = "-----BEGIN PUBLIC KEY-----\n" +
                "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxpdqzx2X6Os5o0u6s9Yy\n" +
                "gqjscRw7mS5fsWGsHymI0kz3owbHr15+WsbNQ41kKrBcAiIDeMuKveubRcZNO4Vv\n" +
                "eG8QbxG9IUwWh8c6Oj/aMVw+teEC/QbZwr0wUJ+yLqbr3GrWFuF6nUwFdkU7lY4y\n" +
                "otgBokyru1dW+cxjfwJhzW1CDPYwcIBSH/ssQJ2Nf1TCyma4e+SkjTa2DnKiEVoa\n" +
                "h8ny5cVxmm8nY3Sxtf5F4Th9EKmIVjNauJOGbNil4QSUaYbLAennpY9z8wI8jo7i\n" +
                "gFgHMXpzk0deYIBtlDn1Mrfh3Am+2J7IRHW0768+HbeRDSVBnPAF4L3vUcREtN2G\n" +
                "ZQIDAQAB\n" +
                "-----END PUBLIC KEY-----";
        //校验jwt令牌
        String claims = JwtHelper.decodeAndVerify(jwt.getEncoded(), new RsaVerifier(publickey)).getClaims();
        System.out.println(claims);
    }

    public static void test1() throws Exception {
        String keystorePath = "D:\\java\\project\\parkinglot\\key\\cfzh.keystore";
        String alias = "cfzh"; // 替换为你的别名
        String password = "123456"; // 替换为你的密码

        KeyStore keystore = KeyStore.getInstance("JKS");
        try (FileInputStream fis = new FileInputStream(keystorePath)) {
            keystore.load(fis, password.toCharArray());
        }

        PublicKey publicKey = keystore.getCertificate(alias).getPublicKey();
        System.out.println("===================================");
        System.out.println(publicKey);
        System.out.println("===================================");
    }
}
