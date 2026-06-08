package com.example.aquaurore.dto;

import com.example.aquaurore.domain.Artist;
import lombok.Getter;

public class ArtistDto {

    @Getter
    public static class Response {
        private final Long id;
        private final String name;
        private final String email;
        private final String bio;
        private final String profileImageUrl;

        public Response(Artist artist) {
            this.id = artist.getId();
            this.name = artist.getName();
            this.email = artist.getEmail();
            this.bio = artist.getBio();
            this.profileImageUrl = artist.getProfileImageUrl();
        }
    }

    @Getter
    public static class CreateRequest {
        private String name;
        private String email;
        private String bio;
        private String profileImageUrl;
    }
}
