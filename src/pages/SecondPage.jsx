import { useState, useRef } from "react";
import "../style/SecondPage.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

const SecondPage = () => {
  const [step, setStep] = useState(1);
  const [inputValues, setInputValues] = useState({
    topic: "",
    content: "",
  });

  const [isEditingTopic, setIsEditingTopic] = useState(true);
  const [isEditingContent, setIsEditingContent] = useState(true);

  const editorRef = useRef(null);

  const handleNextTopic = () => {
    if (step < 3) setStep(step + 1);
    if (step === 1) setIsEditingTopic(false);
  };
  const handleEditTopic = () => {
    setIsEditingTopic(true);
  };

  const handleNextContent = async () => {
    // API 호출: 사용자가 입력한 주제와 내용을 전송
    const requestBody = {
      title: inputValues.topic, // 사용자가 입력한 블로그 제목
      memo: inputValues.content, // 사용자가 입력한 메모
    };

    try {
      const response = await fetch("http://34.64.248.152:334/1/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("API 요청 실패");
      }

      const data = await response.json();
      // API 응답으로 온 데이터를 에디터 안에 넣어줍니다.
      if (editorRef.current) {
        editorRef.current.getInstance().setMarkdown(data.content);
      }
    } catch (error) {
      console.error("Error posting article:", error);
    }

    if (step < 3) setStep(step + 1);
    if (step === 2) setIsEditingContent(false);
  };
  const handleEditContent = () => {
    setIsEditingContent(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="main-container">
      <header className="header-bar">
        <button className="menu-btn">☰</button>
      </header>

      <div className="content-wrapper">
        <div className="steps">
          <div className={`step ${step >= 1 ? "active" : "inactive"}`}>1. 주제</div>
          <div className={`step ${step >= 2 ? "active" : "inactive"}`}>2. 내용</div>
          <div className={`step ${step >= 3 ? "active" : "inactive"}`}>3. 결과물</div>
        </div>

        <div className="main-area">
          {/* 주제 카드 */}
          <div className="card">
            <h3>주제</h3>
            {isEditingTopic ? (
              <input
                type="text"
                name="topic"
                placeholder="이 글에서 다루고 싶은 주제를 적어보세요."
                value={inputValues.topic}
                onChange={handleChange}
                className="input-box"
              />
            ) : (
              <p className="fixed-text">{inputValues.topic}</p>
            )}
            <button
              className="next-btn"
              onClick={isEditingTopic ? handleNextTopic : handleEditTopic}
            >
              {isEditingTopic ? "다음 ▶" : "수정하기"}
            </button>
          </div>

          {/* 내용 카드 */}
          {step >= 2 && (
            <div className="card">
              <h3>내용</h3>
              {isEditingContent ? (
                <textarea
                  name="content"
                  placeholder="이 글에서 다루고 싶은 내용을 적어보세요."
                  value={inputValues.content}
                  onChange={handleChange}
                  className="textarea-box"
                />
              ) : (
                <p className="fixed-text">{inputValues.content}</p>
              )}
              <button
                className="next-btn"
                onClick={isEditingContent ? handleNextContent : handleEditContent}
              >
                {isEditingContent ? "다음 ▶" : "수정하기"}
              </button>
            </div>
          )}

          {/* 결과물 (Toast UI Editor) */}
          {step === 3 && (
            <div className="card editor-card">
              {/* 상단 헤더 */}
              <div className="editor-header">
                <h3>결과물</h3>
                <div className="publish-text">📤 게시물 발행</div>
                <div className="icon-box">
                  <img src="/icons/velog.png" alt="Velog Icon" className="velog-icon" />
                </div>
              </div>

              <Editor
                ref={editorRef}
                previewStyle="vertical"
                height="700px"
                initialEditType="markdown"
                useCommandShortcut={true}
                initialValue=" "
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
