package org.example.server.dto.Response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record NewBookResponse(
        @JsonProperty(value = "id") UUID id,
        String title,
        List<String> tags,
        @JsonProperty(value = "cover_image") String coverImage,
        @JsonProperty(value = "created_at") Instant createdAt
) {
}
