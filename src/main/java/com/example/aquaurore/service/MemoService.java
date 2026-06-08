package com.example.aquaurore.service;

import com.example.aquaurore.domain.Memo;
import com.example.aquaurore.dto.MemoDto;
import com.example.aquaurore.repository.MemoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemoService {

    private final MemoRepository memoRepository;

    public List<MemoDto.Response> findAll() {
        return memoRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(MemoDto.Response::new)
                .toList();
    }

    @Transactional
    public MemoDto.Response create(MemoDto.CreateRequest request) {
        String nickname = (request.getNickname() == null || request.getNickname().isBlank())
                ? "익명" : request.getNickname();
        Memo memo = Memo.builder()
                .nickname(nickname)
                .content(request.getContent())
                .color(request.getColor())
                .build();
        return new MemoDto.Response(memoRepository.save(memo));
    }

    @Transactional
    public void delete(Long id) {
        if (!memoRepository.existsById(id)) {
            throw new IllegalArgumentException("Memo not found: " + id);
        }
        memoRepository.deleteById(id);
    }
}
