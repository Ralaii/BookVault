package org.example.server.controller;

import lombok.RequiredArgsConstructor;
import org.example.server.dto.Response.Ranked06BookResponse;
import org.example.server.dto.Response.Ranked200BookResponse;
import org.example.server.service.BookRankingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/books")
@RequiredArgsConstructor
public class BookRankingController {
    private final BookRankingService bookRankingService;

    @GetMapping("/popular")
    public ResponseEntity<List<Ranked06BookResponse>> getTop6() {
        return ResponseEntity.ok
                (bookRankingService.getTop6Books());
    }

    @GetMapping("/ranking")
    public ResponseEntity<List<Ranked200BookResponse>> getTop200() {
        return ResponseEntity.ok
                (bookRankingService.getTop200Books());
    }
}
