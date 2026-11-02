package org.example.server.repository;

import org.example.server.entity.Book;
import org.example.server.entity.BookStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BookRepository extends JpaRepository<Book, UUID> {
    List<Book> findTop6ByStatusOrderByCreatedAtDesc(BookStatus status);

//    @EntityGraph(attributePaths = {"chapters",
//        "bookTags", "bookTags.tag"
//    })
//    List<Book> findTop6ByStatusAndLastChapterAtIsNotNullOrderByLastChapterAtDesc(BookStatus status);
}
