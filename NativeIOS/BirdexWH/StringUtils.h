//
//  StringUtils.h
//  BirdexDepot
//
//  Created by 胡伟 on 16/3/14.
//  Copyright © 2016年 birdex. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "MyConfig.h"
@interface StringUtils : NSObject
+ (BOOL) isBlankString:(NSString *)string ;
+(CGSize)lableTextSize:(NSString *)text textFont:(UIFont *)font initSize:(CGSize)size;
@end
