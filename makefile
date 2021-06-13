init:
	@make build
	@make up
	@make migrate
build:
	docker-compose build
up:
	docker-compose up -d
down:
	docker-compose down
restart:
	@make down
	@make up
migrate:
	docker exec app yarn migration
migrate-test:
	docker exec app yarn migration:test
migrate-all:
	@make migrate
	@make migrate-test
unit-test:
	docker exec app yarn test