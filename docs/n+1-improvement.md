# N+1 쿼리 문제 개선 기록

## 문제 상황

`GET /api/artworks` 호출 시 `Artwork.artist` 필드가 `@ManyToOne(fetch = LAZY)`로 선언되어 있어,
`ArtworkDto.Response` 생성자 내부에서 `artwork.getArtist().getName()`을 호출할 때마다 추가 쿼리가 발생했다.

작품 N건 조회 시 → artwork SELECT 1회 + artist SELECT N회 = **총 N+1회 쿼리**

---

## 개선 전 (N+1 발생) — 작품 3건 기준 쿼리 4개

`ArtworkRepository`에 `@EntityGraph` 미적용 상태.

```sql
-- 1) artwork 전체 조회 (artist_id만 포함, artist 데이터 없음)
select
    a1_0.id,
    a1_0.artist_id,
    a1_0.description,
    a1_0.display_order,
    a1_0.image_url,
    a1_0.title
from
    artworks a1_0
order by
    a1_0.display_order

-- 2) artist id=1 개별 조회
select
    a1_0.id,
    a1_0.bio,
    a1_0.email,
    a1_0.name,
    a1_0.profile_image_url
from
    artists a1_0
where
    a1_0.id=?

-- 3) artist id=2 개별 조회
select ... from artists a1_0 where a1_0.id=?

-- 4) artist id=3 개별 조회
select ... from artists a1_0 where a1_0.id=?
```

전체 로그: `app-before.log` (프로젝트 루트)

---

## 개선 후 (@EntityGraph 적용) — 쿼리 1개

```java
// ArtworkRepository.java
@EntityGraph(attributePaths = "artist")
List<Artwork> findAllByOrderByDisplayOrderAsc();

@EntityGraph(attributePaths = "artist")
List<Artwork> findByArtistId(Long artistId);
```

```sql
-- artwork + artist를 LEFT JOIN으로 한 번에 조회
select
    a1_0.id,
    a2_0.id,
    a2_0.bio,
    a2_0.email,
    a2_0.name,
    a2_0.profile_image_url,
    a1_0.description,
    a1_0.display_order,
    a1_0.image_url,
    a1_0.title
from
    artworks a1_0
left join
    artists a2_0
        on a2_0.id=a1_0.artist_id
order by
    a1_0.display_order
```

전체 로그: `app.log` (프로젝트 루트)

---

## 결과

| 조건 | 쿼리 수 |
|------|--------|
| 개선 전 (작품 3건) | 4회 (1 + N) |
| 개선 후 (작품 3건) | 1회 (LEFT JOIN) |

작품이 N건으로 늘어나도 개선 후에는 항상 1회 고정.

확인 환경: Spring Boot 3.4.5 / H2 인메모리 / `logging.level.org.hibernate.SQL: debug`  
확인 일시: 2026-08-24
