package org.example.server.repository;

import org.example.server.entity.Banner;
import org.example.server.entity.BookStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BannerRepository extends JpaRepository<Banner, UUID> {
    @EntityGraph(attributePaths = {"book",
            "book.bookTags", "book.bookTags.tag",
            "book.author", "book.author.appUser"
    })
    List<Banner> findByActiveTrueOrderByPositionAsc(BookStatus status);
}
