#!/bin/bash

echo "building discovery-server"

cd discovery-server
# mvn clean package -DskipTests

echo "building edge-server"

cd ../edge-server
mvn clean package -DskipTests

echo "building config-server"

cd ../config-server
mvn clean package -DskipTests

echo "building product-service"

cd ../eco-back
mvn clean package -DskipTests

echo "building attachment-service"

cd ../attachment-service
mvn clean package -DskipTests

echo ""
echo "Building images ..."
echo ""
echo "Building image for discovery-server"
echo ""

cd discovery-server
# docker build -t zios07/discovery-server .


echo ""
echo "Building image for edge-server"
echo ""

docker build -t zios07/edge-server ../edge-server


echo ""
echo "Building image for config-server"
echo ""

docker build -t zios07/config-server ../config-server


echo ""
echo "Building image for product-server"
echo ""

docker build -t zios07/product-service ../eco-back

echo ""
echo "Building image for attachment-server"
echo ""

docker build -t zios07/attachment-service ../attachment-service
exit;
