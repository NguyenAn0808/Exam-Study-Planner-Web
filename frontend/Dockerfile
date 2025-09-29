FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Tạo file .env.production từ các biến môi trường  
RUN echo "VITE_API_BASE_URL=${VITE_API_BASE_URL:-https://exam-planner-backend.graywave-05c71fd1.southeastasia.azurecontainerapps.io/api}" > .env.production

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /

# Cài đặt envsubst để thay thế biến môi trường trong nginx config
RUN apk add --no-cache gettext && \
    chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]