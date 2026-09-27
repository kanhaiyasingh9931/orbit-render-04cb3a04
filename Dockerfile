FROM busybox:1.36
RUN adduser -D -u 1000 appuser
USER appuser
WORKDIR /app
COPY . /app
EXPOSE 3000
CMD ["npm", "start"]
