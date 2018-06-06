NAME = lchaboud/docker-dashboard
VERSION = 1.0.0

all: build

build:
	docker build -t $(NAME):$(VERSION) --rm .
	docker tag $(NAME):$(VERSION) $(NAME):latest

push:
	docker push $(NAME)

