package org.example.server.repository;

import org.example.server.entity.Chapter;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ChapterRepository extends JpaRepository<Chapter, UUID> {
    @EntityGraph(attributePaths = {"book"})
    List<Chapter> findByBookId(UUID book_id);
    Long countByBookId(UUID book_id);
}
