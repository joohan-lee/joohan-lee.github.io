# 데이터 Flow 분석: index.html → LLM 

## 전체 아키텍처 Flow

```
index.html (소스) 
    ↓ [빌드 시점]
html-to-markdown.js (추출 스크립트)
    ↓ 
portfolio-complete.md (생성된 markdown)
    ↓ [런타임]
markdownDataLoader.js (로더)
    ↓
gemini-service.js (LLM 서비스)
    ↓
chatbot.js (UI)
```

## 1. 소스 데이터: index.html

### 데이터 속성 시스템
```html
<!-- 섹션 마커 -->
<div data-extract="personal">...</div>
<div data-extract="experience">...</div>  
<div data-extract="projects">...</div>
<div data-extract="skills">...</div>

<!-- 세부 속성 -->
<div data-extract="achievements">...</div>
<div data-extract="technologies">...</div>
<div data-extract="technical-focus">...</div>

<!-- 엔티티 식별자 -->
<li data-job-id="samsung-sds-genai" data-company="Samsung SDS America">
<li data-project-id="multimodal-rag" data-technologies="LangChain,AWS Bedrock">
<li data-education-id="usc-masters" data-institution="USC">
```

### 섹션별 구조
- **Personal**: `data-extract="personal"` - 이름, 타이틀, 소개, 성취, 기술적 전문성
- **Experience**: `data-extract="experience"` - 각 직업은 `data-job-id`로 식별
- **Projects**: `data-extract="projects"` - 각 프로젝트는 `data-project-id`로 식별  
- **Skills**: `data-extract="skills"` - 기술 스킬들
- **Education**: `data-extract="education"` - 학력 정보

## 2. 빌드 프로세스: html-to-markdown.js

### 추출 로직
```javascript
// 각 섹션별 추출 함수
extractPersonal(document)    // data-extract="personal" 요소들 추출
extractExperience(document)  // data-extract="experience", data-job-id 요소들 추출
extractProjects(document)    // data-extract="projects", data-project-id 요소들 추출
extractSkills(document)      // data-extract="skills" 요소들 추출
```

### 출력 형식: Frontmatter + Markdown
```markdown
---
name: "Joohan Lee"
title: "Gen AI Software Engineer"  
extracted_date: "2025-07-29T05:00:00.553Z"
---

# Joohan Lee
Gen AI Software Engineer

---
type: "experience"
extracted_date: "2025-07-29T05:00:00.557Z"
---

# Professional Experience
## Gen AI Software Engineer at Samsung SDS America
...

---
type: "projects"  
extracted_date: "2025-07-29T05:00:00.560Z"
---

# Portfolio Projects
...
```

## 3. 런타임 로더: markdownDataLoader.js

### 현재 파싱 로직 (문제점)
```javascript
parseMarkdownSections(content) {
  // frontmatter 블록으로 분할
  const blocks = content.split(/^---$/m);
  
  // type: "experience", type: "projects" 등을 찾아서 매핑
  if (block.includes('type:')) {
    const typeMatch = block.match(/type:\s*"([^"]+)"/);
    // 하드코딩된 매핑
    if (sectionType === 'experience') sections.experience = sectionContent;
    else if (sectionType === 'projects') sections.projects = sectionContent;
  }
}
```

### 문제점 분석
1. **하드코딩**: `experience`, `projects`, `skills` 타입이 하드코딩됨
2. **확장성 부족**: 새로운 섹션 타입 추가 시 코드 수정 필요
3. **불완전한 파싱**: frontmatter와 content 매핑이 부정확할 수 있음

## 4. LLM 서비스: gemini-service.js

### 기대하는 데이터 구조
```javascript
careerData = {
  personal: "개인 정보 마크다운 텍스트",
  experience: "경력 정보 마크다운 텍스트", 
  projects: "프로젝트 정보 마크다운 텍스트",
  skills: "스킬 정보 마크다운 텍스트",
  education: "학력 정보 마크다운 텍스트",      // 현재 누락
  certifications: "자격증 정보 마크다운 텍스트" // 현재 누락
}
```

## 5. 문제점 및 해결방안

### 현재 문제
1. **markdownDataLoader.parseMarkdownSections()**: 하드코딩된 섹션 매핑
2. **missing sections**: education, certifications 섹션이 추출되지 않음
3. **유지보수성**: 새 섹션 추가 시 여러 파일 수정 필요

### 해결방안
1. **동적 섹션 파싱**: frontmatter의 type을 그대로 사용
2. **완전한 섹션 추출**: 모든 data-extract 속성 처리
3. **일관된 네이밍**: HTML 속성과 markdown type 일치

## 6. 제안하는 개선된 Flow

```javascript
// 개선된 parseMarkdownSections
parseMarkdownSections(content) {
  const sections = {};
  const blocks = content.split(/^---$/m);
  
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i].trim();
    if (!block) continue;
    
    // 동적 타입 추출
    const typeMatch = block.match(/type:\s*"([^"]+)"/);
    if (typeMatch && i + 1 < blocks.length) {
      const sectionType = typeMatch[1];
      const sectionContent = blocks[i + 1].trim();
      sections[sectionType] = sectionContent;  // 동적 매핑
      i++; // skip content block
    }
    // 개인 정보는 frontmatter 없이 처리
    else if (block.includes('Joohan Lee')) {
      sections.personal = block;
    }
  }
  
  return sections;
}
```

이렇게 하면:
- 하드코딩 제거
- 새 섹션 자동 지원  
- 확장성 확보
- 유지보수성 향상