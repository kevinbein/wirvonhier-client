FROM node:12.18.2-alpine3.12 AS client-builder

WORKDIR /home/node/client

# we want the latest npm version for speed + fixes
RUN npm i npm@latest -g

COPY package*.json* ./
RUN npm ci --no-optional

COPY ./.babelrc \
  ./.eslintignore \
  ./.eslintrc \
  ./.prettierrc \
  ./.stylelintignore \
  ./.stylelintrc \
  ./package.json \
  ./package-lock.json \
  ./postcss.config.js \
  ./tsconfig.json \
  ./webpack.config.js ./

COPY ./public ./public
COPY ./src ./src

RUN npm run lint \
  && npm run build

# trivy scans our image for vulnerabilities
# by default it exits with 0 even if vulnerabilities are found
# optional add "--exit-code 1"
RUN apk add curl \
  && curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/master/contrib/install.sh | sh -s -- -b /usr/local/bin \
  && trivy filesystem --no-progress /

FROM nginx:1.19.1-alpine AS client

EXPOSE 8080

COPY --chown=nginx:nginx ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx --from=client-builder /home/node/client/dist /usr/share/nginx/html

# Uses CMD from nginx image