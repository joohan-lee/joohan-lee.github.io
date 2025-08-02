# 현재 프롬프트 구조 분석

## 전체 메시지 배열 구조

```javascript
const messages = [
  // 1. 시스템 프롬프트 (user role로 전송)
  {
    role: 'user',
    parts: [{ text: systemPrompt }]
  },
  
  // 2. AI 응답 확인 (model role)
  {
    role: 'model', 
    parts: [{ text: "I understand. I'm ready to help visitors learn about Joohan Lee's career background. How can I assist?" }]
  },
  
  // 3. 최근 대화 히스토리 (최대 4개 메시지)
  ...this.conversationHistory.slice(-4),
  
  // 4. 현재 사용자 질문
  {
    role: 'user',
    parts: [{ text: userMessage }]
  }
];
```

## 시스템 프롬프트 구성

### A. 역할 정의
```
You are Joohan Lee's career assistant chatbot. You help visitors understand Joohan's professional background, skills, and experience.
```

### B. 지침 (Guidelines)
```
IMPORTANT GUIDELINES:
- Be conversational, friendly, and professional
- Provide specific details from the context when available
- If asked about something not in the context, politely redirect to topics you can help with
- Keep responses concise but informative (2-3 sentences usually)
- Use emojis sparingly and appropriately
```

### C. 컨텍스트 데이터
```
CAREER CONTEXT:

PERSONAL:
[개인 정보 마크다운 텍스트]

EXPERIENCE:  
[경력 정보 마크다운 텍스트]

PROJECTS:
[프로젝트 정보 마크다운 텍스트]

SKILLS:
[스킬 정보 마크다운 텍스트]
```

## 실제 토큰 사용량 분석

### 현재 관찰된 수치:
- **promptTokenCount**: 1424 토큰
- **totalTokenCount**: 1923 토큰  
- **thoughtsTokenCount**: 499 토큰 (Gemini 내부 처리)

### 토큰 분해:
1. **시스템 프롬프트**: ~1200 토큰 (대부분)
2. **AI 확인 응답**: ~20 토큰
3. **대화 히스토리**: ~100 토큰 (4개 메시지)
4. **현재 질문**: ~100 토큰

## 문제점 분석

### 1. 비효율적인 구조
```javascript
// 현재: 시스템 프롬프트를 user 메시지로 전송
{
  role: 'user',
  parts: [{ text: systemPrompt }]
}

// 더 효율적: Gemini는 system role을 지원하지 않으므로 현재 방식이 맞음
```

### 2. 과도한 컨텍스트
- RAG로 관련 섹션만 선택하지만, 여전히 긴 마크다운 텍스트
- JSON.stringify로 인한 추가 토큰 사용

### 3. 대화 히스토리 관리
```javascript
// 최근 4개 메시지만 유지
this.conversationHistory.slice(-4)

// 메모리 관리
if (this.conversationHistory.length > 10) {
  this.conversationHistory = this.conversationHistory.slice(-8);
}
```

## 개선 방안

### A. 컨텍스트 압축
```javascript
// 현재
const contextText = typeof context.data === 'string' ? 
  context.data : 
  JSON.stringify(context.data, null, 2);

// 개선안
const contextText = typeof context.data === 'string' ? 
  context.data.replace(/\s+/g, ' ').trim() :  // 공백 압축
  JSON.stringify(context.data).replace(/\s+/g, ' ');
```

### B. 관련성 높은 컨텍스트만 선택
```javascript
// 현재: 상위 3개 섹션
.slice(0, 3)

// 개선: 관련성 점수 임계값 적용
.filter(context => context.relevanceScore > 0.5)
.slice(0, 2)
```

### C. 토큰 예산 관리
```javascript
// 목표 토큰 분배
const TOKEN_BUDGET = {
  systemPrompt: 800,
  context: 1000, 
  history: 200,
  userMessage: 100,
  output: 2048
};
```

## 현재 프롬프트 예시

```
[USER] You are Joohan Lee's career assistant chatbot...
CAREER CONTEXT:
PERSONAL: # Joohan Lee Gen AI Software Engineer...
EXPERIENCE: # Professional Experience ## Gen AI Software Engineer...

[MODEL] I understand. I'm ready to help visitors...

[USER] Tell me about Joohan's experience
[MODEL] Joohan is currently working as a Gen AI Software Engineer...

[USER] which school Joohan graduate?
```

이 구조가 현재 사용되고 있는 프롬프트 시스템입니다.