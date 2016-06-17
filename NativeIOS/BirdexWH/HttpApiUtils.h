//
//  HttpApiUtils.h
//  BirdexDepot
//
//  Created by 胡伟 on 16/3/15.
//  Copyright © 2016年 birdex. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface HttpApiUtils : NSObject
{
    NSTimeInterval timeOut;
    
}
@property(nonatomic,assign)NSTimeInterval timeOut;
//get请求
+ (void)get:(NSString *)url withParams:(NSMutableDictionary *)params success:(void(^)(id responseObj))success failure:(void(^)(NSError *eroor))failure;

//post请求
+(void)post:(NSString *)url withParams:(NSMutableDictionary *)params success:(void(^)(id responseObj))success failure:(void(^)(NSError *error))failure;
//上传
+ (void)postUploadWithUrl:(NSString *)urlStr withParams:(NSMutableDictionary *)params data:(NSData *)data fileName:(NSString *)fileName fileType:(NSString *)fileTye success:(void (^)(id responseObject))success fail:(void (^)())fail;
//取消所有请求
+(void)cancelAllRequest;
/*  @param param   附加post参数
 *  @param requestURL 请求地址
 *  @param savedPath  保存 在磁盘的位置
 *  @param success    下载成功回调
 *  @param failure    下载失败回调
 *  @param progress   实时下载进度回调
 */
+(void)fileDownload:(NSString *)url
          withParam:(NSDictionary *)param
           savePath:(NSString *)path
            success:(void(^)(id response))success
            failure:(void(^)(NSError *error))failure
           progress:(void (^)(float progress))progress;
/**
 *  上传带图片的内容，允许多张图片上传（URL）POST
 *
 *  @param url                 网络请求地址
 *  @param images              要上传的图片数组（注意数组内容需是图片）
 *  @param parameter           图片数组对应的参数
 *  @param parameters          其他参数字典
 *  @param ratio               图片的压缩比例（0.0~1.0之间）
 *  @param succeedBlock        成功的回调
 *  @param failedBlock         失败的回调
 *  @param uploadProgressBlock 上传进度的回调
 */
+(void)startMultiPartUploadTaskWithURL:(NSString *)url
                           image:(NSString *)file
                     parameterOfimages:(NSString *)parameter
                        parametersDict:(NSDictionary *)parameters
                      compressionRatio:(float)ratio
                          succeedBlock:(void(^)(id operation, id responseObject))succeedBlock
                           failedBlock:(void(^)(id operation, NSError *error))failedBlock
                   uploadProgressBlock:(void(^)(float uploadPercent,long long totalBytesWritten,long long totalBytesExpectedToWrite))uploadProgressBlock;
@end
