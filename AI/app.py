import uvicorn
from models.emotion_analyzer import EmotionAnalyzer
from fastapi import FastAPI
from pydantic import BaseModel

# 요청 데이터 모델 정의
class EmotionRequest(BaseModel):
    sentence: str

# 감정 분석기 초기화
analyzer = EmotionAnalyzer(
    word_model_path="model/word_model.joblib",
    svm_model_path="model/svm_model.joblib"
)

# FastAPI 앱 초기화
app = FastAPI()


@app.post("/api/analyze_emotion")
async def analyze_emotion(request: EmotionRequest):
    try:
        # 문장 분석
        sentence = request.sentence
        score, emotion = analyzer.analyze_emotion(sentence) 
        
        # 응답 반환
        return {
                "sentence": sentence,
                "emotion": emotion,  
                "score": score       
            }

    except Exception as e:
        return {
            "error": str(e)
        }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
