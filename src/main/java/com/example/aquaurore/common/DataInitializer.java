package com.example.aquaurore.common;

import com.example.aquaurore.domain.*;
import com.example.aquaurore.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ArtistRepository artistRepository;
    private final ArtworkRepository artworkRepository;
    private final GoodsRepository goodsRepository;
    private final MemoRepository memoRepository;

    @Override
    public void run(String... args) {
        if (artistRepository.count() > 0) return;

        Artist chaewon = artistRepository.save(Artist.builder()
                .name("김채원")
                .email("chaewon@aquaurore.com")
                .bio("일상의 감정을 시각화하는 작가입니다.\n작은 순간들이 모여 하나의 이야기가 됩니다.")
                .profileImageUrl("")
                .build());

        Artist jiyoung = artistRepository.save(Artist.builder()
                .name("정지영")
                .email("jiyoung@aquaurore.com")
                .bio("빛과 색의 경계를 탐구합니다.\n보이지 않는 것들을 보이게 만드는 작업을 합니다.")
                .profileImageUrl("")
                .build());

        Artist yena = artistRepository.save(Artist.builder()
                .name("전예나")
                .email("yena@aquaurore.com")
                .bio("자연과 인간 사이의 관계를 작품으로 표현합니다.\n물, 바람, 빛을 주요 소재로 사용합니다.")
                .profileImageUrl("")
                .build());

        artworkRepository.save(Artwork.builder()
                .title("소란한 봄날")
                .description("봄날의 소란함 속에서 찾은 고요함")
                .imageUrl("")
                .displayOrder(1)
                .artist(chaewon)
                .build());

        artworkRepository.save(Artwork.builder()
                .title("흔들리는 빛")
                .description("수면 위에 반사되는 빛의 흔들림")
                .imageUrl("")
                .displayOrder(1)
                .artist(jiyoung)
                .build());

        artworkRepository.save(Artwork.builder()
                .title("바람의 결")
                .description("바람이 지나간 자리에 남는 것들")
                .imageUrl("")
                .displayOrder(1)
                .artist(yena)
                .build());

        goodsRepository.save(Goods.builder()
                .name("힐링 다이어리")
                .description("AQUAURORE 일러스트가 담긴 다이어리")
                .price(18000)
                .stock(50)
                .imageUrl("")
                .build());

        goodsRepository.save(Goods.builder()
                .name("미니 달력")
                .description("2025 AQUAURORE 미니 달력")
                .price(12000)
                .stock(30)
                .imageUrl("")
                .build());

        goodsRepository.save(Goods.builder()
                .name("일러스트 엽서 세트")
                .description("4종 일러스트 엽서 세트")
                .price(8000)
                .stock(100)
                .imageUrl("")
                .build());

        goodsRepository.save(Goods.builder()
                .name("스티커 팩")
                .description("AQUAURORE 캐릭터 스티커 15종")
                .price(5000)
                .stock(200)
                .imageUrl("")
                .build());

        memoRepository.save(Memo.builder()
                .nickname("방문자1")
                .content("전시 정말 좋았어요 ✨")
                .color("#fef08a")
                .build());

        memoRepository.save(Memo.builder()
                .nickname("aqua_fan")
                .content("다음에 또 오고 싶어요!")
                .color("#bbf7d0")
                .build());
    }
}
