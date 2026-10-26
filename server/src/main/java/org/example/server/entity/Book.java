package org.example.server.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "books", check = @CheckConstraint(constraint = "status IN ('draft', 'published')"))
@Getter
@Setter
@NoArgsConstructor

public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private Author author;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "text")
    private String description;

    @Column(name = "cover_image", columnDefinition = "text")
    private String coverImage;

    @Column(name = "latest_chapter_number")
    private Integer latestChapterNumber;

    @Column(name = "published_year")
    private Integer publishedYear;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private AppUser createdBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookStatus status = BookStatus.DRAFT;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @OneToMany(mappedBy = "book")
    private Set<BookTag> bookTags = new HashSet<>();

    @OneToMany(mappedBy = "book")
    private Set<Chapter> chapters = new HashSet<>();
}