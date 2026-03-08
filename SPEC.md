# Technical Specification – Note Taking Web App

## 1. Overview

This SPA should show the app owner's github merged pull requests and its
commits. It should reflect the contributions made on github as a blog like SPA.

### Tech

- React with typescript
- TailwindCSS
- ShikJS for code content

## 2. Architecture

- Frontend-only
- Calls to github's REST API
- Using owner's API key as env variable

## 3. Appearance

- Clean and minimalistic
- Each contribution (merged pull request)
  - Date & PR title
  - PR description
  - PR's commits:
    - code (excerpt if it exceeds 20 lines of code) with shikijs
    - if excerpt, then expandable
  - if number of PR's commits is bigger than 8, then hide and make rest
    expandable
- Infinite scroll, every 10 entries
