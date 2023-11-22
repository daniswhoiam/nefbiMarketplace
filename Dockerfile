FROM node:18.16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/nefbiMarketplace
COPY package*.json ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:18.6-alpine AS builder
WORKDIR /usr/src/nefbiMarketplace
COPY . .
COPY --from=deps /usr/src/nefbiMarketplace/node_modules ./node_modules
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:18.6-alpine AS runner
WORKDIR /usr/src/nefbiMarketplace
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /usr/src/nefbiMarketplace/next.config.js ./
COPY --from=builder /usr/src/nefbiMarketplace/public ./public
COPY --from=builder --chown=nextjs:nodejs /usr/src/nefbiMarketplace/.next ./.next
COPY --from=builder /usr/src/nefbiMarketplace/node_modules ./node_modules
COPY --from=builder /usr/src/nefbiMarketplace/package.json ./package.json
COPY entrypoint.sh .
COPY .env.production .
# Execute script
RUN apk add --no-cache --upgrade bash
RUN ["chmod", "+x", "./entrypoint.sh"]
ENTRYPOINT ["./entrypoint.sh"]

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1
CMD ["node_modules/.bin/next", "start"]