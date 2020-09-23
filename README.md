# kubeportal-integration

This repository combines the Kubeportal backend API implementation with the frontend implementation. Both sub-projects are included through [Git sub-trees](https://github.com/git/git/blob/master/contrib/subtree/git-subtree.txt). 

## Update sub-projects

```
git subtree pull --prefix kubeportal-api https://github.com/kubeportal/kubeportal.git fe-api --squash
aka:
make pull-api
```

```
git subtree push --prefix kubeportal-api https://github.com/kubeportal/kubeportal.git fe-api --squash
aka:
make push-api
```

## Configuration

The backend needs minimal configuration, as described in the [documenation](https://kubeportal.readthedocs.io/en/latest/installation.html). This can be achieved for this project by storing a '.env' file in the project root with the following content:

```
KUBEPORTAL_AUTH_AD_DOMAIN = beuth-hochschule.de
KUBEPORTAL_AUTH_GOOGLE_SECRET = <OAuth secret>
KUBEPORTAL_AUTH_GOOGLE_KEY= <OAuth client ID>
```

Without that, only the `root` account is functional for the API backend, as described in the [documenation](https://kubeportal.readthedocs.io/en/latest/users.html#superuser).


