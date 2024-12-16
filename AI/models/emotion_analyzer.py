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

        self.emotion_mapping = {
            0: ("기쁨", 4.5),  # 기쁨
            3: ("슬픔", 2.0),  # 슬픔
            2: ("불안", 1.5),  # 불안
            4: ("상처", 1.5),  # 상처
            1: ("당황", 1.0),  # 당황
            5: ("분노", 1.0)   # 분노
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
            return [0] * self.model.vector_size

    def analyze_emotion(self, sentence: str):
        """
        문장에서 감정을 분석
        :param sentence: 입력 문장
        :return: 감정 점수와 감정 이름
        """
        tokenized_sentence = self.tokenize(sentence)
        embedding = self.get_embedding(tokenized_sentence)
        emotion = self.svm_model.predict([embedding])[0]
        
        
        
        # 감정 이름과 점수 반환
        emotion_name, score = self.emotion_mapping[emotion]
        return score, emotion_name
