//
//  ScannViewController.h
//  BirdexWH
//
//  Created by birdexbirdex on 16/6/4.
//  Copyright © 2016年 birdex. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>
@interface ScannViewController : UIViewController<AVCaptureMetadataOutputObjectsDelegate,UIAlertViewDelegate>
@property (strong, nonatomic)  UIView *viewPreview;
@property (strong, nonatomic)  UILabel *lblStatus;
//@property (weak, nonatomic)  UIButton *startBtn;
- (void)startStopReading;

@property (strong, nonatomic) UIView *boxView;
@property (nonatomic) BOOL isReading;
@property (strong, nonatomic) CALayer *scanLayer;

-(BOOL)startReading;
-(void)stopReading;

//捕捉会话
@property (nonatomic, strong) AVCaptureSession *captureSession;
//展示layer
@property (nonatomic, strong) AVCaptureVideoPreviewLayer *videoPreviewLayer;
//填充摄像头的界面
@property (strong, nonatomic) IBOutlet UIView *cameraView;
//返回按钮
@property (strong, nonatomic) IBOutlet UIBarButtonItem *backBtn;

@property (strong, nonatomic) IBOutlet UIBarButtonItem *cancelBtn;

- (IBAction)cancelPressed:(id)sender;

@end
