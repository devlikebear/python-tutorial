class QuizApp {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentQuiz = null;
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
    const quizzes = [
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

    this.container.innerHTML = `
            <div class="quiz-selector">
                <h2>📚 Python 퀴즈 선택</h2>
                <p>학습한 내용을 확인해보세요!</p>
                
                <div class="quiz-levels">
                    <div class="level-section">
                        <h3>🟢 초급 과정</h3>
                        <div class="quiz-grid">
                            ${quizzes
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
    this.currentQuestionIndex = 0;
    this.userAnswers = [];
    this.score = 0;

    this.renderQuizStart();
  }

  renderQuizStart() {
    this.container.innerHTML = `
            <div class="quiz-start">
                <h2>${this.currentQuiz.chapter}</h2>
                <div class="quiz-info">
                    <h3>${this.currentQuiz.quiz_info.title}</h3>
                    <p>${this.currentQuiz.quiz_info.description}</p>
                    <div class="quiz-stats">
                        <span>📝 총 문제: ${this.currentQuiz.quiz_info.total_questions}개</span>
                        <span>🎯 합격 점수: ${this.currentQuiz.quiz_info.passing_score}점</span>
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
        questionHTML = `
                    <div class="question-options">
                        ${question.options
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
        questionHTML = `
                    <div class="question-input">
                        <input type="text" name="answer" placeholder="답을 입력하세요..." class="text-input">
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

    if (question.type === "fill_in_blank") {
      const input = this.container.querySelector('input[name="answer"]');
      return input.value.trim();
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
        if (question.type === "fill_in_blank") {
          this.container.querySelector('input[name="answer"]').value =
            previousAnswer;
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
      } else if (question.type === "fill_in_blank") {
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
          this.score++;
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
    const passed = percentage >= this.currentQuiz.quiz_info.passing_score;

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
    } else if (question.type === "fill_in_blank") {
      return userAnswer.toLowerCase() === question.correct_answer.toLowerCase();
    } else {
      return userAnswer === question.correct_answer;
    }
  }

  formatAnswer(question, answer) {
    if (question.type === "multiple_choice") {
      const optionIndex = answer.charCodeAt(0) - 65;
      return question.options[optionIndex] || answer;
    } else if (question.type === "true_false") {
      if (typeof answer === "boolean") {
        return answer ? "참 (True)" : "거짓 (False)";
      }
      return answer === "true" ? "참 (True)" : "거짓 (False)";
    }
    return answer;
  }

  getCurrentQuizPath() {
    // This would need to be tracked when starting a quiz
    return "/quizzes/beginner/chapter01_quiz.json";
  }
}

// Initialize quiz app when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("quiz-app")) {
    window.quizApp = new QuizApp("quiz-app");
  }
});
