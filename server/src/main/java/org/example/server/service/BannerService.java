package org.example.server.security;

import lombok.RequiredArgsConstructor;
import org.example.server.dto.BannerResponse;
import org.example.server.entity.Banner;
import org.example.server.entity.Book;
import org.example.server.entity.BookRanking;
import org.example.server.repository.BannerRepository;
import org.example.server.repository.BookRankingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@RequiredArgsConstructor
public class BannerService {

    private final BannerRepository bannerRepository;
    private final BookRankingRepository bookRankingRepository;

    @Transactional(readOnly = true)
    public List<BannerResponse> getBanners() {
        List<Banner> banners = bannerRepository.findByActiveTrueOrderByPositionAsc();

        if (!banners.isEmpty()) {
            return banners.stream().map(this::fromBanner).toList();
        }

        return bookRankingRepository.findTop10ByOrderByRankAsc().stream()
                .map(this::fromRanking)
                .toList();
    }

    private BannerResponse fromBanner(Banner banner) {
        Book book = banner.getBook();
        return new BannerResponse(
          book.getId(),
          book.getTitle(),
          banner.getImageUrl(),
          book.getCoverImage()
        );
    }

    private BannerResponse fromRanking(BookRanking bookRanking) {
        Book book = bookRanking.getBook();
        return new BannerResponse(
          book.getId(),
          book.getTitle(),
          null,
          book.getCoverImage()
        );
    }
}
