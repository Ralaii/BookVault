package org.example.server.controller;

import lombok.RequiredArgsConstructor;
import org.example.server.dto.Response.NewBookResponse;
import org.example.server.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/books")
public class BookController {
    private final BookService bookService;

    @GetMapping("/new")
    public ResponseEntity<List<NewBookResponse>> getNewBooks() {
        return ResponseEntity.ok(bookService.getNewBooks());
    }
}
