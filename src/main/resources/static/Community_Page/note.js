/*
 * note.js — localStorage → REST API 연동 버전
 * HTML/CSS 디자인 변경 없음
 */

var API_BASE = '/api';

/////////////////////////////////////
function play(){
    var sound = new Howl({
        src: ['지나갈거야.mp3'],
        volume: 1,
        autoplay: true,
        loop: true,
        onend : function() {
            console.log('Finished!');
        }
    });
    sound.play();
}

window.onload = init;

function init() {
    var button = document.getElementById("comment-submit");
    button.onclick = createSticky;

    var undoButton = document.getElementById("undo-submit");
    undoButton.onclick = function() {
        document.querySelector(".comment-form").style.display = "none";
    };

    loadStickies();
}

function loadStickies() {
    fetch(API_BASE + '/memos')
        .then(function(res) { return res.json(); })
        .then(function(response) {
            if (response.success && response.data) {
                response.data.forEach(function(memo) {
                    addStickyToDOM(memo.id, memo.content, memo.color);
                });
            }
        })
        .catch(function(err) { console.error('메모 불러오기 실패:', err); });
}

function createSticky() {
    var content = document.getElementById("input-message").value;
    var nameEl = document.getElementById("input-authorname");
    var nickname = nameEl ? nameEl.value : '';

    if (!content.trim()) return;

    fetch(API_BASE + '/memos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: nickname, content: content, color: '' })
    })
        .then(function(res) { return res.json(); })
        .then(function(response) {
            if (response.success && response.data) {
                addStickyToDOM(response.data.id, response.data.content, response.data.color);
                document.getElementById("input-message").value = '';
                if (nameEl) nameEl.value = '';
                document.querySelector(".comment-form").style.display = "none";
            }
        })
        .catch(function(err) { console.error('메모 저장 실패:', err); });
}

function deleteSticky(id, liElement) {
    fetch(API_BASE + '/memos/' + id, { method: 'DELETE' })
        .then(function() {
            if (liElement && liElement.parentNode) {
                liElement.parentNode.removeChild(liElement);
            }
        })
        .catch(function(err) { console.error('메모 삭제 실패:', err); });
}

function addStickyToDOM(id, content, color) {
    var stickies = document.getElementById("stickies");
    var sticky = document.createElement("li");
    sticky.setAttribute("id", "memo_" + id);

    if (color) {
        sticky.style.backgroundColor = color;
    }

    var span = document.createElement("span");
    span.setAttribute("class", "sticky");
    span.innerHTML = content;

    sticky.appendChild(span);
    stickies.appendChild(sticky);

    // 클릭으로 삭제
    sticky.onclick = function() {
        if (confirm('이 포스트잇을 삭제할까요?')) {
            deleteSticky(id, sticky);
        }
    };
}
