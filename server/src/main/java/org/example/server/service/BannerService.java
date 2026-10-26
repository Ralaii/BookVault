package org.example.server.service;

import lombok.RequiredArgsConstructor;
import org.example.server.dto.Response.BannerResponse;
import org.example.server.entity.Banner;
import org.example.server.entity.Book;
import org.example.server.entity.BookRanking;
import org.example.server.entity.BookStatus;
import org.example.server.repository.BannerRepository;
import org.example.server.repository.BookRankingRepository;
import org.example.server.repository.BookTagRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BannerService {

    private final BannerRepository bannerRepository;
    private final BookRankingRepository bookRankingRepository;
    private final BookTagRepository bookTagRepository;
    private final BookTagHelper bookTagHelper;

    private String extractAuthor(Book book) {
        return book.getAuthor().getAppUser().getUsername();
    }

    private BannerResponse fromBanner(Banner banner, Map<UUID, List<String>> tagsByBookId) {
        Book book = banner.getBook();
        return new BannerResponse(
          book.getId(),
          book.getTitle(),
          banner.getImageUrl(),
          book.getCoverImage(),
          bookTagHelper.extractTags(tagsByBookId.getOrDefault(book.getId(), List.of())),
          extractAuthor(book),
          book.getDescription()
        );
    }

    private BannerResponse fromRanking(BookRanking bookRanking, Map<UUID, List<String>> tags) {
        Book book = bookRanking.getBook();
        return new BannerResponse(
          book.getId(),
          book.getTitle(),
          null,
          book.getCoverImage(),
          bookTagHelper.extractTags(tags.getOrDefault(book.getId(), List.of())),
          extractAuthor(book),
          book.getDescription()
        );
    }
//    END OF HELPER METHODS

    @Transactional(readOnly = true)
    @Cacheable(value = "banner", key = "'home'")
    public List<BannerResponse> getBanners() {
        List<Banner> banners = bannerRepository.findByActiveTrueOrderByPositionAsc(BookStatus.PUBLISHED);

        if (!banners.isEmpty()) {
            Map<UUID, List<String>> tags = bookTagHelper.tagsByBookId(banners.stream().map(b -> b.getBook().getId()).toList());

        return banners.stream()
            .map(br -> fromBanner(br, tags))
            .toList();
        }

        List<BookRanking> rankings = bookRankingRepository.findTop10ByOrderByRankAsc(BookStatus.PUBLISHED);
        Map<UUID, List<String>> tagsByBook = bookTagHelper.tagsByBookId(
                rankings.stream()
                        .map(bi -> bi.getBook().getId())
                        .toList()
        );

        return rankings.stream().map(br -> fromRanking(br, tagsByBook))
                .toList();
    }
}
