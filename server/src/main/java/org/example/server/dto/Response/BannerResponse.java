package org.example.server.dto.Response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

public record BannerResponse(
        @JsonProperty("id") UUID bookId,
        String title,
        @JsonProperty("image_url") String imageUrl,
        @JsonProperty("cover_image") String coverImage,
        List<String> tags,
        String author,
        String description
) implements Serializable {}