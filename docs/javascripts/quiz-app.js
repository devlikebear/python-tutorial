class QuizApp {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentQuiz = null;
    this.currentQuizPath = null;
    this.currentQuestionIndex = 0;
    this.userAnswers = [];
    this.score = 0;
    this.init();
  }

  init() {
    this.renderQuizSelector();
  }

  async loadQuizData(quizPath) {
    try {
      const response = await fetch(quizPath);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to load quiz data:", error);
      return null;
    }
  }

  renderQuizSelector() {
    const beginnerQuizzes = [
      {
        name: "Chapter 1: Python 소개",
        path: "/quizzes/beginner/chapter01_quiz.json",
        level: "beginner",
      },
      {
        name: "Chapter 2: 변수와 데이터타입",
        path: "/quizzes/beginner/chapter02_quiz.json",
        level: "beginner",
      },
      {
        name: "Chapter 3: 문자열 처리",
        path: "/quizzes/beginner/chapter03_quiz.json",
        level: "beginner",
      },
      {
        name: "Chapter 4: 연산자와 표현식",
        path: "/quizzes/beginner/chapter04_quiz.json",
        level: "beginner",
      },
      {
        name: "Chapter 5: 입출력",
        path: "/quizzes/beginner/chapter05_input_output.json",
        level: "beginner",
      },
      {
        name: "Chapter 6: 조건문",
        path: "/quizzes/beginner/chapter06_conditional_statements.json",
        level: "beginner",
      },
      {
        name: "Chapter 7: 반복문",
        path: "/quizzes/beginner/chapter07_loops.json",
        level: "beginner",
      },
      {
        name: "Chapter 8: 리스트와 튜플",
        path: "/quizzes/beginner/chapter08_lists_tuples.json",
        level: "beginner",
      },
      {
        name: "Chapter 9: 딕셔너리와 집합",
        path: "/quizzes/beginner/chapter09_dictionaries_sets.json",
        level: "beginner",
      },
      {
        name: "Chapter 10: 함수 기초",
        path: "/quizzes/beginner/chapter10_functions_basics.json",
        level: "beginner",
      },
      {
        name: "Chapter 11: 오류 처리와 디버깅",
        path: "/quizzes/beginner/chapter11_error_handling_debugging.json",
        level: "beginner",
      },
    ];

    const intermediateQuizzes = [
      {
        name: "Chapter 1: 고급 함수",
        path: "/quizzes/intermediate/chapter01_advanced_functions.json",
        level: "intermediate",
      },
      {
        name: "Chapter 2: 파일 처리와 데이터 형식",
        path: "/quizzes/intermediate/chapter02_file_processing_data_formats.json",
        level: "intermediate",
      },
      {
        name: "Chapter 3: 정규표현식",
        path: "/quizzes/intermediate/chapter03_quiz.json",
        level: "intermediate",
      },
      {
        name: "Chapter 4: 객체지향 프로그래밍 기초",
        path: "/quizzes/intermediate/chapter04_quiz.json",
        level: "intermediate",
      },
      {
        name: "Chapter 5: 상속과 다형성",
        path: "/quizzes/intermediate/chapter05_quiz.json",
        level: "intermediate",
      },
      {
        name: "Chapter 6: 매직 메서드",
        path: "/quizzes/intermediate/chapter06_quiz.json",
        level: "intermediate",
      },
      {
        name: "Chapter 7: 모듈과 패키지",
        path: "/quizzes/intermediate/chapter07_quiz.json",
        level: "intermediate",
      },
      {
        name: "Chapter 8: 고급 예외 처리",
        path: "/quizzes/intermediate/chapter08_quiz.json",
        level: "intermediate",
      },
      {
        name: "Chapter 9: 이터레이터와 제너레이터",
        path: "/quizzes/intermediate/chapter09_quiz.json",
        level: "intermediate",
      },
      {
        name: "Chapter 10: 멀티스레딩과 비동기",
        path: "/quizzes/intermediate/chapter10_quiz.json",
        level: "intermediate",
      },
      {
        name: "Chapter 11: 테스팅과 디버깅",
        path: "/quizzes/intermediate/chapter11_quiz.json",
        level: "intermediate",
      },
      {
        name: "Chapter 12: 데이터베이스 연동",
        path: "/quizzes/intermediate/chapter12_quiz.json",
        level: "intermediate",
      },
      {
        name: "Chapter 13: 웹 스크래핑과 API",
        path: "/quizzes/intermediate/chapter13_quiz.json",
        level: "intermediate",
      },
      {
        name: "Chapter 14: GUI 프로그래밍 기초",
        path: "/quizzes/intermediate/chapter14_quiz.json",
        level: "intermediate",
      },
    ];

    const advancedQuizzes = [
      {
        name: "Chapter 1: 파이썬 내부구조와 메모리",
        path: "/quizzes/advanced/chapter01_quiz.json",
        level: "advanced",
      },
      {
        name: "Chapter 2: 메타클래스와 디스크립터",
        path: "/quizzes/advanced/chapter02_quiz.json",
        level: "advanced",
      },
      {
        name: "Chapter 3: 고급 데코레이터와 컨텍스트 매니저",
        path: "/quizzes/advanced/chapter03_quiz.json",
        level: "advanced",
      },
      {
        name: "Chapter 4: 고급 동시성과 병렬성",
        path: "/quizzes/advanced/chapter04_quiz.json",
        level: "advanced",
      },
      {
        name: "Chapter 5: 네트워킹과 소켓 프로그래밍",
        path: "/quizzes/advanced/chapter05_quiz.json",
        level: "advanced",
      },
    ];

    this.container.innerHTML = `
            <div class="quiz-selector">
                <h2>📚 Python 퀴즈 선택</h2>
                <p>학습한 내용을 확인해보세요!</p>
                
                <div class="quiz-levels">
                    <div class="level-section">
                        <h3>🟢 초급 과정</h3>
                        <div class="quiz-grid">
                            ${beginnerQuizzes
                              .map(
                                (quiz) => `
                                <div class="quiz-card" onclick="quizApp.startQuiz('${quiz.path}')">
                                    <h4>${quiz.name}</h4>
                                    <span class="quiz-level ${quiz.level}">${quiz.level}</span>
                                </div>
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                    
                    <div class="level-section">
                        <h3>🟡 중급 과정</h3>
                        <div class="quiz-grid">
                            ${intermediateQuizzes
                              .map(
                                (quiz) => `
                                <div class="quiz-card" onclick="quizApp.startQuiz('${quiz.path}')">
                                    <h4>${quiz.name}</h4>
                                    <span class="quiz-level ${quiz.level}">${quiz.level}</span>
                                </div>
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                    
                    <div class="level-section">
                        <h3>🔴 고급 과정</h3>
                        <div class="quiz-grid">
                            ${advancedQuizzes
                              .map(
                                (quiz) => `
                                <div class="quiz-card" onclick="quizApp.startQuiz('${quiz.path}')">
                                    <h4>${quiz.name}</h4>
                                    <span class="quiz-level ${quiz.level}">${quiz.level}</span>
                                </div>
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  async startQuiz(quizPath) {
    const quizData = await this.loadQuizData(quizPath);
    if (!quizData) {
      alert("퀴즈 데이터를 불러올 수 없습니다.");
      return;
    }

    this.currentQuiz = quizData;
    this.currentQuizPath = quizPath;
    this.currentQuestionIndex = 0;
    this.userAnswers = [];
    this.score = 0;

    this.renderQuizStart();
  }

  renderQuizStart() {
    // 퀴즈 정보 구조 확인 (초급과 중급/고급의 구조가 다름)
    const quizInfo = this.currentQuiz.quiz_info || {};
    const totalQuestions =
      quizInfo.total_questions ||
      this.currentQuiz.total_questions ||
      this.currentQuiz.questions.length;
    const passingScore = quizInfo.passing_score || 70;
    const title = quizInfo.title || "퀴즈";
    const description = quizInfo.description || "학습한 내용을 확인해보세요.";

    this.container.innerHTML = `
            <div class="quiz-start">
                <h2>${this.currentQuiz.chapter}</h2>
                <div class="quiz-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <div class="quiz-stats">
                        <span>📝 총 문제: ${totalQuestions}개</span>
                        <span>🎯 합격 점수: ${passingScore}점</span>
                    </div>
                </div>
                <button class="btn-primary" onclick="quizApp.renderQuestion()">퀴즈 시작하기</button>
                <button class="btn-secondary" onclick="quizApp.renderQuizSelector()">뒤로 가기</button>
            </div>
        `;
  }

  renderQuestion() {
    const question = this.currentQuiz.questions[this.currentQuestionIndex];
    const progress =
      ((this.currentQuestionIndex + 1) / this.currentQuiz.questions.length) *
      100;

    let questionHTML = "";

    switch (question.type) {
      case "multiple_choice":
        const choices = question.options || question.choices || [];
        questionHTML = `
                    <div class="question-options">
                        ${choices
                          .map(
                            (option, index) => `
                            <label class="option-label">
                                <input type="radio" name="answer" value="${String.fromCharCode(
                                  65 + index
                                )}">
                                <span class="option-text">${option}</span>
                            </label>
                        `
                          )
                          .join("")}
                    </div>
                `;
        break;

      case "true_false":
        questionHTML = `
                    <div class="question-options">
                        <label class="option-label">
                            <input type="radio" name="answer" value="true">
                            <span class="option-text">참 (True)</span>
                        </label>
                        <label class="option-label">
                            <input type="radio" name="answer" value="false">
                            <span class="option-text">거짓 (False)</span>
                        </label>
                    </div>
                `;
        break;

      case "fill_in_blank":
      case "code_completion":
      case "practical":
      case "code_output":
      case "code_analysis":
      case "code_debugging":
      case "code_comparison":
        questionHTML = `
                    <div class="question-input">
                        <textarea name="answer" placeholder="답을 입력하세요..." class="text-input" rows="4"></textarea>
                    </div>
                `;
        break;
    }

    this.container.innerHTML = `
            <div class="quiz-question">
                <div class="quiz-header">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <div class="question-counter">
                        문제 ${this.currentQuestionIndex + 1} / ${
      this.currentQuiz.questions.length
    }
                    </div>
                </div>
                
                <div class="question-content">
                    <h3>Q${question.id}. ${question.question}</h3>
                    ${questionHTML}
                </div>
                
                <div class="quiz-actions">
                    <button class="btn-secondary" onclick="quizApp.previousQuestion()" 
                            ${
                              this.currentQuestionIndex === 0 ? "disabled" : ""
                            }>
                        이전 문제
                    </button>
                    <button class="btn-primary" onclick="quizApp.nextQuestion()">
                        ${
                          this.currentQuestionIndex ===
                          this.currentQuiz.questions.length - 1
                            ? "결과 보기"
                            : "다음 문제"
                        }
                    </button>
                </div>
            </div>
        `;
  }

  getUserAnswer() {
    const question = this.currentQuiz.questions[this.currentQuestionIndex];

    if (
      [
        "fill_in_blank",
        "code_completion",
        "practical",
        "code_output",
        "code_analysis",
        "code_debugging",
        "code_comparison",
      ].includes(question.type)
    ) {
      const input =
        this.container.querySelector('input[name="answer"]') ||
        this.container.querySelector('textarea[name="answer"]');
      return input ? input.value.trim() : "";
    } else {
      const selected = this.container.querySelector(
        'input[name="answer"]:checked'
      );
      return selected ? selected.value : null;
    }
  }

  nextQuestion() {
    const userAnswer = this.getUserAnswer();
    if (!userAnswer) {
      alert("답을 선택해주세요.");
      return;
    }

    this.userAnswers[this.currentQuestionIndex] = userAnswer;

    if (this.currentQuestionIndex < this.currentQuiz.questions.length - 1) {
      this.currentQuestionIndex++;
      this.renderQuestion();
    } else {
      this.calculateScore();
      this.renderResults();
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.renderQuestion();

      // 이전 답안 복원
      const previousAnswer = this.userAnswers[this.currentQuestionIndex];
      if (previousAnswer) {
        const question = this.currentQuiz.questions[this.currentQuestionIndex];
        if (
          [
            "fill_in_blank",
            "code_completion",
            "practical",
            "code_output",
            "code_analysis",
            "code_debugging",
            "code_comparison",
          ].includes(question.type)
        ) {
          const input =
            this.container.querySelector('input[name="answer"]') ||
            this.container.querySelector('textarea[name="answer"]');
          if (input) input.value = previousAnswer;
        } else {
          const radio = this.container.querySelector(
            `input[value="${previousAnswer}"]`
          );
          if (radio) radio.checked = true;
        }
      }
    }
  }

  calculateScore() {
    this.score = 0;
    this.currentQuiz.questions.forEach((question, index) => {
      const userAnswer = this.userAnswers[index];
      const correctAnswer = question.correct_answer;

      if (question.type === "true_false") {
        if (
          (userAnswer === "true" && correctAnswer === true) ||
          (userAnswer === "false" && correctAnswer === false)
        ) {
          this.score++;
        }
      } else if (
        question.type === "fill_in_blank" ||
        question.type === "code_completion" ||
        question.type === "practical"
      ) {
        if (
          userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
        ) {
          this.score++;
        }
      } else if (question.type === "multiple_choice") {
        // 중급/고급 퀴즈는 숫자 인덱스, 초급 퀴즈는 문자 사용
        if (typeof correctAnswer === "number") {
          const userIndex = userAnswer.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3
          if (userIndex === correctAnswer) {
            this.score++;
          }
        } else {
          if (userAnswer === correctAnswer) {
            this.score++;
          }
        }
      } else {
        if (userAnswer === correctAnswer) {
          this.score++;
        }
      }
    });
  }

  renderResults() {
    const percentage = Math.round(
      (this.score / this.currentQuiz.questions.length) * 100
    );
    const passingScore =
      (this.currentQuiz.quiz_info &&
        this.currentQuiz.quiz_info.passing_score) ||
      70;
    const passed = percentage >= passingScore;

    let resultHTML = `
            <div class="quiz-results">
                <h2>🎉 퀴즈 완료!</h2>
                <div class="score-display ${passed ? "passed" : "failed"}">
                    <div class="score-circle">
                        <span class="score-text">${percentage}%</span>
                    </div>
                    <div class="score-details">
                        <p>정답: ${this.score}개 / ${
      this.currentQuiz.questions.length
    }개</p>
                        <p class="result-status ${
                          passed ? "passed" : "failed"
                        }">
                            ${passed ? "🎊 합격!" : "😅 불합격"}
                        </p>
                    </div>
                </div>
                
                <div class="detailed-results">
                    <h3>📋 상세 결과</h3>
        `;

    this.currentQuiz.questions.forEach((question, index) => {
      const userAnswer = this.userAnswers[index];
      const isCorrect = this.isAnswerCorrect(question, userAnswer);

      resultHTML += `
                <div class="result-item ${isCorrect ? "correct" : "incorrect"}">
                    <div class="result-header">
                        <span class="result-icon">${
                          isCorrect ? "✅" : "❌"
                        }</span>
                        <span class="question-text">Q${question.id}. ${
        question.question
      }</span>
                    </div>
                    <div class="result-details">
                        <p><strong>당신의 답:</strong> ${this.formatAnswer(
                          question,
                          userAnswer
                        )}</p>
                        <p><strong>정답:</strong> ${this.formatAnswer(
                          question,
                          question.correct_answer
                        )}</p>
                        ${
                          question.explanation
                            ? `<p class="explanation"><strong>설명:</strong> ${question.explanation}</p>`
                            : ""
                        }
                    </div>
                </div>
            `;
    });

    resultHTML += `
                </div>
                
                <div class="quiz-actions">
                    <button class="btn-primary" onclick="quizApp.startQuiz('${this.getCurrentQuizPath()}')">다시 풀기</button>
                    <button class="btn-secondary" onclick="quizApp.renderQuizSelector()">다른 퀴즈 선택</button>
                </div>
            </div>
        `;

    this.container.innerHTML = resultHTML;
  }

  isAnswerCorrect(question, userAnswer) {
    if (question.type === "true_false") {
      return (
        (userAnswer === "true" && question.correct_answer === true) ||
        (userAnswer === "false" && question.correct_answer === false)
      );
    } else if (
      question.type === "fill_in_blank" ||
      question.type === "code_completion" ||
      question.type === "practical"
    ) {
      return (
        userAnswer.toLowerCase().trim() ===
        question.correct_answer.toLowerCase().trim()
      );
    } else if (question.type === "multiple_choice") {
      if (typeof question.correct_answer === "number") {
        const userIndex = userAnswer.charCodeAt(0) - 65;
        return userIndex === question.correct_answer;
      } else {
        return userAnswer === question.correct_answer;
      }
    } else {
      return userAnswer === question.correct_answer;
    }
  }

  formatAnswer(question, answer) {
    if (question.type === "multiple_choice") {
      const choices = question.options || question.choices || [];
      if (
        typeof answer === "string" &&
        answer.length === 1 &&
        answer >= "A" &&
        answer <= "Z"
      ) {
        const optionIndex = answer.charCodeAt(0) - 65;
        return choices[optionIndex] || answer;
      } else if (typeof answer === "number") {
        return choices[answer] || answer;
      }
      return answer;
    } else if (question.type === "true_false") {
      if (typeof answer === "boolean") {
        return answer ? "참 (True)" : "거짓 (False)";
      }
      return answer === "true" ? "참 (True)" : "거짓 (False)";
    }
    return answer;
  }

  getCurrentQuizPath() {
    return this.currentQuizPath || "/quizzes/beginner/chapter01_quiz.json";
  }
}

// Initialize quiz app when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("quiz-app")) {
    window.quizApp = new QuizApp("quiz-app");
  }
});
