//
//  StringUtils.m
//  BirdexDepot
//
//  Created by 胡伟 on 16/3/14.
//  Copyright © 2016年 birdex. All rights reserved.
//

#import "StringUtils.h"

@implementation StringUtils

//pragma 获取文本的自身宽高
+(CGSize)lableTextSize:(NSString *)text textFont:(UIFont *)font initSize:(CGSize)size{
    CGSize  actualsize ;
    if(IOS_VERSION_7_OR_ABOVE){
        NSDictionary * tdic = [NSDictionary dictionaryWithObjectsAndKeys:font,NSFontAttributeName,nil];
        actualsize =[text boundingRectWithSize:size options:NSStringDrawingUsesLineFragmentOrigin  attributes:tdic context:nil].size;
    }else{
        actualsize = [text sizeWithFont:font constrainedToSize:size lineBreakMode:NSLineBreakByCharWrapping];//ios7以上已经摒弃的这个方法
    }
    actualsize=CGSizeMake(ceil(actualsize.width), ceil(actualsize.height));
    return actualsize;
}
+ (BOOL) isBlankString:(NSString *)string {
    if (string == nil || string == NULL) {
        return YES;
    }
    if ([string isKindOfClass:[NSNull class]]) {
        return YES;
    }
    if ([[string stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]] length]==0) {
        return YES;
    }
    return NO;
}
@end
