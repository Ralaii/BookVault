package org.example.server.dto.Response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

public record Ranked200BookResponse(
        @JsonProperty("id") UUID id,
        String title,
        @JsonProperty("cover_image") String coverImage,
        Integer rank,
        List<String> tags
) implements Serializable {}
