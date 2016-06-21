//
//  MyConfig.h
//  BirdexWH
//
//  Created by birdexbirdex on 16/6/3.
//  Copyright © 2016年 birdex. All rights reserved.
//

#ifndef MyConfig_h
#define MyConfig_h

//支付宝支付需要的网址， 在发布时需要从测试网址更改到线上环境的网址
#define GOBANK_URL  @"http://192.168.1.201:7001/gotobank.aspx"
//#define GOBANK_URL  @"http://pay.birdex.cn/gotobank.aspx"


//设备系统版本号
#define IOS_VERSION_7_OR_ABOVE (([[[UIDevice currentDevice] systemVersion] floatValue] >= 7.0)? (YES):(NO))

#define WEB_UPGRADE_INFO_URL @"http://192.168.1.171/for_upgrade/version.txt"
#define WEB_UPGRADE_ZIP_URL @"http://192.168.1.171/for_upgrade/iosweb.zip"

//#define ScrWidth           [UIScreen mainScreen].bounds.size.width
//#define ScrHeight          [UIScreen mainScreen].bounds.size.height
#define ScrWidth           [UIScreen mainScreen].currentMode.size.width
#define ScrHeight          [UIScreen mainScreen].currentMode.size.height

#define RGBA(r, g, b,a) [UIColor colorWithRed:(r)/255.0 green:(g)/255.0 blue:(b)/255.0 alpha:a]

#define kEntryHtmlPosition  @"entryHtmlPos" //存放web程序的启动位置
#define ENTRY_HTML_LOCAL    0   //从bundle启动
#define ENTRY_HTML_A        1   //从A区启动
#define ENTRY_HTML_B        2   //从B区启动

#define kWebVer             @"webver" //当前Web版本, float类型

#endif /* MyConfig_h */
