package com.example.aquaurore.service;

import com.example.aquaurore.domain.Artist;
import com.example.aquaurore.domain.Artwork;
import com.example.aquaurore.dto.ArtworkDto;
import com.example.aquaurore.repository.ArtistRepository;
import com.example.aquaurore.repository.ArtworkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ArtworkService {

    private final ArtworkRepository artworkRepository;
    private final ArtistRepository artistRepository;

    public List<ArtworkDto.Response> findAll() {
        return artworkRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(ArtworkDto.Response::new)
                .toList();
    }

    public ArtworkDto.Response findById(Long id) {
        Artwork artwork = artworkRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Artwork not found: " + id));
        return new ArtworkDto.Response(artwork);
    }

    public List<ArtworkDto.Response> findByArtist(Long artistId) {
        return artworkRepository.findByArtistId(artistId).stream()
                .map(ArtworkDto.Response::new)
                .toList();
    }

    @Transactional
    public ArtworkDto.Response create(ArtworkDto.CreateRequest request) {
        Artist artist = artistRepository.findById(request.getArtistId())
                .orElseThrow(() -> new IllegalArgumentException("Artist not found: " + request.getArtistId()));
        Artwork artwork = Artwork.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .displayOrder(request.getDisplayOrder())
                .artist(artist)
                .build();
        return new ArtworkDto.Response(artworkRepository.save(artwork));
    }
}
