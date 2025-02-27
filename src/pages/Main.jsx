// src/pages/Main.jsx
import { useState } from "react";
import "../style/Main.css"; // 스타일 파일 (경로 맞춰 수정!)

const blogPlatforms = [
  { name: "GitHub", image: "/icons/github.png" },
  { name: "Medium", image: "/icons/medium.png" },
  { name: "Naver", image: "/icons/naver.png" },
  { name: "Velog", image: "/icons/velog.png" },
  { name: "Brunch", image: "/icons/brunch.png" },
  { name: "Tistory", image: "/icons/tistory.png" },
];

const Main = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [nickname, setNickname] = useState("");

  return (
    <div className="main-container">
      {/* 작아진 헤더 바 (보라색 영역) */}
      <header className="header-bar">
        <button className="menu-btn">☰</button>
      </header>

      {/* 제목 + 설명 (헤더 아래로 이동) */}
      <section className="title-section">
        <h1 className="title">글또쓰</h1>
        <p className="description">
          블로그 글쓰기, 이제는 맞춤형으로 간편하게<br />
          당신만의 블로그를 더 쉽고 빠르게 작성해보세요!
        </p>
      </section>

      {/* 메인 컨텐츠 영역 (왼쪽: 블로그 선택, 오른쪽: 닉네임 입력) */}
      <div className="main-content">
        <div className="left-content">
          <h2>1. 당신의 블로그 사이트를 선택해주세요</h2>
          <div className="blog-grid">
            {blogPlatforms.map((platform) => (
              <button
                key={platform.name}
                className={`blog-btn ${
                  selectedPlatform === platform.name ? "selected" : ""
                }`}
                onClick={() => setSelectedPlatform(platform.name)}
              >
                <img
                  src={platform.image}
                  alt={platform.name}
                  className="blog-icon"
                />
                <span>{platform.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="right-content">
          <h2>2. 블로그 닉네임을 입력해주세요</h2>
          <input
            type="text"
            className="nickname-input"
            placeholder="ex) kanado"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
      </div>

      {/* 글 생성하기 버튼 (오른쪽 하단 고정) */}
      <button className="submit-btn">글 또 쓰기 ▶</button>
    </div>
  );
};

export default Main;
