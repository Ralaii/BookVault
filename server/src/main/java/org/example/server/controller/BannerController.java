package org.example.server.controller;

import lombok.RequiredArgsConstructor;
import org.example.server.dto.Response.BannerResponse;
import org.example.server.service.BannerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BannerController {
    private final BannerService bannerService;


    @GetMapping("/banners")
    public ResponseEntity<List<BannerResponse>> getBanners() {
        return ResponseEntity.ok(bannerService.getBanners());
    }
}
