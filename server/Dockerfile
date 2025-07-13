FROM oven/bun:1.1.0

WORKDIR /server

CMD ["pwd"]

COPY . .

RUN bun install

EXPOSE 8080
CMD ["bun", "run", "start"]