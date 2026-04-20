# Contributing to cnMarket

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

1. Clone the repo: `git clone https://github.com/phessophissy/cnMarket.git`
2. Install root dependencies: `npm install`
3. Install frontend dependencies: `cd frontend && npm install`
4. Copy environment variables: `cp .env.example .env`
5. Compile contracts: `npm run compile`
6. Start frontend: `cd frontend && npm run dev`

## Branching Strategy

- `main` — production-ready code
- `feature/*` — new features
- `fix/*` — bug fixes

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` — new features
- `fix:` — bug fixes
- `chore:` — maintenance
- `docs:` — documentation
- `style:` — formatting
- `refactor:` — code restructuring
- `test:` — adding tests

## Smart Contract Changes

All contract changes must include updated tests and pass compilation.
