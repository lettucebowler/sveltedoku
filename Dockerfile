FROM node:17

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i --no-optional

COPY . .

RUN npm run build

FROM node:17-slim

WORKDIR /app
COPY --from=0 /app .
COPY . .

EXPOSE 3000
CMD ["node", "./build"]