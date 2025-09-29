#!/bin/sh

# Thay thế biến môi trường trong nginx config
export BACKEND_URL=${BACKEND_URL:-https://exam-planner-backend.reddog-2de3819f.eastasia.azurecontainerapps.io}
envsubst '${BACKEND_URL}' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf.tmp
mv /etc/nginx/conf.d/default.conf.tmp /etc/nginx/conf.d/default.conf

# Thực thi lệnh được truyền vào
exec "$@"