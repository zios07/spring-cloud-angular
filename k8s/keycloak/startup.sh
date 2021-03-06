echo "starting keycloak deployment + ingress"

export MINIKUBE_IP="104.197.138.57"
export KEYCLOAK_HOST=keycloak.$MINIKUBE_IP.nip.io
export BACKEND_HOST=backend.$MINIKUBE_IP.nip.io
export FRONTEND_HOST=frontend.$MINIKUBE_IP.nip.io

kubectl create -f keycloak.yaml

cat keycloak-ingress.yaml | sed "s/KEYCLOAK_HOST/$KEYCLOAK_HOST/" \
| kubectl create -f -

echo https://$KEYCLOAK_HOST