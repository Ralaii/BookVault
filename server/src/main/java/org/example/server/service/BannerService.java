package org.example.server.service;

import lombok.RequiredArgsConstructor;
import org.example.server.dto.Response.BannerResponse;
import org.example.server.entity.Banner;
import org.example.server.entity.Book;
import org.example.server.entity.BookRanking;
import org.example.server.entity.BookStatus;
import org.example.server.repository.BannerRepository;
import org.example.server.repository.BookRankingRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@RequiredArgsConstructor
public class BannerService {

    private final BannerRepository bannerRepository;
    private final BookRankingRepository bookRankingRepository;

//  HELPER METHODS
    private List<String> extractTags(Book book) {
        return book.getBookTags().stream()
                .map(bt -> bt.getTag().getName())
                .toList();
    }

    private String extractAuthor(Book book) {
        return book.getAuthor().getAppUser().getUsername();
    }

    private BannerResponse fromBanner(Banner banner) {
        Book book = banner.getBook();
        return new BannerResponse(
          book.getId(),
          book.getTitle(),
          banner.getImageUrl(),
          book.getCoverImage(),
          extractTags(book),
          extractAuthor(book),
          book.getDescription()
        );
    }

    private BannerResponse fromRanking(BookRanking bookRanking) {
        Book book = bookRanking.getBook();
        return new BannerResponse(
          book.getId(),
          book.getTitle(),
          null,
          book.getCoverImage(),
          extractTags(book),
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
            return banners.stream().map(this::fromBanner).toList();
        }

        return bookRankingRepository.findTop10ByOrderByRankAsc(BookStatus.PUBLISHED).stream()
                .map(this::fromRanking)
                .toList();
    }
}
