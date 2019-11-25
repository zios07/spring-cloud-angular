echo "starting keycloak deployment + ingress"

export MINIKUBE_IP=`minikube ip`
export KEYCLOAK_HOST=keycloak.$MINIKUBE_IP.demo.ko
export BACKEND_HOST=backend.$MINIKUBE_IP.demo.ko
export FRONTEND_HOST=frontend.$MINIKUBE_IP.demo.ko

kubectl create -f keycloak.yaml

cat keycloak-ingress.yaml | sed "s/KEYCLOAK_HOST/$KEYCLOAK_HOST/" \
| kubectl create -f -

echo https://$KEYCLOAK_HOST