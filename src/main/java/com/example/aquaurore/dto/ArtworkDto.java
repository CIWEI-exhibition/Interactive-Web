package com.example.aquaurore.dto;

import com.example.aquaurore.domain.Artwork;
import lombok.Getter;

public class ArtworkDto {

    @Getter
    public static class Response {
        private final Long id;
        private final String title;
        private final String description;
        private final String imageUrl;
        private final Integer displayOrder;
        private final Long artistId;
        private final String artistName;

        public Response(Artwork artwork) {
            this.id = artwork.getId();
            this.title = artwork.getTitle();
            this.description = artwork.getDescription();
            this.imageUrl = artwork.getImageUrl();
            this.displayOrder = artwork.getDisplayOrder();
            this.artistId = artwork.getArtist() != null ? artwork.getArtist().getId() : null;
            this.artistName = artwork.getArtist() != null ? artwork.getArtist().getName() : null;
        }
    }

    @Getter
    public static class CreateRequest {
        private String title;
        private String description;
        private String imageUrl;
        private Integer displayOrder;
        private Long artistId;
    }
}
