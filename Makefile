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

# Prepares staging test Docker images in the Minikube environment
#
# The frontend docker image needs the .env file with the API server URL
# at build time, so we create it here. Given the fact that the staging
# API server Docker image is deployed as NodePort service, it is possible
# for the frontend to access the API through the minikube IP. This leads to
# the fact that the minikube cluster must already run at build time.
staging-build: minikube-start
	kubectl delete namespace kubeportal-integration --ignore-not-found=true
	kubectl create namespace kubeportal-integration
	echo "VUE_APP_BASE_URL=http://`minikube ip`:30123" > kubeportal-frontend/.env
	eval $$(minikube docker-env); \
	  docker build -t troeger/kubeportal-api:staging ./kubeportal-api/; \
	  docker build -t sachs/kubeportal-frontend:staging ./kubeportal-frontend/
	rm kubeportal-frontend/.env

# Runs staging test Docker images in the Minikube environment
#
# The API server is configured at run-time, so we create the according env file here
# for preparing the config map
staging-run: staging-build minikube-start
	kubectl -n kubeportal-integration delete configmap kubeportal --ignore-not-found=true
	echo "KUBEPORTAL_ALLOWED_URLS=http://localhost:8086,http://`minikube ip`:30123" > .env
	kubectl -n kubeportal-integration create configmap kubeportal --from-env-file=.env
	rm .env
	kubectl delete -f ./k8s/ --ignore-not-found=true
	kubectl apply -f ./k8s/
	sleep 10
	kubectl logs -l app.kubernetes.io/name=kubeportal-api --tail=-1|grep Superuser password

staging-frontend-forward:
	kubectl -n kubeportal-integration port-forward --address 0.0.0.0 svc/kubeportal-frontend 8086:8086

staging-api-forward:
	kubectl -n kubeportal-integration port-forward --address 0.0.0.0 svc/kubeportal-api 8000:8000



