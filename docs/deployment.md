# Deployment Guide

## 배포 구조

```
push to main
  → GitHub Actions (deploy.yml)
    → npm run extract        # index.html → data/*.md 변환
    → touch .nojekyll        # Jekyll 비활성화
    → upload-pages-artifact  # 전체 디렉토리 업로드
    → deploy-pages@v4        # GitHub Pages에 배포
```

정적 사이트. 빌드 프레임워크 없이 HTML/CSS/JS를 그대로 서빙한다.

## GitHub Pages 설정

**필수:** Repository Settings → Pages → Build and deployment → Source를 **"GitHub Actions"** 로 설정해야 한다.

"Deploy from a branch" (legacy)로 설정되면 Jekyll이 `.md` 파일을 HTML로 변환하여 챗봇 데이터 로딩이 실패한다.

> 주의: repo를 private → public으로 전환하면 Pages 설정이 legacy로 리셋될 수 있다. 전환 후 반드시 확인할 것.

## 챗봇 데이터 파이프라인

```
index.html (포트폴리오 원본)
  → npm run extract (build-scripts/html-to-markdown.js)
    → data/portfolio-complete.md   # 전체 통합본 (챗봇이 사용)
    → data/experience.md           # 개별 섹션
    → data/education.md
    → data/skills.md
    → data/projects.md
    → data/personal.md
```

챗봇 런타임 흐름:
```
브라우저
  → markdownDataLoader.js: fetch('./data/portfolio-complete.md')
  → gemini-service.js: system_instruction으로 Gemini API에 전달
  → supabase edge function (gemini-proxy): Gemini API 프록시
```

`portfolio-complete.md`가 404이면 챗봇 데이터가 빈 채로 전달되어 할루시네이션이 발생한다.

## .nojekyll

Jekyll 비활성화를 이중으로 보장한다:
- **repo 루트의 `.nojekyll` 파일** — legacy 빌드가 돌아도 md 변환 방지
- **deploy.yml의 `touch .nojekyll` 스텝** — workflow 배포 시에도 포함

## 배포에 포함되지 않아야 할 것

`upload-pages-artifact`는 `path: '.'`로 전체 디렉토리를 업로드한다. `.gitignore`에 의해 `node_modules/`는 제외된다.

배포에 포함되지만 서빙에만 불필요한 파일들:
- `build-scripts/` — 빌드 시에만 사용
- `supabase/` — Edge Function 소스 (별도 배포)
- `package.json`, `package-lock.json` — npm용
- `docs/` — 문서

이들은 사이트 동작에 영향을 주지 않으므로 그대로 둬도 무방하다.
