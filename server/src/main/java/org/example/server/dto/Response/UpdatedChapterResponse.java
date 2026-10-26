package org.example.server.dto.Response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.UUID;

public record UpdatedChapterResponse(
        @JsonProperty(value = "id") UUID id,
        String title,
        @JsonProperty(value = "cover_image") String coverImage,
        @JsonProperty(value = "latest_chapter") List<Integer> chapter,
        @JsonProperty(value = "created_at") Integer createdAt
        ) {}
