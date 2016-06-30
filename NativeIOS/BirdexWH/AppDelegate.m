//
//  AppDelegate.m
//  BirdexWH
//
//  Created by birdexbirdex on 16/6/3.
//  Copyright © 2016年 birdex. All rights reserved.
//

#import "AppDelegate.h"
#import "IndexViewController.h"
#import <AlipaySDK/AlipaySDK.h>
#import "IndexViewController.h"
#import "UMessage.h"
#import "HttpApiUtils.h"
#import "SSZipArchive/SSZipArchive.h"
#import "Toast/UIView+Toast.h"

@interface AppDelegate ()

@end

@implementation AppDelegate


//获取web程序的入口index.html文件的url
- (NSURL *)getWebIndexHtmlUrl
{
    NSUserDefaults * defaults = [NSUserDefaults standardUserDefaults];
    long which = [defaults integerForKey:kEntryHtmlPosition];
    
    NSLog(@"---- getWebIndexHtmlUrl which %d", which);
    
    if (which == ENTRY_HTML_LOCAL)
    {
        NSString * filePath = [[NSBundle mainBundle] pathForResource:@"Source/index" ofType:@"html"];
        return [NSURL fileURLWithPath:filePath];
    }
    else if (which == ENTRY_HTML_A)
    {
        //NSFileManager *fileManager = [NSFileManager defaultManager];
        NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask,YES);
        NSString *docDir = [paths objectAtIndex:0];
        NSString * temp = [docDir stringByAppendingPathComponent:@"WebA/index.html"];
        
        //检测是否存在
        NSFileManager * fileManager = [NSFileManager defaultManager];
        if ([fileManager fileExistsAtPath:temp])
        {
            return [NSURL fileURLWithPath:temp];
        }
        else
        {
            NSLog(@"---- index.html not exist %@", temp);
            
            //重置使用local
            return [self resetWebToLocal];
        }
    }
    else
    {
        //NSFileManager *fileManager = [NSFileManager defaultManager];
        NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask,YES);
        NSString *docDir = [paths objectAtIndex:0];
        NSString * temp = [docDir stringByAppendingPathComponent:@"WebB/index.html"];
        
        //检测是否存在
        NSFileManager * fileManager = [NSFileManager defaultManager];
        if ([fileManager fileExistsAtPath:temp])
        {
            return [NSURL fileURLWithPath:temp];
        }
        else
        {
            NSLog(@"---- index.html not exist %@", temp);
            
            //重置使用local
            return [self resetWebToLocal];
        }
    }
}

//重置使用local, 在升级出错时此函数会被调用
- (NSURL *)resetWebToLocal
{
    NSUserDefaults * defaults = [NSUserDefaults standardUserDefaults];
    
    [defaults setInteger:ENTRY_HTML_LOCAL forKey:kEntryHtmlPosition];
    [defaults removeObjectForKey:kWebVer];
    [defaults synchronize];
    
    NSString * filePath = [[NSBundle mainBundle] pathForResource:@"Source/index" ofType:@"html"];
    return [NSURL fileURLWithPath:filePath];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
//    self.window=[[UIWindow alloc]initWithFrame:[[UIScreen mainScreen]bounds]];
//    IndexViewController *viewController=[[IndexViewController alloc]init];
//    self.window.rootViewController=viewController;
//    [self.window makeKeyAndVisible];
    // Override point for customization after application launch.
    
    
    //设置 AppKey 及 LaunchOptions
    //[UMessage startWithAppkey:@"575e7b6467e58e9cfe000657" launchOptions:launchOptions];
    
    //1.3.0版本开始简化初始化过程。如不需要交互式的通知，下面用下面一句话注册通知即可。
    //[UMessage registerForRemoteNotifications];
    
    /**  如果你期望使用交互式(只有iOS 8.0及以上有)的通知，请参考下面注释部分的初始化代码
     //register remoteNotification types （iOS 8.0及其以上版本）
     UIMutableUserNotificationAction *action1 = [[UIMutableUserNotificationAction alloc] init];
     action1.identifier = @"action1_identifier";
     action1.title=@"Accept";
     action1.activationMode = UIUserNotificationActivationModeForeground;//当点击的时候启动程序
     
     UIMutableUserNotificationAction *action2 = [[UIMutableUserNotificationAction alloc] init];  //第二按钮
     action2.identifier = @"action2_identifier";
     action2.title=@"Reject";
     action2.activationMode = UIUserNotificationActivationModeBackground;//当点击的时候不启动程序，在后台处理
     action2.authenticationRequired = YES;//需要解锁才能处理，如果action.activationMode = UIUserNotificationActivationModeForeground;则这个属性被忽略；
     action2.destructive = YES;
     
     UIMutableUserNotificationCategory *actionCategory = [[UIMutableUserNotificationCategory alloc] init];
     actionCategory.identifier = @"category1";//这组动作的唯一标示
     [actionCategory setActions:@[action1,action2] forContext:(UIUserNotificationActionContextDefault)];
     
     NSSet *categories = [NSSet setWithObject:actionCategory];
     
     //如果默认使用角标，文字和声音全部打开，请用下面的方法
     [UMessage registerForRemoteNotifications:categories];
     
     //如果对角标，文字和声音的取舍，请用下面的方法
     //UIRemoteNotificationType types7 = UIRemoteNotificationTypeBadge|UIRemoteNotificationTypeAlert|UIRemoteNotificationTypeSound;
     //UIUserNotificationType types8 = UIUserNotificationTypeAlert|UIUserNotificationTypeSound|UIUserNotificationTypeBadge;
     //[UMessage registerForRemoteNotifications:categories withTypesForIos7:types7 withTypesForIos8:types8];
     */
    
    //for log
    //[UMessage setLogEnabled:YES];
    
    //检查Web部分是否需要更新
    //延迟执行的目的是，保证getWebIndexHtmlUrl在这之前已经被调用过
    [self performSelector:@selector(checkWebUpgrade) withObject:nil afterDelay:0.1];
    
    return YES;
}



- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    // 1.2.7版本开始不需要用户再手动注册devicetoken，SDK会自动注册
    //[UMessage registerDeviceToken:deviceToken];
    NSString * strDeviceToken = [[[[deviceToken description] stringByReplacingOccurrencesOfString: @"<" withString: @""]
                  stringByReplacingOccurrencesOfString: @">" withString: @""]
     stringByReplacingOccurrencesOfString: @" " withString: @""];

    NSLog(@"---- %@", strDeviceToken);
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(nonnull NSError *)error
{
    //注册远程推送失败
    
    
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
    NSLog(@"---- notification %@", userInfo);
    //[UMessage didReceiveRemoteNotification:userInfo];
}

- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}
-(UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window{
    return UIInterfaceOrientationMaskPortrait;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
    
    if ([url.host isEqualToString:@"safepay"]) {
        //跳转支付宝钱包进行支付，处理支付结果
        [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
            NSLog(@"result = %@",resultDic);
            
            long resultStatus = [[resultDic objectForKey:@"resultStatus"] integerValue];
            if (resultStatus == 9000)
            {
                [g_indexVC rechargeFinishWithSuccess:YES];
            }
            else
            {
                [g_indexVC rechargeFinishWithSuccess:NO];
            }
        }];
    }
    return YES;
}

// NOTE: 9.0以后使用新API接口
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString*, id> *)options
{
    if ([url.host isEqualToString:@"safepay"]) {
        //跳转支付宝钱包进行支付，处理支付结果
        [[AlipaySDK defaultService] processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
            NSLog(@"result = %@",resultDic);
            
            long resultStatus = [[resultDic objectForKey:@"resultStatus"] integerValue];
            if (resultStatus == 9000)
            {
                [g_indexVC rechargeFinishWithSuccess:YES];
            }
            else
            {
                [g_indexVC rechargeFinishWithSuccess:NO];
            }
        }];
    }
    return YES;
}


//创建WebA或WebA目录S
- (BOOL)createWebDirectory:(NSString *)pathName
{
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask,YES);
    NSString *docDir = [paths objectAtIndex:0];
    NSString * temp = [docDir stringByAppendingPathComponent:pathName];
    
    NSFileManager * fileManager = [NSFileManager defaultManager];
    
    if (![fileManager fileExistsAtPath:temp])
    {
        //创建
        BOOL bResult = [fileManager createDirectoryAtPath:temp withIntermediateDirectories:YES attributes:nil error:nil];
        if (!bResult)
        {
            NSLog(@"---- create error");
            return NO;
        }
        else
        {
            //设置不允许备份的属性
            NSError *error = nil;
            NSURL * url = [NSURL fileURLWithPath:temp];
            BOOL success = [url setResourceValue: [NSNumber numberWithBool: YES]
                                          forKey: NSURLIsExcludedFromBackupKey error: &error];
            if(!success){
                NSLog(@"Error excluding %@ from backup %@", [url lastPathComponent], error);
                return NO;
            }
        }
    }
    
    return YES;
}

//检查Web程序是否需要升级，如是则后台执行升级操作
- (void)checkWebUpgrade
{
    NSMutableDictionary * params = [[NSMutableDictionary alloc ] init];
    
    //取最新版本号
    [HttpApiUtils get:WEB_UPGRADE_INFO_URL
           withParams:params
              success:^(id responseObj){
                  
                  //返回的是最新Web版本号
                  NSString * newVer = [[NSString alloc] initWithData:responseObj encoding:NSUTF8StringEncoding];
                  newVer = [newVer stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];
                  
                  /*NSError *err;
                  NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:responseObj
                                                                      options:NSJSONReadingMutableContainers
                                                                        error:&err];
                  
                  NSString * oldMessage = [dic objectForKey:@"Message"];*/
                  
                  //取上回保存的本地Web版本号
                  NSUserDefaults * defaults = [NSUserDefaults standardUserDefaults];
                  float curVer = [defaults floatForKey:kWebVer];
                  
                  if (curVer <= 0.01)
                  {
                      //取不到值， 说明是第一次运行， 此时Web版本号和app本身的版本号相同
                      
                      //取app版本号
                      NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
                      NSString *app_Version = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
                      
                      //用app版本号代替web版本号
                      curVer = [app_Version floatValue];
                      
                      //写回，下一次就能取到这个值
                      [defaults setFloat:curVer forKey:kWebVer];
                      [defaults synchronize];
                  }
                  
                  if ([newVer floatValue] > curVer)
                  {
                      //需要升级
                      
                      NSLog(@"---- need upgrade web, new ver %@, old ver %.2f", newVer, curVer);
                      
                      _newVer = [newVer floatValue];
                      
                      [self startDownloadNewVersion];
                  }
                  else
                  {
                      NSLog(@"---- no need to upgrade web, new ver %@, old ver %.2f", newVer, curVer);
                  }
              }
     
              failure:^(NSError * error){
                  NSLog(@"---- error %@", error);
              }];
    
    //NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask,YES);
    //NSString *docDir = [paths objectAtIndex:0];

}

//开始下载新版本的web压缩包
- (void)startDownloadNewVersion
{
    //首先创建Web程序的存储目录
    //如果当前运行的是WebA目录下的程序， 那么升级应当在WebB目录下进行，升级成功后，下次从WebB启动。反之亦然。
    [self createWebDirectory:@"WebA"];
    [self createWebDirectory:@"WebB"];
    
    self.session = [self backgroundSession];
    
    if (self.downloadTask) {
        return;
    }
    
    NSURL *downloadURL = [NSURL URLWithString:WEB_UPGRADE_ZIP_URL];
    NSURLRequest *request = [NSURLRequest requestWithURL:downloadURL];
    self.downloadTask = [self.session downloadTaskWithRequest:request];
    [self.downloadTask resume];
}

- (NSURLSession *)backgroundSession {
    static NSURLSession *session = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration backgroundSessionConfigurationWithIdentifier:@"cn.birdex.sanfangcang.web"];
        session = [NSURLSession sessionWithConfiguration:configuration delegate:self delegateQueue:nil];
    });
    
    return session;
}

- (void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didWriteData:(int64_t)bytesWritten totalBytesWritten:(int64_t)totalBytesWritten totalBytesExpectedToWrite:(int64_t)totalBytesExpectedToWrite {
    
    if (downloadTask == self.downloadTask) {
        //double progress = (double)totalBytesWritten / (double)totalBytesExpectedToWrite;
        //NSLog(@"DownloadTask: %@ progress: %lf", downloadTask, progress);
        dispatch_async(dispatch_get_main_queue(), ^{
            //self.progressView.progress = progress;
        });
    }
}

- (void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didFinishDownloadingToURL:(NSURL *)downloadURL {
    
    NSFileManager *fileManager = [NSFileManager defaultManager];
    
    //把下载的文件拷贝到此目录
    NSURL * destUrl = nil;
    
    NSUserDefaults * defaults = [NSUserDefaults standardUserDefaults];
    long which = [defaults integerForKey:kEntryHtmlPosition];
    if (which == ENTRY_HTML_A)
    {
        //当前在WebA运行， 所以要保存到WebB
        NSArray *URLs = [fileManager URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask];
        NSURL *documentsDirectory = [URLs objectAtIndex:0];
        destUrl = [documentsDirectory URLByAppendingPathComponent:@"WebB/iosweb.zip"];
    }
    else
    {
        //当前在WebB or local运行， 所以要保存到WebA
        NSArray *URLs = [fileManager URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask];
        NSURL *documentsDirectory = [URLs objectAtIndex:0];
        destUrl = [documentsDirectory URLByAppendingPathComponent:@"WebA/iosweb.zip"];
    }
    
    NSLog(@"---- %@ %@", [downloadURL path], [destUrl path]);
    
    // For the purposes of testing, remove any esisting file at the destination.
    [fileManager removeItemAtPath:[destUrl path] error:nil];
    
    BOOL success = [fileManager moveItemAtPath:[downloadURL path] toPath:[destUrl path] error:nil];
    
    if (success) {
        
        if ([SSZipArchive unzipFileAtPath:[destUrl path] toDestination:[[destUrl URLByDeletingLastPathComponent] path]])
        {
            if (which ==  ENTRY_HTML_A)
            {
                //保存新版本号，切换到WebB，下次启动生效
                [defaults setInteger:ENTRY_HTML_B forKey:kEntryHtmlPosition];
                [defaults setFloat:_newVer  forKey:kWebVer];
                [defaults synchronize];
                
                NSLog(@"---- upgrade web to version %.2f success, B active", _newVer);
            }
            else
            {
                //保存新版本号，切换到WebB，下次启动生效
                [defaults setInteger:ENTRY_HTML_A forKey:kEntryHtmlPosition];
                [defaults setFloat:_newVer  forKey:kWebVer];
                [defaults synchronize];
                
                NSLog(@"---- upgrade web to version %.2f success, A active", _newVer);
            }
            
            dispatch_async(dispatch_get_main_queue(), ^{
                [self.window makeToast:@"热升级成功，请彻底退出并重新运行" duration:4.0 position:CSToastPositionBottom];
            });
        }
        
        
    } else {
        NSLog(@"Error during the copy");
    }
}

-(void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didResumeAtOffset:(int64_t)fileOffset expectedTotalBytes:(int64_t)expectedTotalBytes {
}

- (void)URLSession:(NSURLSession *)session task:(NSURLSessionTask *)task didCompleteWithError:(NSError *)error {
    
    if (error == nil) {
        NSLog(@"Task: %@ completed successfully", task);
    } else {
        NSLog(@"Task: %@ completed with error: %@", task, [error localizedDescription]);
        
        dispatch_async(dispatch_get_main_queue(), ^{
            [self.window makeToast:@"热升级包下载失败"];
        });
    }
    
    double progress = (double)task.countOfBytesReceived / (double)task.countOfBytesExpectedToReceive;
    dispatch_async(dispatch_get_main_queue(), ^{
        //self.progressView.progress = progress;
    });
    
    self.downloadTask = nil;
}

- (void)URLSessionDidFinishEventsForBackgroundURLSession:(NSURLSession *)session {
    /*AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    if (appDelegate.backgroundSessionCompletionHandler) {
        void (^completionHandler)() = appDelegate.backgroundSessionCompletionHandler;
        appDelegate.backgroundSessionCompletionHandler = nil;
        completionHandler();
    }*/
    
    NSLog(@"All tasks are finished");
}

- (void)application:(UIApplication *)application handleEventsForBackgroundURLSession:(NSString *)identifier
  completionHandler:(void (^)())completionHandler {
    //self.backgroundSessionCompletionHandler = completionHandler;
    
    //add notification
    //[self presentNotification];
}

@end
