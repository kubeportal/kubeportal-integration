SHELL=/bin/bash
VERSION=0.3.14

start:
	docker-compose build
	docker-compose up

stop:
	docker-compose down

pull-frontend:
	git subtree pull --prefix kubeportal-frontend https://github.com/kubeportal/kubeportal-frontend.git master --squash

push-frontend:
	git subtree push --prefix kubeportal-frontend https://github.com/kubeportal/kubeportal-frontend.git master --squash

pull-api:
	git subtree pull --prefix kubeportal-api https://github.com/kubeportal/kubeportal.git master --squash

push-api:
	git subtree push --prefix kubeportal-api https://github.com/kubeportal/kubeportal.git master --squash

# Stops a Minikube environment
minikube-stop: minikube-check
	minikube stop
	minikube delete

# Start a Minikube environment
minikube-start: minikube-check
	(minikube status | grep Running) || minikube start --network-plugin=cni --enable-default-cni
	kubectl config use-context minikube

# Check if minikube is installed
minikube-check:
	@test -f /usr/local/bin/minikube \
	|| test -f /usr/bin/minikube \
	|| test -f /bin/minikube \
	|| (echo ERROR: Minikube installation is missing on your machine. && exit 1)

# Prepares staging test Docker images in the Minikube environment
staging-build: minikube-start
	kubectl delete namespace kubeportal-integration --ignore-not-found=true
	kubectl create namespace kubeportal-integration
	cp .env kubeportal-frontend/
	eval $$(minikube docker-env); \
	  docker build -t troeger/kubeportal-api:staging ./kubeportal-api/; \
	  docker build -t sachs/kubeportal-frontend:staging ./kubeportal-frontend/
	rm kubeportal-frontend/.env

# Runs staging test Docker images in the Minikube environment
staging-run: staging-build minikube-start
	kubectl -n kubeportal-integration delete configmap kubeportal --ignore-not-found=true
	kubectl -n kubeportal-integration create configmap kubeportal --from-env-file=.env
	kubectl delete -f ./k8s/ --ignore-not-found=true
	kubectl apply -f ./k8s/


staging-frontend-forward:
	kubectl -n kubeportal-integration port-forward --address 0.0.0.0 svc/kubeportal-frontend 8086:8086

staging-api-forward:
	kubectl -n kubeportal-integration port-forward --address 0.0.0.0 svc/kubeportal-api 8000:8000



