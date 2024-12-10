package com.mediaapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class FileStorageService {
    @Autowired
    private MediaFileRepository mediaFileRepository;

    public MediaFile storeFile(MultipartFile file, String caption) throws IOException {
        MediaFile mediaFile = new MediaFile();
        mediaFile.setFileName(file.getOriginalFilename());
        mediaFile.setFileType(file.getContentType());
        mediaFile.setData(file.getBytes());
        mediaFile.setCaption(caption);

        return mediaFileRepository.save(mediaFile);
    }

    public List<MediaFile> getAllFiles() {
        return mediaFileRepository.findAll();
    }

    public void deleteFile(Long id) {
        mediaFileRepository.deleteById(id);
    }
}
