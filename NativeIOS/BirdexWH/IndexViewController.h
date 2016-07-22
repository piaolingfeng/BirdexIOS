//
//  IndexViewController.h
//  BirdexWH
//
//  Created by birdexbirdex on 16/6/3.
//  Copyright © 2016年 birdex. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <JavaScriptCore/JavaScriptCore.h>
#import <AddressBookUI/ABPeoplePickerNavigationController.h>
#import <AddressBook/ABPerson.h>
#import <AddressBookUI/ABPersonViewController.h>

#import "MyConfig.h"
@interface IndexViewController : UIViewController<UIWebViewDelegate, UIImagePickerControllerDelegate, UINavigationControllerDelegate, ABPeoplePickerNavigationControllerDelegate>
@property (strong, nonatomic) IBOutlet UIWebView *wv_page;

- (void)rechargeFinishWithSuccess:(BOOL)status;

@end
