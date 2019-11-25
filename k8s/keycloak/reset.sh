echo "Deleting all keycloak resources"
kubectl delete deploy --all
kubectl delete svc --all
kubectl delete ingress --all
echo "Keycloak successfully deleted"