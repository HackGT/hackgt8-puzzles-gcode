FROM node:12.4-alpine

# Bundle Source
RUN mkdir -p /usr/src/hackgt8-puzzles-gcode
WORKDIR /usr/src/hackgt8-puzzles-gcode
COPY . /usr/src/hackgt8-puzzles-gcode
RUN yarn install --unsafe-perm

# Set Timezone to EST
RUN apk add tzdata
ENV TZ="/usr/share/zoneinfo/America/New_York"

FROM node:12.4-alpine
COPY --from=0 /usr/src/hackgt8-puzzles-gcode/server/ /usr/src/hackgt8-puzzles-gcode/server/
COPY --from=0 /usr/src/hackgt8-puzzles-gcode/client/ /usr/src/hackgt8-puzzles-gcode/client/
EXPOSE 3000
WORKDIR /usr/src/hackgt8-puzzles-gcode/server
CMD ["node", "build/index.js"]
