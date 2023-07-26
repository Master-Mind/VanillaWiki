FROM node:16-alpine
WORKDIR /app
COPY . .
CMD ["node", "server.mjs"]
EXPOSE 8000
