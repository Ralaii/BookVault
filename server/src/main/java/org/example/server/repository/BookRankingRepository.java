package org.example.server.repository;

import org.example.server.entity.BookRanking;
import org.example.server.entity.BookStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BookRankingRepository extends JpaRepository<BookRanking, UUID> {

    @EntityGraph(attributePaths = {"book",
            "book.bookTags", "book.bookTags.tag",
            "book.author", "book.author.appUser"
    })
    List<BookRanking> findTop10ByOrderByRankAsc(BookStatus status);

    List<BookRanking> findTop200ByBookStatusOrderByRankAsc(BookStatus status);

    List<BookRanking> findTop6ByBookStatusOrderByRankAsc(BookStatus status);
}
