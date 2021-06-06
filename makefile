build:
	docker-compose build
up:
	docker-compose up -d
down:
	docker-compose down
restart:
	@make up
	@make down