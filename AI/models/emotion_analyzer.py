from konlpy.tag import Okt
from gensim.models import Word2Vec
from joblib import load

class EmotionAnalyzer:
    def __init__(self, word_model_path: str, svm_model_path: str):
        """
        감정 분석기 초기화
        :param word_model_path: Word2Vec 모델 경로
        :param svm_model_path: SVM 모델 경로
        """
        self.okt = Okt()
        self.model = load(word_model_path)  # Word2Vec 모델 로드
        self.svm_model = load(svm_model_path)  # SVM 모델 로드

        # 감정 숫자를 점수 및 감정 이름으로 변환하는 매핑
        self.emotion_mapping = {
            0: {"score": 4.5, "name": "기쁨"},
            3: {"score": 2.0, "name": "슬픔"},
            2: {"score": 2.0, "name": "불안"},
            4: {"score": 1.5, "name": "상처"},
            1: {"score": 1.0, "name": "당황"},
            5: {"score": 1.0, "name": "분노"}
        }

    def tokenize(self, text: str):
        """
        텍스트를 토큰화
        :param text: 입력 텍스트
        :return: 토큰 리스트
        """
        return self.okt.morphs(text)

    def get_embedding(self, tokens: list):
        """
        토큰의 Word2Vec 임베딩 벡터를 계산
        :param tokens: 토큰 리스트
        :return: 평균 임베딩 벡터
        """
        embeddings = [
            self.model.wv[token] for token in tokens if token in self.model.wv.key_to_index
        ]
        if embeddings:
            return sum(embeddings) / len(embeddings)
        else:
            # 모델 벡터 차원 크기만큼 0으로 채운 리스트 반환
            return [0] * self.model.vector_size

    def analyze_emotion(self, sentence: str):
        """
        문장에서 감정을 분석
        :param sentence: 입력 문장
        :return: 감정 점수, 감정 번호, 감정 이름, 입력 문장
        """
        tokenized_sentence = self.tokenize(sentence)
        embedding = self.get_embedding(tokenized_sentence)
        emotion = self.svm_model.predict([embedding])[0]

        emotion_data = self.emotion_mapping[emotion]
        score = emotion_data["score"]
        emotion_name = emotion_data["name"]

        return {
            "input": sentence,
            "score": score,
            "emotion_id": emotion,
            "emotion_name": emotion_name
        }
