package org.example.server.service;

import lombok.RequiredArgsConstructor;
import org.example.server.dto.Response.NewBookResponse;
import org.example.server.dto.Response.UpdatedChapterResponse;
import org.example.server.entity.Book;
import org.example.server.entity.BookStatus;
import org.example.server.entity.BookTag;
import org.example.server.repository.BookRepository;
import org.example.server.repository.BookTagRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookTagRepository bookTagRepository;
    private final BookRepository bookRepository;

    private Map<UUID, List<String>> getTagsByBookId(List<Book> books) {
        List<UUID> ids = books.stream()
                .map(Book::getId)
                .toList();
        if (ids.isEmpty()) return Map.of();

        return bookTagRepository.findByBookIds(ids).stream()
                .collect(Collectors.groupingBy(
                        BookTag::getId,
                        Collectors.mapping(bt -> bt.getTag().getName(),
                        Collectors.toList())
                ));
    }

    private List<String> getTags(List<String> names) {
        //    HELPER METHODS
        int MAX_TAGS = 2;
        return names.stream().sorted().limit(MAX_TAGS).toList();
    }

    private List<Book> findNewBooks() {
        return bookRepository
                .findTop5ByOrderByCreatedAtDesc(BookStatus.PUBLISHED);
    }

    private NewBookResponse toNewBookResponse(Book book, Map<UUID, List<String>> tags) {
        return new NewBookResponse(
                book.getId(),
                book.getTitle(),
                getTags(tags.getOrDefault(book.getId(), List.of())),
                book.getCoverImage(),
                book.getCreatedAt()
        );
    }

//    END OF HELPER METHODS

    @Transactional(readOnly = true)
    @Cacheable(value = "book", key = "'new'")
    public List<NewBookResponse> getNewBooks() {
        List<Book> books = bookRepository.findTop5ByOrderByCreatedAtDesc(BookStatus.PUBLISHED);
        Map<UUID, List<String>> tags = getTagsByBookId(books);
        return findNewBooks().stream()
                .map(br -> toNewBookResponse(br, tags))
                .toList();
    }

//    @Transactional(readOnly = true)
//    @Cacheable(value = "book", key = "'latestChapter'")
//    public List<UpdatedChapterResponse> getUpdatedChapter() {
//    }
}
