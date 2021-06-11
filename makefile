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