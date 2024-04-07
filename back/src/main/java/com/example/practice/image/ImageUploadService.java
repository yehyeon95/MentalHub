package com.example.practice.image;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImageUploadService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3Client amazonS3Client;

    public ImageUploadService(AmazonS3Client amazonS3Client) {
        this.amazonS3Client = amazonS3Client;
    }

    public ImageResponseDto imageUpload(MultipartFile file) throws IOException {
        String fileName = getFileName(file);

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());

        amazonS3Client.putObject(new PutObjectRequest(
                bucket, fileName, file.getInputStream(), metadata
        ));
        ImageResponseDto imageResponseDto = new ImageResponseDto();
        imageResponseDto.setImageUrl(String.valueOf(amazonS3Client.getUrl(bucket, fileName)));
        return imageResponseDto;
    }

    private String getFileName(MultipartFile file) {
        return StringUtils.cleanPath(file.getOriginalFilename());
    }
}
