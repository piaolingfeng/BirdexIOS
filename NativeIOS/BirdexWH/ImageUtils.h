//
//  ImageUtils.h
//  BirdexDepot
//
//  Created by 胡伟 on 16/3/15.
//  Copyright © 2016年 birdex. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
@interface ImageUtils : NSObject
+(UIImage*)imageByScalingAndCroppingForSize:(CGSize)targetSize source:(UIImage *) myimage;
+ (UIImage *)compressImage:(UIImage *)image toMaxFileSize:(NSInteger)maxFileSize;
@end
