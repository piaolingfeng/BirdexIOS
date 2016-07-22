//
//  AppDelegate.h
//  BirdexWH
//
//  Created by birdexbirdex on 16/6/3.
//  Copyright © 2016年 birdex. All rights reserved.
//

#import <UIKit/UIKit.h>

//保存UIWebView的全局变量
extern UIWebView * g_webView;
@class IndexViewController;
extern IndexViewController * g_indexVC;

@interface AppDelegate : UIResponder <UIApplicationDelegate, NSURLSessionDelegate, UIAlertViewDelegate> {
    float _newVer;
}

@property (strong, nonatomic) UIWindow *window;

@property (nonatomic) NSURLSession *session;
@property (nonatomic) NSURLSessionDownloadTask *downloadTask;


- (NSURL *)getWebIndexHtmlUrl;

@end

