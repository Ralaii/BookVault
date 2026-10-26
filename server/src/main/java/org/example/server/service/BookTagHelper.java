package org.example.server.service;

import lombok.RequiredArgsConstructor;
import org.example.server.repository.BookTagRepository;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class BookTagHelper {
    private final BookTagRepository bookTagRepository;
    private static final int MAX_TAGS = 2;

    public Map<UUID, List<String>> tagsByBookId(Collection<UUID> bookIds) {
        if (bookIds.isEmpty()) return Map.of();

        return bookTagRepository.findByBookIds(List.copyOf(bookIds)).stream()
                .collect(Collectors.groupingBy(
                        bt -> bt.getBook().getId(),
                        Collectors.mapping(bt -> bt.getTag().getName(),
                        Collectors.toList())
                ));
    }

    public List<String> extractTags(List<String> names) {
        return names.stream().sorted().limit(MAX_TAGS)
                .toList();
    }
}
