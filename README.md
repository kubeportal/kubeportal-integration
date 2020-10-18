# kubeportal-integration

This project combines the sub-projects kubeportal (backend API) and kubeportal-frontend (JS vodoo) for integration testing. Both code bases are built as Docker image and deployed into a local Minikube installation.

The code of the sub-projects is fetched through Git subtree magic (https://github.com/git/git/blob/master/contrib/subtree/git-subtree.txt).

## Pull latest master branch state from sub-project:

```
git subtree pull --prefix kubeportal-api https://github.com/kubeportal/kubeportal.git master --squash

git subtree pull --prefix kubeportal-frontend https://github.com/kubeportal/kubeportal-frontend.git master --squash
```

## Push changes to sub-project into original repository:

- Create a new branch `<branch name>` in the target project
- Run:

```
git subtree push --prefix kubeportal-api https://github.com/kubeportal/kubeportal.git <branch name> --squash

git subtree push --prefix kubeportal-frontend https://github.com/kubeportal/kubeportal-frontend.git <branch name> --squash
```

## Start locally

You need a working Minikube installation on your machine. 

Re-build docker images from both sub-projects: ``make staging-build``

Deploy / start Docker images being built in Minikube: ``make staging-run``

Access frontend through port forwarding on http://localhost:8086: ``make staging-frontend-forward``

The frontend can reach the backend without port-forwarding, since both communicate over the private IP of the Minikube VM. Check the Makefile for details.

