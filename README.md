<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Nestjs template

Nest.js,MySQL,Redis のテンプレート

# Dependency

- Nest.js v7.0.0
- TypeScript v3.7.4
- MySQL v8.0
- TypeORM v0.2.34
- Redis v.6.2

# Directory structure

```
nest-template
  ├── Dockerfile
  ├── README.md
  ├── config
  ├── docker-compose.yml
  ├── jest.config.json
  ├── makefile
  ├── nest-cli.json
  ├── ormlogs.log
  ├── package.json
  ├── src
  │   ├── app.module.ts
  │   ├── domain
  │   │   ├── models
  │   │   ├── repositories
  │   │   └── services
  │   ├── infrastructure
  │   │   ├── database
  │   │   ├── modules
  │   │   └── terminus
  │   ├── main.ts
  │   ├── presentation
  │   │   ├── controllers
  │   │   ├── errors
  │   │   └── view-models
  │   └── usecases
  │       ├── post.usecase.ts
  │       └── user.usecase.ts
  ├── test
  │   ├── e2e
  │   │   ├── app.e2e-spec.ts
  │   │   └── jest-e2e.json
  │   └── unit
  │       └── infrastructure
  ├── tsconfig.build.json
  ├── tsconfig.json
  ├── webpack-hmr.config.js
  └── yarn.lock
```
