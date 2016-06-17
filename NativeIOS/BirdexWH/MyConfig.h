//
//  MyConfig.h
//  BirdexWH
//
//  Created by birdexbirdex on 16/6/3.
//  Copyright © 2016年 birdex. All rights reserved.
//

#ifndef MyConfig_h
#define MyConfig_h

//设备系统版本号
#define IOS_VERSION_7_OR_ABOVE (([[[UIDevice currentDevice] systemVersion] floatValue] >= 7.0)? (YES):(NO))


//#define ScrWidth           [UIScreen mainScreen].bounds.size.width
//#define ScrHeight          [UIScreen mainScreen].bounds.size.height
#define ScrWidth           [UIScreen mainScreen].currentMode.size.width
#define ScrHeight          [UIScreen mainScreen].currentMode.size.height

#define RGBA(r, g, b,a) [UIColor colorWithRed:(r)/255.0 green:(g)/255.0 blue:(b)/255.0 alpha:a]

//#define ENTRY_HTML  @"http://192.168.1.177:8080/BirdexIOS/index.html"
//#define ENTRY_HTML  @"http://192.168.1.171:9999"
//#define ENTRY_HTML  @"http://192.168.1.174:9999"
#define ENTRY_HTML  @"LOCAL"

#define GOBANK_URL  @"http://192.168.1.201:7001/gotobank.aspx"
//#define GOBANK_URL  @"http://pay.birdex.cn/gotobank.aspx"

#define LOCAL_SIGN  1

#endif /* MyConfig_h */
