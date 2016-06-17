//
//  ScannViewController.m
//  BirdexWH
//
//  Created by birdexbirdex on 16/6/4.
//  Copyright © 2016年 birdex. All rights reserved.
//

#import "AppDelegate.h"
#import "ScannViewController.h"

@implementation ScannViewController
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.view.backgroundColor=[UIColor whiteColor];
    //版本更新
//    self.updateBiz=[[VersoinUpdateBiz alloc]init];
    self.captureSession=nil;
    self.isReading=NO;
    [self initView];
    [self startStopReading];
    //设置返回按钮事件
    //[self.backBtn addTarget:self action:@selector(backHandler:) forControlEvents:UIControlEventTouchUpInside];
    
}
-(void)initView{
    //设置拍照
//    UIBarButtonItem *rightitem=[[UIBarButtonItem alloc]initWithTitle:@"拍照" style:UIBarButtonItemStylePlain target:self action:@selector(takephoto)];
//    self.navigationItem.rightBarButtonItem=rightitem;
    //
    self.viewPreview=[[UIView alloc]initWithFrame:[[UIScreen mainScreen]bounds]];
    [self.cameraView addSubview:self.viewPreview];
}

-(void)backHandler:(id)sender{
    [self dismissViewControllerAnimated:nil completion:nil];
}

- (IBAction)cancelPressed:(id)sender {
    [self dismissViewControllerAnimated:YES completion:nil];
}
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (BOOL)startReading {
    NSError *error;
    
    //1.初始化捕捉设备（AVCaptureDevice），类型为AVMediaTypeVideo
    AVCaptureDevice *captureDevice = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
    
    //2.用captureDevice创建输入流
    AVCaptureDeviceInput *input = [AVCaptureDeviceInput deviceInputWithDevice:captureDevice error:&error];
    if (!input) {
        NSLog(@"%@", [error localizedDescription]);
        return NO;
    }
    
    //3.创建媒体数据输出流
    AVCaptureMetadataOutput *captureMetadataOutput = [[AVCaptureMetadataOutput alloc] init];
    
    //4.实例化捕捉会话
    _captureSession = [[AVCaptureSession alloc] init];
    //高质量采集率
    //    [_captureSession setSessionPreset:AVCaptureSessionPresetHigh];
    //4.1.将输入流添加到会话
    [_captureSession addInput:input];
    
    //4.2.将媒体输出流添加到会话中
    [_captureSession addOutput:captureMetadataOutput];
    
    //5.创建串行队列，并加媒体输出流添加到队列当中
    dispatch_queue_t dispatchQueue;
    dispatchQueue = dispatch_queue_create("myQueue", NULL);
    //5.1.设置代理
    [captureMetadataOutput setMetadataObjectsDelegate:self queue:dispatchQueue];
    
    //5.2.设置输出媒体数据类型为QRCode
    //    [captureMetadataOutput setMetadataObjectTypes:[NSArray arrayWithObject:AVMetadataObjectTypeQRCode]];
    //扫码类型
    [captureMetadataOutput setMetadataObjectTypes:[NSArray arrayWithObjects: AVMetadataObjectTypeQRCode,         //二维码
                                                   AVMetadataObjectTypeCode39Code,     //条形码   韵达和申通
                                                   AVMetadataObjectTypeCode128Code,    //CODE128条码  顺丰用的
                                                   AVMetadataObjectTypeCode39Mod43Code,
                                                   AVMetadataObjectTypeEAN13Code,
                                                   AVMetadataObjectTypeEAN8Code,
                                                   AVMetadataObjectTypeCode93Code,    //条形码,星号来表示起始符及终止符,如邮政EMS单上的条码
                                                   AVMetadataObjectTypeUPCECode,nil]];
    //     [captureMetadataOutput setMetadataObjectTypes:[NSArray arrayWithObjects:AVMetadataObjectTypeEAN13Code, AVMetadataObjectTypeEAN8Code, AVMetadataObjectTypeCode128Code, AVMetadataObjectTypeQRCode, nil]];
    //6.实例化预览图层
    _videoPreviewLayer = [[AVCaptureVideoPreviewLayer alloc] initWithSession:_captureSession];
    
    //7.设置预览图层填充方式
    [_videoPreviewLayer setVideoGravity:AVLayerVideoGravityResizeAspectFill];
    
    //8.设置图层的frame
    [_videoPreviewLayer setFrame:_viewPreview.layer.bounds];
    
    //9.将图层添加到预览view的图层上
    [_viewPreview.layer addSublayer:_videoPreviewLayer];
    
    //10.设置扫描范围
    //    captureMetadataOutput.rectOfInterest = CGRectMake(0.2f, 0.2f, 0.8f, 0.8f);
    NSInteger ScreenWidth=[UIScreen mainScreen].bounds.size.width;
    NSInteger ScreenHigh=[UIScreen mainScreen].bounds.size.height;
    
    NSInteger x=(ScreenWidth-200)/2;
    NSInteger y=200;
    //    //扫描识别范围
    captureMetadataOutput.rectOfInterest = CGRectMake(y / self.view.bounds.size.height,
                                                      x  / self.view.bounds.size.width,
                                                      200 / self.view.bounds.size.height,
                                                      200 / self.view.bounds.size.width);
    //    captureMetadataOutput.rectOfInterest = CGRectMake(100 / self.view.bounds.size.height,
    //                                                      60  / self.view.bounds.size.width,
    //                                                      200 / self.view.bounds.size.height,
    //                                                      200 / self.view.bounds.size.width);
    //10.1.扫描框
    //    _boxView = [[UIView alloc] initWithFrame:CGRectMake(_viewPreview.bounds.size.width * 0.2f, _viewPreview.bounds.size.height * 0.2f, _viewPreview.bounds.size.width - _viewPreview.bounds.size.width * 0.4f, _viewPreview.bounds.size.height - _viewPreview.bounds.size.height * 0.4f)];
    //    _boxView = [[UIView alloc] initWithFrame:CGRectMake(60, 100, 200, 200)];
    _boxView = [[UIView alloc] initWithFrame:CGRectMake(x, y, 200, 200)];
    _boxView.layer.borderColor = [UIColor greenColor].CGColor;
    _boxView.layer.borderWidth = 1.0f;
    
    [_viewPreview addSubview:_boxView];
    
    //10.2.扫描线
    _scanLayer = [[CALayer alloc] init];
    _scanLayer.frame = CGRectMake(0, 0, _boxView.bounds.size.width, 1);
    _scanLayer.backgroundColor = [UIColor brownColor].CGColor;
    
    [_boxView.layer addSublayer:_scanLayer];
    
    NSTimer *timer = [NSTimer scheduledTimerWithTimeInterval:0.2f target:self selector:@selector(moveScanLayer:) userInfo:nil repeats:YES];
    
    [timer fire];
    
    //10.开始扫描
    [_captureSession startRunning];
    
    
    return YES;
}
- (void)startStopReading{
    if (!_isReading) {
        if ([self startReading]) {
            //            [_startBtn setTitle:@"Stop" forState:UIControlStateNormal];
            //            [_lblStatus setText:@"Scanning for QR Code"];
        }
    }
    else{
        [self stopReading];
        //        [_startBtn setTitle:@"Start!" forState:UIControlStateNormal];
    }
    
    _isReading = !_isReading;
}
-(void)stopReading{
    [_captureSession stopRunning];
    _captureSession = nil;
    [_scanLayer removeFromSuperlayer];
    [_videoPreviewLayer removeFromSuperlayer];
}

#pragma mark - AVCaptureMetadataOutputObjectsDelegate
- (void)captureOutput:(AVCaptureOutput *)captureOutput didOutputMetadataObjects:(NSArray *)metadataObjects fromConnection:(AVCaptureConnection *)connection
{
    if(_isReading){
        //判断是否有数据
        if (metadataObjects != nil && [metadataObjects count] > 0) {
            AVMetadataMachineReadableCodeObject *metadataObj = [metadataObjects objectAtIndex:0];
            //判断回传的数据类型   子线程跳转卡主
            //此判断针对二位码，不对条形码起作用
            //        if ([[metadataObj type] isEqualToString:AVMetadataObjectTypeQRCode]) {
            //            [_lblStatus performSelectorOnMainThread:@selector(setText:) withObject:[metadataObj stringValue] waitUntilDone:NO];
            
            //            [self performSelectorOnMainThread:@selector(stopReading) withObject:nil waitUntilDone:NO];
            //            _isReading = NO;
            //            //跳转到显示的页面
            //            PhotoViewController *photoController=[[PhotoViewController alloc]init];
            //            photoController.scannCode=[metadataObj stringValue];
            //            [self.navigationController pushViewController:photoController animated:YES];
            //        }
            [self performSelectorOnMainThread:@selector(scannResult:) withObject:[metadataObj stringValue] waitUntilDone:NO];
        }
    }
}
//扫描结果处理
-(void)scannResult:(NSString *)result{
    [self performSelectorOnMainThread:@selector(stopReading) withObject:nil waitUntilDone:NO];
    _isReading = NO;
    //跳转到显示的页面
    NSLog(result);
    
    [self dismissViewControllerAnimated:YES completion:nil];
    
    NSString *js = [NSString stringWithFormat:@"javascript:Callback_Scann('%@');", result];
    [g_webView stringByEvaluatingJavaScriptFromString:js];
    //----------------------------------开始处理扫描的结果------------------------------------
}
- (void)moveScanLayer:(NSTimer *)timer
{
    CGRect frame = _scanLayer.frame;
    if (_boxView.frame.size.height < _scanLayer.frame.origin.y) {
        frame.origin.y = 0;
        _scanLayer.frame = frame;
    }else{
        
        frame.origin.y += 5;
        
        [UIView animateWithDuration:0.1 animations:^{
            _scanLayer.frame = frame;
        }];
    }
}

- (BOOL)shouldAutorotate
{
    return NO;
}
/*
 #pragma mark - Navigation
 
 // In a storyboard-based application, you will often want to do a little preparation before navigation
 - (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
 // Get the new view controller using [segue destinationViewController].
 // Pass the selected object to the new view controller.
 }
 */
-(void)viewDidAppear:(BOOL)animated{
    //显示扫描
    if (!_isReading) {
        [self startStopReading];
        self.isReading=YES;
    }
}
-(void)viewWillDisappear:(BOOL)animated{
    //停止扫描
}




//-(void)takephoto{
//    [self performSelectorOnMainThread:@selector(stopReading) withObject:nil waitUntilDone:NO];
//    _isReading = NO;
//    //跳转到显示的页面
//    PhotoViewController *photoController=[[PhotoViewController alloc]init];
//    photoController.scannCode=@"";
//    [self.navigationController pushViewController:photoController animated:YES];
//}
//版本更新
//-(void)initRequestVersion{
//    //    1.设置请求路径
//    NSURL *url=[NSURL URLWithString:BXHttpVersion];
//    //    2.创建请求对象
//    NSURLRequest *request=[NSURLRequest requestWithURL:url];
//    
//    //    3.发送请求
//    //3.1发送同步请求，在主线程执行
//    //    NSData *data=[NSURLConnection sendSynchronousRequest:request returningResponse:nil error:nil];
//    //（一直在等待服务器返回数据，这行代码会卡住，如果服务器没有返回数据，那么在主线程UI会卡住不能继续执行操作）
//    
//    //3.1发送异步请求
//    //创建一个队列（默认添加到该队列中的任务异步执行）
//    //    NSOperationQueue *queue=[[NSOperationQueue alloc]init];
//    //获取一个主队列
//    NSOperationQueue *queue=[NSOperationQueue mainQueue];
//    [NSURLConnection sendAsynchronousRequest:request queue:queue completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
//        //             NSString *aString = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
//        [self performSelectorOnMainThread:@selector(versionStart:) withObject:data waitUntilDone:NO];
//        //             @try
//        //             {
//        //                 NSString *aString = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
//        //                 NSDictionary *dic=[NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableLeaves error:nil];
//        //                 self.versionEntity=[self.updateBiz getVersionUrlWithObj:dic];
//        //                if(self.versionEntity!=nil){
//        //                        UIAlertView *aletView=[[UIAlertView alloc]initWithTitle:@"版本更新" message:self.versionEntity.description delegate:self cancelButtonTitle:@"取消" otherButtonTitles:@"确定", nil];
//        //                        [aletView show];
//        //                 }
//        //             }@catch (NSException * e) {
//        //                 NSLog(@"error:");
//        //
//        //             }
//    }];
//    
//    
//    
//    
//    //    NSMutableDictionary *param=[[NSMutableDictionary alloc]init];
//    //    [HttpApiUtils get:BXHttpVersion withParams:param success:^(id responseObj) {
//    //        if(self!=nil){
//    //            NSData *jsonData = [responseObj dataUsingEncoding:NSUTF8StringEncoding];
//    ////            NSString *json=(NSString *)responseObj;
//    ////            NSString *json=[[NSString alloc]initWithData:responseObj encoding:NSUTF8StringEncoding];
//    ////            NSDictionary *d = responseObj;
//    //            VersoinUpdateBiz *versionBiz=[[VersoinUpdateBiz alloc]init];
//    ////            self.versionEntity=[self.updateBiz getVersionUrlWithJson:responseObj];
//    ////            NSDictionary *dic=(NSDictionary *)responseObj;
//    //
//    ////            self.versionEntity=[self.updateBiz getVersionUrlWithObj:d];
//    //            if(self.versionEntity!=nil){
//    //                UIAlertView *aletView=[[UIAlertView alloc]initWithTitle:@"版本更新" message:self.versionEntity.description delegate:self cancelButtonTitle:@"取消" otherButtonTitles:@"确定", nil];
//    //                [aletView show];
//    //            }
//    //        }
//    //    } failure:^(NSError *eroor) {
//    //
//    //    }];
//}
//-(void)versionStart:(NSData*)data{
//    @try
//    {
//        //        NSString *aString = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
//        NSDictionary *dic=[NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableLeaves error:nil];
//        self.versionEntity=[self.updateBiz getVersionUrlWithObj:dic];
//        if(self.versionEntity!=nil){
//            UIAlertView *aletView=[[UIAlertView alloc]initWithTitle:@"版本更新" message:self.versionEntity.description delegate:self cancelButtonTitle:@"取消" otherButtonTitles:@"确定", nil];
//            [aletView show];
//        }
//    }@catch (NSException * e) {
//        NSLog(@"error:");
//        
//    }
//}
@end
