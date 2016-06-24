//
//  IndexViewController.m
//  BirdexWH
//
//  Created by birdexbirdex on 16/6/3.
//  Copyright © 2016年 birdex. All rights reserved.
//

#import "IndexViewController.h"
#import "ImageUtils.h"
#import "HttpApiUtils.h"
#import <AlipaySDK/AlipaySDK.h>
#import "AppDelegate.h"

//保存UIWebView的全局变量
UIWebView * g_webView = nil;
UIViewController * g_indexVC = nil;

static int photoSource = 0; //0代表拍照, 1代表相册
static NSString * cameraPara = nil;

static NSString * idImageFront = nil;
static NSString * idImageBack = nil;
static NSString * idImageUrlFront = nil;
static NSString * idImageUrlBack = nil;

@interface IndexViewController ()

@end

@implementation IndexViewController

- (void)viewDidLoad {
    
    g_indexVC = self;
    
    [super viewDidLoad];
    self.view.backgroundColor=[UIColor whiteColor];    //初始化区域大小位置
    [self initViewSetting];
    [self loadHtml];
    
    self.wv_page.alpha = 0;
    
    
    
    CGSize viewSize = [[UIScreen mainScreen] bounds].size;
    
    NSString *viewOrientation = @"Portrait";    //横屏请设置成 @"Landscape"
    
    NSString *launchImage = nil;
    
    NSArray* imagesDict = [[[NSBundle mainBundle] infoDictionary] valueForKey:@"UILaunchImages"];
    
    for (NSDictionary* dict in imagesDict)
        
    {
        
        CGSize imageSize = CGSizeFromString(dict[@"UILaunchImageSize"]);
        
        NSLog(@"@---- %@", dict[@"UILaunchImageName"]);
        
        if (CGSizeEqualToSize(imageSize, viewSize) && [viewOrientation isEqualToString:dict[@"UILaunchImageOrientation"]])
            
        {
            
            launchImage = dict[@"UILaunchImageName"];
             NSLog(@"@---- OK %@", launchImage);
        }
        
    }
    
    UIImageView *launchView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:launchImage]];
    
    launchView.frame = CGRectMake(0, 0, viewSize.width, viewSize.height);
    
    launchView.contentMode = UIViewContentModeScaleAspectFit;
    launchView.tag = 111;
    
    [self.view addSubview:launchView];
    
    
}
-(void)initViewSetting{
    
    g_webView = self.wv_page;
    
    self.wv_page.delegate=self;
    self.wv_page.scalesPageToFit=YES;
    //禁止UIwebview的滚动
    self.wv_page.scrollView.bounces=NO;
//    [self.wv_page stringByEvaluatingJavaScriptFromString:@"document.documentElement.style.webkitUserSelect='none';"];
//    self.wv_page.detectsPhoneNumbers = YES;//自动检测网页上的电话号码，单击可以拨打
}
-(void)loadHtml{
//    NSString *filePath = [[NSBundle mainBundle]pathForResource:@"Source/index" ofType:@"html"];
//    NSString *htmlString = [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
//    [self.wv_page loadHTMLString:htmlString baseURL:[NSURL URLWithString:filePath]];
    
//    _input_charset="utf-8"&body="钱包充值"&notify_url="http://birdex.f3322.net:8021/pay/appalipay/notify"&out_trade_no="BDX20160426162345516126"&partner="2088311639604764"&payment_type="1"&seller_id="zhifubao@birdex.cn"&service="mobile.securitypay.pay"&subject="钱包充值"&total_fee="1.00"
    
    //获取加载位置
    AppDelegate * delegate = (AppDelegate *)([UIApplication sharedApplication].delegate);
    NSURL * url = [delegate getWebIndexHtmlUrl];
    
    NSLog(@"---- web load from %@", [url absoluteString]);
    
    //开始加载网页
    NSURLRequest *localRequest=[NSURLRequest requestWithURL:url];
    self.wv_page.delegate=self;
    [self.wv_page loadRequest:localRequest];
}
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
-(BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    //将要加载网页
    NSString *urlStr=request.URL.absoluteString;
    
    //电话
    NSString * phoneCallPrefix = @"ios://phoneCall?phone=";
    //拍照
    NSString * cameraPrefix = @"ios://camera?text=";
    //相册
    NSString * photoPrefix = @"ios://photo?text=";
    //充值
    NSString * rechargePrefix = @"ios://recharge?";
    //loadfinish
    NSString * loadFinishPrefix = @"ios://loadfinish";
    
    //二维码扫描
    NSRange range1=[urlStr rangeOfString:@"ios://scann"];
    //图像调用
    NSRange range2=[urlStr rangeOfString:@"ios://icon"];
    //支付宝
    NSRange range3=[urlStr rangeOfString:@"ios://zhifu"];
    //内容存入拷贝板
    NSRange range4=[urlStr rangeOfString:@"ios://copy"];
    //打电话
    NSRange phoneCall=[urlStr rangeOfString:phoneCallPrefix];
    
    //拍照
    NSRange camera = [urlStr rangeOfString:cameraPrefix];
    
    //相册
    NSRange album = [urlStr rangeOfString:photoPrefix];
    
    //upload
    NSRange upload = [urlStr rangeOfString:@"ios://uploadId"];
    
    //upload
    NSRange uploadHead = [urlStr rangeOfString:@"ios://uploadHead"];
    
    //upload
    NSRange contact = [urlStr rangeOfString:@"ios://contact"];
    
    NSLog(@"---- %@", urlStr);
    
    if(range1.length!=0){
        
        NSLog(@"call scan");
        
        [self performSegueWithIdentifier:@"ScannPage" sender:self];
        
        return YES;
    }else if(range2.length!=0){
        
        [self performSegueWithIdentifier:@"IconPage" sender:self];
        
        return YES;
    }else if(range3.length!=0){
        //支付宝
        
        return YES;
    }else if(range4.length!=0){
        //-----粘贴板
        NSRange range_copy=[urlStr rangeOfString:@"ios://copy?copytext="];
        
        NSString * textToCopy = nil;
        
        if(range_copy.length!=0){
            textToCopy = [urlStr substringFromIndex:range_copy.length];
        }else{
            textToCopy =urlStr;
        }
        
        NSLog(@"---- before decode %@", textToCopy);
        
        textToCopy = [textToCopy stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
        
        NSLog(@"---- after decode %@", textToCopy);
        
        UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
        
        pasteboard.string =textToCopy;
        
        NSString *js = [NSString stringWithFormat:@"javascript:Callback_Paste();"];
        [self.wv_page stringByEvaluatingJavaScriptFromString:js];
        
        return YES;
    }
    else if (phoneCall.length != 0)
    {
        NSString * number = [urlStr substringFromIndex:phoneCallPrefix.length];
        
        NSLog(@"number is %@", number);
        
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:[NSString stringWithFormat:@"tel:%@", number]]];
        
        return YES;
    }
    else if (camera.length != 0)
    {
        NSLog(@"camera");
        
        photoSource = 0;
        
        cameraPara = [urlStr substringFromIndex:cameraPrefix.length];
        
        [self takePhoto:nil];
        
        return YES;
    }
    else if (album.length != 0)
    {
        NSLog(@"album");
        
        photoSource = 1;
        
        cameraPara = [urlStr substringFromIndex:photoPrefix.length];
        
        [self takePhoto:nil];
        
        return YES;
    }
    else if (upload.length != 0)
    {
        [self uploadImg:0];
        
        return YES;
    }
    else if (uploadHead.length != 0)
    {
        [self uploadImg:2];
        
        return YES;
        
    }
    else if (contact.length != 0)
    {
        ABPeoplePickerNavigationController *nav = [[ABPeoplePickerNavigationController alloc] init];
        nav.peoplePickerDelegate = self;
        
        if([[[UIDevice currentDevice] systemVersion] floatValue]>=8.0){
            nav.predicateForSelectionOfPerson = [NSPredicate predicateWithValue:false];
        }
        [self presentViewController:nav animated:YES completion:nil];
        
        return YES;
    }
    
    //recharge
    if ([urlStr hasPrefix:rechargePrefix])
    {
        NSString * temp = [urlStr substringFromIndex:rechargePrefix.length];
        
        NSArray * info = [temp componentsSeparatedByString:@"--"];
        if ([info count] != 3)
        {
            NSLog(@"---- error");
            
            [self rechargeFinishWithSuccess:NO];
            
            return YES;
        }
        
        NSLog(@"---- %@", info);
        
        NSMutableDictionary * params = [[NSMutableDictionary alloc ] init];
        [params setObject:info[0] forKey:@"ud"];
        [params setObject:info[1] forKey:@"WalletType"];
        [params setObject:info[2] forKey:@"m"];
        
        [params setObject:@"in" forKey:@"a"];
        [params setObject:@"1" forKey:@"islink"];
        [params setObject:@"6" forKey:@"p"];
        
        
        [HttpApiUtils get:GOBANK_URL
               withParams:params
         
                  success:^(id responseObj){
                      
                      
                      //NSString *receiveStr = [[NSString alloc]initWithData:responseObj encoding:NSUTF8StringEncoding];
                      
                      NSError *err;
                      NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:responseObj
                                                                          options:NSJSONReadingMutableContainers
                                                                            error:&err];
                      
                      NSString * oldMessage = [dic objectForKey:@"Message"];
                      
                      NSLog(@"---- %@", oldMessage);
                      
                      NSString * translatedMsg = nil;
                      
                      NSRange range = [oldMessage rangeOfString:@"&sign=\""];
                      if (range.location != NSNotFound)
                      {
                          NSRange rangeEnd = [oldMessage rangeOfString:@"\"&sign_type=\""];
                          if (rangeEnd.location != NSNotFound)
                          {
                              if (rangeEnd.location > range.location + range.length)
                              {
                                  NSRange temp = NSMakeRange(range.location + range.length, rangeEnd.location - range.location - range.length);
                              
                                  NSString * sign = [oldMessage substringWithRange:temp];
                              
                                  sign = [self urlEncodedString:sign];
                              
                                  translatedMsg  = [oldMessage stringByReplacingCharactersInRange:temp withString:sign];
                              }
                          }
                      }
                      
                      /*NSMutableString * newMsg = [[NSMutableString alloc] init];
                      
                      NSArray * orderInfo = [message componentsSeparatedByString:@"&"];
                      for (int i = 0; i < [orderInfo count]; i++)
                      {
                          NSString * item = orderInfo[i];
                          if ([item rangeOfString:@"sign="].location != NSNotFound)
                          {
                              continue;
                          }
                          else if ([item rangeOfString:@"sign_type="].location != NSNotFound)
                          {
                              continue;
                          }
                          else
                          {
                              if (newMsg.length <= 0)
                              {
                                  [newMsg appendString:item];
                              }
                              else
                              {
                                  [newMsg appendFormat:@"&%@", item];
                              }
                          }
                      }
                      
                      [newMsg appendFormat:@"&sign=\"%@\"&sign_type=\"RSA\"", signMsg];
                      
                      NSLog(@"---- %@", newMsg);*/
                      
                      
                      if (translatedMsg == nil)
                      {
                          [self rechargeFinishWithSuccess:NO];
                      }
                      else
                      {
                      
                          [[AlipaySDK defaultService] payOrder:translatedMsg fromScheme:@"birdexapp" callback:^(NSDictionary *resultDic) {
                          
                              NSLog(@"reslut = %@",resultDic);
                              
                              long resultStatus = [[resultDic objectForKey:@"resultStatus"] integerValue];
                              if (resultStatus == 9000)
                              {
                                  [self rechargeFinishWithSuccess:YES];
                              }
                              else
                              {
                                  [self rechargeFinishWithSuccess:NO];
                              }
                          }];
                      }
                  }
         
                  failure:^(NSError * error){
                      
                      NSLog(@"---- error %@", error);
                      
                      [self rechargeFinishWithSuccess:NO];
                  }];
        

        return YES;
    }
    else if ([urlStr hasPrefix:loadFinishPrefix])
    {
        static int flag = 0;
        if (flag == 0)
        {
            flag = 1;
            
            UIImageView * imageView = [self.view viewWithTag:111];
            self.wv_page.alpha = 1;
            
            [UIView transitionFromView:imageView toView:self.wv_page duration:0.6 options:UIViewAnimationOptionTransitionCurlUp completion:nil];
        }
        
        return YES;
    }
    
    
    //retrun YES 表示正常加载网页 返回NO 将停止网页加载
    return YES;
}

- (NSString*)urlEncodedString:(NSString *)string
{
    NSString * encodedString = (__bridge_transfer  NSString*) CFURLCreateStringByAddingPercentEscapes(kCFAllocatorDefault, (__bridge CFStringRef)string, NULL, (__bridge CFStringRef)@"!*'();:@&=+$,/?%#[]", kCFStringEncodingUTF8 );
    
    return encodedString;
}


-(void)webViewDidStartLoad:(UIWebView *)webView{
    //开始加载调用
    
}
-(void)webViewDidFinishLoad:(UIWebView *)webView{
    //加载结束调用
    
}
-(void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error{
    //加载失败调用
    
}
-(void)viewDidAppear:(BOOL)animated{
    //视图加载完毕
    
}

- (void)rechargeFinishWithSuccess:(BOOL)status {
    
    NSLog(@"---- rechargeFinishWithSuccess %d", status);
    
    dispatch_async(dispatch_get_main_queue(), ^{
        NSString *js = [NSString stringWithFormat:@"javascript:Callback_rechargeFinish('%@');", (status?@"true":@"false")];
        [g_webView stringByEvaluatingJavaScriptFromString:js];
    });
}

//判断图像是否存在alpha通道
- (BOOL) imageHasAlpha: (UIImage *) image
{
    CGImageAlphaInfo alpha = CGImageGetAlphaInfo(image.CGImage);
    return (alpha == kCGImageAlphaFirst ||
            alpha == kCGImageAlphaLast ||
            alpha == kCGImageAlphaPremultipliedFirst ||
            alpha == kCGImageAlphaPremultipliedLast);
}

//把UIImage转变成base64编码的data url
- (NSString *) image2DataURL: (UIImage *) image
{
    NSData *imageData = nil;
    NSString *mimeType = nil;
    
    if ([self imageHasAlpha: image]) {
        imageData = UIImagePNGRepresentation(image);
        mimeType = @"image/png";
    } else {
        imageData = UIImageJPEGRepresentation(image, 1.0f);
        mimeType = @"image/jpeg";
    }
    
    return [NSString stringWithFormat:@"data:%@;base64,%@", mimeType,
            [imageData base64EncodedStringWithOptions: 0]];
    
}

-(void)takePhoto:(id) sender{
    
    //先设定sourceType为相机，然后判断相机是否可用（ipod）没相机，不可用将sourceType设定为相片库
    
    UIImagePickerControllerSourceType sourceType = UIImagePickerControllerSourceTypeCamera;
    
    if (photoSource == 0)
    {
        sourceType = UIImagePickerControllerSourceTypeCamera;
        
        if (![UIImagePickerController isSourceTypeAvailable: UIImagePickerControllerSourceTypeCamera]) {
            sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
        }
    }
    else
    {
        sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
    }
    
    UIImagePickerController *picker = [[UIImagePickerController alloc] init];
    if([[[UIDevice currentDevice] systemVersion] floatValue]>=8.0) {
        picker.modalPresentationStyle=UIModalPresentationOverCurrentContext;
        self.modalPresentationStyle = UIModalPresentationOverCurrentContext;
    }
    
    
    
    picker.delegate = self;
    picker.allowsEditing = YES;
    picker.sourceType = sourceType;
    //[self presentModalViewController:picker animated:YES];
    
    [self presentViewController:picker animated:YES completion:nil];
    
    //    UIActionSheet *selectImgSheet=[[UIActionSheet alloc]initWithTitle:nil delegate:self cancelButtonTitle:@"取消" destructiveButtonTitle:nil otherButtonTitles:@"拍照", nil];
    //    selectImgSheet.actionSheetStyle=UIActionSheetStyleAutomatic;
    //    [selectImgSheet showInView:self.view];
}
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info
{
    
    NSString *mediaType = [info objectForKey:UIImagePickerControllerMediaType];
    
    BOOL success;
    
    NSFileManager *fileManager = [NSFileManager defaultManager];
    
    NSError *error;
    
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    
    NSString *documentsDirectory = [paths objectAtIndex:0];
    
    
    if ([mediaType isEqualToString:@"public.image"]){
        UIImage *image = [info objectForKey:@"UIImagePickerControllerEditedImage"];
        
        NSData * imageData = UIImageJPEGRepresentation(image, 0.5f);
        
        NSString * mimeType = @"image/jpeg";
    
        NSString * result = [NSString stringWithFormat:@"data:%@;base64,%@", mimeType,
            [imageData base64EncodedStringWithOptions: 0]];

        NSLog(@"image: %@", [result substringToIndex:30]);
        
        //传到页面显示
        NSString *js = [NSString stringWithFormat:@"javascript:Callback_Identify('%@', '%@');", cameraPara, result];
        [g_webView stringByEvaluatingJavaScriptFromString:js];
        
        
        //保存成文件以备上传
        
        NSFileManager *fileManager = [NSFileManager defaultManager];
        
        NSError *error;
        
        NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
        
        NSString *documentsDirectory = [paths objectAtIndex:0];
        
        if ([cameraPara rangeOfString:@"1"].location != NSNotFound)
        {
            idImageFront = [documentsDirectory stringByAppendingPathComponent:@"front.jpg"];
            [imageData writeToFile:idImageFront atomically:YES];
        }
        else
        {
            idImageBack = [documentsDirectory stringByAppendingPathComponent:@"back.jpg"];
            
            [imageData writeToFile:idImageBack atomically:YES];
        }
        
        

    }
    
    [picker dismissModalViewControllerAnimated:YES];
    
}



- (void)imagePickerControllerDidCancel:(UIImagePickerController *)picker {
    
    [picker dismissModalViewControllerAnimated:YES];
    
}


/*
 *上传
 */
- (void)uploadImg:(int)which
{
    
    
    
    NSMutableDictionary *pram=[[NSMutableDictionary alloc]init];
    
    NSString * tempUrl = (which == 2 ? UPLOAD_HEAD_URL : UPLOAD_IDCARD_URL);
    
    [HttpApiUtils startMultiPartUploadTaskWithURL:tempUrl
                                            image:(which == 0 ? idImageFront : idImageBack)
                                            parameterOfimages:@""
                                            parametersDict:pram
                                 compressionRatio:1.0f
                                succeedBlock:^(id operation, id responseObject) {
        //            NSString *json=[[NSString alloc]initWithData:responseObject encoding:NSUTF8StringEncoding];
        //            NSData *jsonData=[json dataUsingEncoding:NSUTF8StringEncoding];
        //            NSDictionary *dic=[NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingMutableLeaves error:nil];
        
        if(self!=nil){
            
            NSLog(@"response %@", responseObject);
            
                    NSDictionary *dic=(NSDictionary *)responseObject;
                    NSDictionary * dataDic = [dic objectForKey:@"data"];
            
                    NSString * savePath = [dataDic objectForKey:@"savepath"];
                    NSString * saveName = [dataDic objectForKey:@"savename"];
            
                    if (savePath != nil) {
                        if (which == 0)
                            idImageUrlFront = [savePath stringByAppendingString:saveName];
                        else
                            idImageUrlBack = [savePath stringByAppendingString:saveName];
                        
                        if (which == 1)
                        {
                            //上传完毕
                            dispatch_async(dispatch_get_main_queue(), ^{
                                
                                //传到页面显示
                                NSString *js = [NSString stringWithFormat:@"javascript:Callback_uploadDown('%@', '%@', 'true');", idImageUrlFront, idImageUrlBack];
                                
                                NSLog(@"upload done: %@", js);
                                
                                [g_webView stringByEvaluatingJavaScriptFromString:js];
                            });
                        }
                        else if (which == 0)
                        {
                            [self uploadImg:1];
                        }
                        else
                        {
                            //上传完毕
                            dispatch_async(dispatch_get_main_queue(), ^{
                                
                                //传到页面显示
                                NSString *js = [NSString stringWithFormat:@"javascript:Callback_uploadDown('%@', '', 'true');", idImageUrlBack];
                                
                                NSLog(@"upload done: %@", js);
                                
                                [g_webView stringByEvaluatingJavaScriptFromString:js];
                            });
                        }
                        
                    }
            else
            {
                //传到页面显示
                NSString *js = [NSString stringWithFormat:@"javascript:Callback_uploadDown('', '', 'false');"];
                
                NSLog(@"upload done: %@", js);
                
                [g_webView stringByEvaluatingJavaScriptFromString:js];
            }
            
            
        }
        //            NSDictionary *dic=(NSDictionary *)responseObject;
        //            PhotoEntity *entity=[[PhotoEntity alloc]init];
        //            if ([dic objectForKey:@"code"]) {  //objectForKey will return nil if a key doesn't exists.
        //                entity.code=[[dic objectForKey:@"code"] intValue];
        //            }
        //            if([dic objectForKey:@"message"]){
        //                entity.message=[dic objectForKey:@"message"];
        //            }
        //            if([dic objectForKey:@"file"]){
        //                entity.file=[dic objectForKey:@"file"];
        //            }
        //            [self.imgUploadList addObject:entity];
        //            if([path isEqualToString:[self.ImgArray lastObject]]){
        //                [self uploadImgRequest];
        //            }
    } failedBlock:^(id operation, NSError *error) {
        
        //传到页面显示
        NSString *js = [NSString stringWithFormat:@"javascript:Callback_uploadDown('', '', 'false');"];
        
        NSLog(@"upload done: %@", js);
        
        [g_webView stringByEvaluatingJavaScriptFromString:js];
        
    } uploadProgressBlock:^(float uploadPercent, long long totalBytesWritten, long long totalBytesExpectedToWrite) {
        
    }];
    
    //    }
    
}

//通讯录取消选择
- (void)peoplePickerNavigationControllerDidCancel:(ABPeoplePickerNavigationController *)peoplePicker
{
    [peoplePicker dismissViewControllerAnimated:YES completion:nil];
}

//ios8
- (void)peoplePickerNavigationController:(ABPeoplePickerNavigationController *)peoplePicker
                         didSelectPerson:(ABRecordRef)person
                                property:(ABPropertyID)property
                              identifier:(ABMultiValueIdentifier)identifier {
    
    //get phone number
    ABMultiValueRef phone = ABRecordCopyValue(person, kABPersonPhoneProperty);
    long index = ABMultiValueGetIndexForIdentifier(phone,identifier);
    NSString *phoneNO = (__bridge NSString *)ABMultiValueCopyValueAtIndex(phone, index);
    
    if ([phoneNO hasPrefix:@"+"]) {
        phoneNO = [phoneNO substringFromIndex:3];
    }
    
    phoneNO = [phoneNO stringByReplacingOccurrencesOfString:@"-" withString:@""];
    
    NSLog(@"%@", phoneNO);
    
    //get name
    NSString * fullName = (__bridge NSString *)ABRecordCopyCompositeName(person);
    
    NSLog(@"---- %@", fullName);
    
    //传到页面显示
    NSString *js = [NSString stringWithFormat:@"javascript:Callback_Contact('%@', '%@');", fullName, phoneNO];
    [g_webView stringByEvaluatingJavaScriptFromString:js];
    
    [peoplePicker dismissViewControllerAnimated:YES completion:nil];
    
}

//ios8
- (void)peoplePickerNavigationController:(ABPeoplePickerNavigationController*)peoplePicker didSelectPerson:(ABRecordRef)person
{
    ABPersonViewController *personViewController = [[ABPersonViewController alloc] init];
    personViewController.displayedPerson = person;
    [peoplePicker pushViewController:personViewController animated:YES];
}

//ios7
- (BOOL)peoplePickerNavigationController:(ABPeoplePickerNavigationController *)peoplePicker shouldContinueAfterSelectingPerson:(ABRecordRef)person
{
    return YES;
}

//ios7
- (BOOL)peoplePickerNavigationController:(ABPeoplePickerNavigationController *)peoplePicker shouldContinueAfterSelectingPerson:(ABRecordRef)person property:(ABPropertyID)property identifier:(ABMultiValueIdentifier)identifier
{
    ABMultiValueRef phone = ABRecordCopyValue(person, kABPersonPhoneProperty);
    long index = ABMultiValueGetIndexForIdentifier(phone,identifier);
    NSString *phoneNO = (__bridge NSString *)ABMultiValueCopyValueAtIndex(phone, index);
    if ([phoneNO hasPrefix:@"+"]) {
        phoneNO = [phoneNO substringFromIndex:3];
    }
    
    phoneNO = [phoneNO stringByReplacingOccurrencesOfString:@"-" withString:@""];
    NSLog(@"%@", phoneNO);
    
    //get name
    NSString * fullName = (__bridge NSString *)ABRecordCopyCompositeName(person);
    
    NSLog(@"---- %@", fullName);
    
    //传到页面显示
    NSString *js = [NSString stringWithFormat:@"javascript:Callback_Contact('%@', '%@');", fullName, phoneNO];
    [g_webView stringByEvaluatingJavaScriptFromString:js];
    
    [peoplePicker dismissViewControllerAnimated:YES completion:nil];
    return NO;
    
}


@end
