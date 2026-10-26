package org.example.server.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.example.server.entity.BookTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface BookTagRepository extends JpaRepository<BookTag, UUID> {
    @Query("select bt from BookTag bt join fetch bt.tag where bt.book.id in :bookIds")
    List<BookTag> findByBookIds(@Param("bookIds") List<UUID> bookIds);
}
