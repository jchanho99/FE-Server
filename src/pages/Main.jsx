// src/pages/Main.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 라우팅을 위한 import
import "../style/Main.css"; // 스타일 파일

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
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleSubmit = async () => {
    const requestBody = {
      username: "inssg",
      blogType: "velog",
    };

    try {
      const response = await fetch("http://34.64.248.152:334/users/1/information", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        throw new Error("API 요청 실패");
      }
      // API 호출이 성공하면 추가 작업을 수행할 수 있습니다.
    } catch (error) {
      console.error("Error posting API:", error);
    }

    navigate("/second");
  };

  return (
    <div className="main-container">
      {/* 작아진 헤더 바 (보라색 영역) */}
      <header className="header-bar">
        <button className="menu-btn">☰</button>
      </header>

      {/* 제목 + 설명 */}
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

      {/* 글 생성하기 버튼 → API 호출 후 두 번째 페이지(/second)로 이동 */}
      <button className="submit-btn" onClick={handleSubmit}>
        글 또 쓰기 ▶
      </button>
    </div>
  );
};

export default Main;
