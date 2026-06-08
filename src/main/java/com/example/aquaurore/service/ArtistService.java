package com.example.aquaurore.service;

import com.example.aquaurore.domain.Artist;
import com.example.aquaurore.dto.ArtistDto;
import com.example.aquaurore.repository.ArtistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ArtistService {

    private final ArtistRepository artistRepository;

    public List<ArtistDto.Response> findAll() {
        return artistRepository.findAll().stream()
                .map(ArtistDto.Response::new)
                .toList();
    }

    public ArtistDto.Response findById(Long id) {
        Artist artist = artistRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Artist not found: " + id));
        return new ArtistDto.Response(artist);
    }

    @Transactional
    public ArtistDto.Response create(ArtistDto.CreateRequest request) {
        Artist artist = Artist.builder()
                .name(request.getName())
                .email(request.getEmail())
                .bio(request.getBio())
                .profileImageUrl(request.getProfileImageUrl())
                .build();
        return new ArtistDto.Response(artistRepository.save(artist));
    }
}
