package org.example.server.dto.Response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

public record Ranked06BookResponse(
        @JsonProperty("id") UUID id,
        String title,
        @JsonProperty("cover_image") String coverImage,
        @JsonProperty("total_chap") long totalChapter,
        Integer rank,
        List<String> tags
) implements Serializable {}
