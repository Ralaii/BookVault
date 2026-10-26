package org.example.server.service;

import lombok.RequiredArgsConstructor;
import org.example.server.dto.Response.Ranked06BookResponse;
import org.example.server.dto.Response.Ranked200BookResponse;
import org.example.server.entity.Book;
import org.example.server.entity.BookRanking;
import org.example.server.entity.BookStatus;
import org.example.server.entity.BookTag;
import org.example.server.repository.BookRankingRepository;
import org.example.server.repository.BookTagRepository;
import org.example.server.repository.ChapterRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookRankingService {
    private final BookTagRepository bookTagRepository;
    private final BookRankingRepository bookRankingRepository;
    private final ChapterRepository chapterRepository;

    private static final int MAX_TAGS = 2;

    private Map<UUID, List<String>> tagsByBooks(List<BookRanking> bookRankings) {
        List<UUID> ids = bookRankings.stream()
                .map(r -> r.getBook().getId())
                .toList();
        if (ids.isEmpty()) return Map.of();

        return bookTagRepository.findByBookIds(ids).stream()
                .collect(Collectors.groupingBy(
                        bt -> bt.getBook().getId(),
                        Collectors.mapping(bt -> bt.getTag().getName(), Collectors.toList())
                ));
    }

    private Map<UUID, List<String>> getBookTags(List<BookRanking> bookRankings) {
        List<UUID> ids = bookRankings.stream()
                .map(br -> br.getBook().getId())
                .toList();
        if (ids.isEmpty()) return Map.of();

        return bookTagRepository.findByBookIds(ids).stream()
                .collect(
                        Collectors.groupingBy(
                        bi -> bi.getBook().getId(),

                        Collectors.mapping(bt -> bt.getTag().getName(),

                        Collectors.toList()))
                );
    }

    private List<String> topTags(List<String> names) {
        return names.stream().sorted().limit(MAX_TAGS).toList();
    }

    private long totalChapters(UUID book_id) {
        return chapterRepository
                .countByBookId(book_id);
    }
    private List<BookRanking> findTop200Books() {
        return bookRankingRepository
                .findTop200ByBookStatusOrderByRankAsc(BookStatus.PUBLISHED);
    }

    private List<BookRanking> findTop6Books() {
        return bookRankingRepository
                .findTop6ByBookStatusOrderByRankAsc(BookStatus.PUBLISHED);
    }

    private Ranked200BookResponse toRanked200BookResponse(BookRanking bookRanking, Map<UUID, List<String>> tags) {
        Book book = bookRanking.getBook();
        return new Ranked200BookResponse(
                book.getId(),
                book.getTitle(),
                book.getCoverImage(),
                bookRanking.getRank(),
                topTags(tags.getOrDefault(book.getId(), List.of()))
        );
    }

    private Ranked06BookResponse toRanked06BookResponse(BookRanking bookRanking, Map<UUID, List<String>> tags) {
        Book book = bookRanking.getBook();
        return new Ranked06BookResponse(
                book.getId(),
                book.getTitle(),
                book.getCoverImage(),
                totalChapters(book.getId()),
                bookRanking.getRank(),
                topTags(tags.getOrDefault(book.getId(), List.of()))
        );
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "ranking", key = "'top200'")
    public List<Ranked200BookResponse> getTop200Books() {

        List<BookRanking> bookRankings = findTop200Books();
        Map<UUID, List<String>> tags = getBookTags(bookRankings);

        return findTop200Books().stream()
                .map(br -> toRanked200BookResponse(br, tags))
                .toList();
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "popular", key = "'top6'")
    public List<Ranked06BookResponse> getTop6Books() {

        List<BookRanking> bookRankings = findTop6Books();
        Map<UUID, List<String>> tags = getBookTags(bookRankings);

        return findTop6Books().stream()
                .map(br -> toRanked06BookResponse(br, tags))
                .toList();
    }
}
