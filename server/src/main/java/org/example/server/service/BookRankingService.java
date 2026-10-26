package org.example.server.service;

import lombok.RequiredArgsConstructor;
import org.example.server.dto.Response.Ranked06BookResponse;
import org.example.server.dto.Response.Ranked200BookResponse;
import org.example.server.entity.Book;
import org.example.server.entity.BookRanking;
import org.example.server.repository.ChapterRepository;
import org.example.server.repository.PopularBookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PopularBookService {
    private final PopularBookRepository popularBookRepository;
    private final ChapterRepository chapterRepository;

    private long totalChapters(UUID book_id) {
        return chapterRepository
                .countByBook_id(book_id);
    }
    private List<BookRanking> findTop200Books() {
        return popularBookRepository
                .findTop200ByOrderByViewsThisWeekDesc();
    }

    private List<BookRanking> findTop6Books() {
        return popularBookRepository
                .findTop6ByOrderByViewsThisWeekDesc();
    }

    private Ranked200BookResponse toRanked200BookResponse(BookRanking bookRanking) {
        Book book = bookRanking.getBook();
        return new Ranked200BookResponse(
                book.getId(),
                book.getTitle(),
                book.getCoverImage()
        );
    }

    private Ranked06BookResponse toRanked06BookResponse(BookRanking bookRanking) {
        Book book = bookRanking.getBook();
        return new Ranked06BookResponse(
                book.getId(),
                book.getTitle(),
                book.getCoverImage(),
                totalChapters(book.getId())
        );
    }

    public List<Ranked200BookResponse> getTop200Books() {
        return findTop200Books().stream()
                .map(this::toRanked200BookResponse)
                .toList();
    }

    public List<Ranked06BookResponse> getTop6Books() {
        return findTop6Books().stream()
                .map(this::toRanked06BookResponse)
                .toList();
    }
}
