init:
	@make build
	@make up
	@make migrate-all
build:
	docker-compose build
up:
	docker-compose up -d
up-db:
	docker-compose up -d mysql mysql-test
down:
	docker-compose down
restart:
	@make down
	@make up
migrate:
	docker exec app yarn migrate
migrate-test:
	docker exec app yarn migrate:test
migrate-all:
	@make migrate
	@make migrate-test
unit-test:
	docker exec app yarn test