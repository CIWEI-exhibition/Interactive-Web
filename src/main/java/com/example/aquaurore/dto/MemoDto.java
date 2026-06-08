package com.example.aquaurore.dto;

import com.example.aquaurore.domain.Memo;
import lombok.Getter;

import java.time.LocalDateTime;

public class MemoDto {

    @Getter
    public static class Response {
        private final Long id;
        private final String nickname;
        private final String content;
        private final String color;
        private final LocalDateTime createdAt;

        public Response(Memo memo) {
            this.id = memo.getId();
            this.nickname = memo.getNickname();
            this.content = memo.getContent();
            this.color = memo.getColor();
            this.createdAt = memo.getCreatedAt();
        }
    }

    @Getter
    public static class CreateRequest {
        private String nickname;
        private String content;
        private String color;
    }
}
