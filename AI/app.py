from models.emotion_analyzer import EmotionAnalyzer

# 감정 분석기 초기화
analyzer = EmotionAnalyzer(
    word_model_path="model/word_model.joblib",
    svm_model_path="model/svm_model.joblib"
)

# 입력 문장
sentence = "지금 하고 있는 프로젝트가 내 실수 때문에 무산될까 봐 불안해"

# 감정 분석 실행
result = analyzer.analyze_emotion(sentence)

# 결과 출력
print(result)
