package org.example.server.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "book_rankings")
@Getter
@Setter
@NoArgsConstructor
public class BookRanking {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", unique = true)
    private Book book;

    @Column(name = "views_today")
    private Integer viewsToday = 0;

    @Column(name = "views_this_week")
    private Integer viewsThisWeek = 0;

    private Integer rank;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}