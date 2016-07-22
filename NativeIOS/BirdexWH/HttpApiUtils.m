//
//  HttpApiUtils.m
//  BirdexDepot
//
//  Created by 胡伟 on 16/3/15.
//  Copyright © 2016年 birdex. All rights reserved.
//

#import "HttpApiUtils.h"
#import "AFNetworking.h"
#import "StringUtils.h"
@implementation HttpApiUtils
//Get 请求
+ (void)get:(NSString *)url withParams:(NSMutableDictionary *)params success:(void(^)(id responseObj))success failure:(void(^)(NSError *eroor))failure;
{
    AFHTTPRequestOperationManager *httpManager=[AFHTTPRequestOperationManager manager];
    
    
    //解决3840错误
    httpManager.requestSerializer=[AFHTTPRequestSerializer serializer];
    httpManager.responseSerializer=[AFHTTPResponseSerializer serializer];
    httpManager.responseSerializer.acceptableContentTypes=[NSSet setWithObjects:@"application/json", @"text/json", @"text/javascript",@"text/html",@"text/plain", nil];
//    httpManager.responseSerializer.acceptableContentTypes=[NSSet setWithObjects:@"application/json",@"text/html",@"text/plain", nil];
    NSString *timeOut=[params objectForKey:@"timeOut"];
    if (![StringUtils isBlankString:timeOut]) {
        double timeout=[timeOut floatValue];
        [httpManager.requestSerializer willChangeValueForKey:@"timeoutInterval"];
        httpManager.requestSerializer.timeoutInterval=5.0;
        [httpManager.requestSerializer didChangeValueForKey:@"timeoutInterval"];
        
        [params removeObjectForKey:@"timeOut"];
    }else
    {
        [httpManager.requestSerializer willChangeValueForKey:@"timeoutInterval"];
        httpManager.requestSerializer.timeoutInterval=5.0;
        [httpManager.requestSerializer didChangeValueForKey:@"timeoutInterval"];
    }
    
    httpManager.requestSerializer.cachePolicy = NSURLRequestReloadIgnoringLocalCacheData;
    
    [httpManager GET:url parameters:params success:^(AFHTTPRequestOperation *operation, id responseObject) {
        if(success)
        {
            success(responseObject);
            
        }
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        if(failure)
        {
            failure(error);
        }
    }];
    
    
}

//post请求
+(void)post:(NSString *)url withParams:(NSMutableDictionary *)params success:(void(^)(id responseObj))success failure:(void(^)(NSError *error))failure
{
    AFHTTPRequestOperationManager *httpManager=[AFHTTPRequestOperationManager manager];
    //解决3840错误
    httpManager.requestSerializer=[AFJSONRequestSerializer serializer];
    httpManager.responseSerializer=[AFHTTPResponseSerializer serializer];
//    httpManager.responseSerializer.acceptableContentTypes=[NSSet setWithObjects:@"application/json", @"text/json", @"text/javascript",@"text/html",@"text/plain", nil];
    httpManager.responseSerializer.acceptableContentTypes=[NSSet setWithObjects:@"application/json", nil];
//    [httpManager.requestSerializer setValue:@"application/json"forHTTPHeaderField:@"Accept"];
//    [httpManager.requestSerializer setValue:@"application/x-www-form-urlencoded;charset=utf-8"forHTTPHeaderField:@"Content-Type"];
    httpManager.requestSerializer.HTTPMethodsEncodingParametersInURI = [NSSet setWithArray:@[@"POST", @"GET", @"HEAD"]];
    NSString *timeOut=[params objectForKey:@"timeOut"];
    if (![StringUtils isBlankString:timeOut]) {
        double timeout=[timeOut floatValue];
        [httpManager.requestSerializer willChangeValueForKey:@"timeoutInterval"];
        httpManager.requestSerializer.timeoutInterval=5.0;
        [httpManager.requestSerializer didChangeValueForKey:@"timeoutInterval"];
        [params removeObjectForKey:@"timeOut"];
    }else
    {
        
        [httpManager.requestSerializer willChangeValueForKey:@"timeoutInterval"];
        httpManager.requestSerializer.timeoutInterval=8.0;
        [httpManager.requestSerializer didChangeValueForKey:@"timeoutInterval"];
    }
    [httpManager POST:url parameters:params success:^(AFHTTPRequestOperation *operation, id responseObject) {
        if(success)
        {
            success(responseObject);
            
        }
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        if(failure)
        {
            failure(error);
        }
    }];
    
}
//上传
+ (void)postUploadWithUrl:(NSString *)urlStr withParams:(NSMutableDictionary *)params data:(NSData *)data fileName:(NSString *)fileName fileType:(NSString *)fileTye success:(void (^)(id responseObject))success fail:(void (^)())fail
{
    // 本地上传给服务器时,没有确定的URL,不好用MD5的方式处理appendPartWithFileData
    AFHTTPRequestOperationManager *httpManager = [AFHTTPRequestOperationManager manager];
//    NSString *timeOut=[params objectForKey:@"timeOut"];
//    if (![StringUtils isBlankString:timeOut]) {
//        double timeout=[timeOut floatValue];
//        [httpManager.requestSerializer willChangeValueForKey:@"timeoutInterval"];
//        httpManager.requestSerializer.timeoutInterval=5.0;
//        [httpManager.requestSerializer didChangeValueForKey:@"timeoutInterval"];
//        
//        [params removeObjectForKey:@"timeOut"];
//    }else
//    {
//        
        [httpManager.requestSerializer willChangeValueForKey:@"timeoutInterval"];
        httpManager.requestSerializer.timeoutInterval=10.0;
        [httpManager.requestSerializer didChangeValueForKey:@"timeoutInterval"];
    httpManager.responseSerializer.acceptableContentTypes=[NSSet setWithObjects:@"application/json", @"text/json", @"text/javascript",@"text/html",@"image/jpg", nil];
//    }
    
    //httpManager.requestSerializer=[AFHTTPRequestSerializer serializer];
    httpManager.responseSerializer = [AFHTTPResponseSerializer serializer];
    
    [httpManager POST:urlStr parameters:params constructingBodyWithBlock:^(id<AFMultipartFormData> formData) {
//        [formData  appendPartWithFileURL:fileURL name:@"uploadFile" fileName:fileName mimeType:fileTye error:NULL];
        [formData appendPartWithFileData:data name:@"uploadFile" fileName:fileName mimeType:@"image/jpeg"];
        
    } success:^(AFHTTPRequestOperation *operation, id responseObject) {
        if (success) {
            success(responseObject);
        }
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        if (fail) {
            fail();
        }
    }];
    
}



#pragma mark 取消单个网络请求
//+(void)cancelOneRequest{
//    AFHTTPRequestOperation *operation = [[AFHTTPRequestOperation alloc] initWithRequest:request];
//
//    [operation cancel];
//}



#pragma 取消所有请求
+(void)cancelAllRequest{
    
    AFHTTPRequestOperationManager *httpManager=[AFHTTPRequestOperationManager manager];
    [httpManager.operationQueue cancelAllOperations];
}
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
           progress:(void (^)(float progress))progress{
    //    NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
    //    AFURLSessionManager *manager = [[AFURLSessionManager alloc] initWithSessionConfiguration:configuration];
    //
    //    NSURL *URL = [NSURL URLWithString:url];
    //    NSURLRequest *request = [NSURLRequest requestWithURL:URL];
    //
    //    NSURLSessionDownloadTask *downloadTask = [manager downloadTaskWithRequest:request progress:nil destination:^NSURL *(NSURL *targetPath, NSURLResponse *response) {
    //        NSURL *documentsDirectoryURL = [[NSFileManager defaultManager] URLForDirectory:NSDocumentDirectory inDomain:NSUserDomainMask appropriateForURL:nil create:NO error:nil];
    //        return [documentsDirectoryURL URLByAppendingPathComponent:[response suggestedFilename]];
    //    } completionHandler:^(NSURLResponse *response, NSURL *filePath, NSError *error) {
    ////        NSLog(@"File downloaded to: %@", filePath);
    //        if(response!=nil){
    //            success(response);
    //        }
    //    }];
    //    [downloadTask resume];
    
    
    AFHTTPRequestSerializer *serializer=[AFHTTPRequestSerializer serializer];
    //设置超时
    [serializer setTimeoutInterval:5];
    NSMutableURLRequest *request=[serializer requestWithMethod:@"get" URLString:url parameters:param error:nil];
    AFHTTPRequestOperation *operation=[[AFHTTPRequestOperation alloc]initWithRequest:request];
    
    [operation setOutputStream:[NSOutputStream outputStreamToFileAtPath:path append:NO]];
    [operation setDownloadProgressBlock:^(NSUInteger bytesRead, long long totalBytesRead, long long totalBytesExpectedToRead) {
        float p = (float)totalBytesRead / totalBytesExpectedToRead;
        progress(p);
    }];
    [operation setCompletionBlockWithSuccess:^(AFHTTPRequestOperation *operation, id responseObject) {
        //        if(responseObject!=nil){
        success(responseObject);
        //        }
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        //        if(error!=nil){
        failure(error);
        //        }
    }];
    [operation start];
}

/**
 *  上传带图片的内容，允许多张图片上传（URL）POST
 *
 *  @param url                 网络请求地址
 *  @param images              要上传的图片数组（注意数组内容需是图片）  huwei改为路径
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
                          succeedBlock:(void (^)(id, id))succeedBlock
                           failedBlock:(void (^)(id, NSError *))failedBlock
                   uploadProgressBlock:(void (^)(float, long long, long long))uploadProgressBlock{
    
    
    AFHTTPRequestOperationManager *httpManager = [AFHTTPRequestOperationManager manager];
    [httpManager.requestSerializer willChangeValueForKey:@"timeoutInterval"];
    httpManager.requestSerializer.timeoutInterval=5.0;
    [httpManager.requestSerializer didChangeValueForKey:@"timeoutInterval"];
    httpManager.responseSerializer.acceptableContentTypes=[NSSet setWithObjects:@"application/json", @"text/json", @"text/javascript",@"text/html",@"image/jpg", nil];
    AFHTTPRequestOperation *operation = [httpManager POST:url parameters:parameters constructingBodyWithBlock:^(id<AFMultipartFormData> formData) {
        int i = 0;
        //根据当前系统时间生成图片名称
        NSDate *date = [NSDate date];
        NSDateFormatter *formatter = [[NSDateFormatter alloc]init];
        [formatter setDateFormat:@"yyyyMMddHHmmss"];
        NSString *dateString = [formatter stringFromDate:date];
        NSString *fileName = [NSString stringWithFormat:@"%@.jpg",dateString];
//        for (NSString *image in images) {
//            NSString *fileName = [NSString stringWithFormat:@"%@%d.png",dateString,i];
//            i++;
////            NSData *imageData;
////            if (ratio > 0.0f && ratio < 1.0f) {
////                imageData = UIImageJPEGRepresentation(image, ratio);
////            }else{
////                imageData = UIImageJPEGRepresentation(image, 1.0f);
////            }
////            NSString *imageFile = [documentsDirectory stringByAppendingPathComponent:image];
//            NSData *imageData = [NSData dataWithContentsOfFile:image];
//            [formData appendPartWithFileData:imageData name:parameter fileName:fileName mimeType:@"image/jpg/png/jpeg"];
//        }
        NSData *imageData=UIImageJPEGRepresentation([[UIImage alloc]initWithContentsOfFile:file], 1.0f);
        [formData appendPartWithFileData:imageData name:@"file" fileName:fileName mimeType:@"image/jpeg"];
        
    } success:^(AFHTTPRequestOperation *operation, id responseObject) {
        succeedBlock(operation,responseObject);
        
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        NSLog(@"%@",error);
        failedBlock(operation,error);
        
    }];
    
    [operation setUploadProgressBlock:^(NSUInteger bytesWritten, long long totalBytesWritten, long long totalBytesExpectedToWrite) {
        CGFloat percent = totalBytesWritten * 1.0 / totalBytesExpectedToWrite;
        uploadProgressBlock(percent,totalBytesWritten,totalBytesExpectedToWrite);
    }];
    
}
@end
