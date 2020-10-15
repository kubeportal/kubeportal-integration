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
	(minikube status | grep Running) || minikube start
	kubectl config use-context minikube

# Check if minikube is installed
minikube-check:
	@test -f /usr/local/bin/minikube \
	|| test -f /usr/bin/minikube \
	|| test -f /bin/minikube \
	|| (echo ERROR: Minikube installation is missing on your machine. && exit 1)

# Prepare a staging test Docker image in the Minikube environment
# This works by utilizing the Docker environment inside Minikube
staging-build: minikube-start
	eval $$(minikube docker-env); docker build -t troeger/kubeportal-api:staging ./kubeportal-api/; docker build -t sachs/kubeportal-frontend:staging ./kubeportal-frontend/

# Runs the production Docker image in Minikube
# Configuration: Production
staging-run: staging-build minikube-start
	kubectl apply -f ./k8s/namespace.yml
	kubectl apply -f ./k8s/
	kubectl -n kubeportal delete configmap kubeportal --ignore-not-found=true
	kubectl -n kubeportal create configmap kubeportal --from-env-file=.env
#	kubectl -n kubeportal logs deployment/kubeportal
	kubectl -n kubeportal port-forward svc/kubeportal-frontend 8086:8086



