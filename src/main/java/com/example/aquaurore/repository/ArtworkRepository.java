package com.example.aquaurore.repository;

import com.example.aquaurore.domain.Artwork;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArtworkRepository extends JpaRepository<Artwork, Long> {
    List<Artwork> findAllByOrderByDisplayOrderAsc();
    List<Artwork> findByArtistId(Long artistId);
}
