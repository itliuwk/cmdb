---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {APP_NAME}
  labels:
    app: {APP_NAME}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: {APP_NAME}
  template:
    metadata:
      labels:
        app: {APP_NAME}
    spec:
      containers:
      - name: {APP_NAME}
        image: {IMAGE_URL}:{IMAGE_TAG}
        ports:
        - containerPort: {PORT}
          name: web
          protocol: TCP
        - containerPort: {PROXY_PORT}
          name: proxy
          protocol: TCP
        readinessProbe:
          httpGet:
            path: /
            port: {PORT}
          initialDelaySeconds: 60
          periodSeconds: 30
          failureThreshold: 6
---
apiVersion: v1
kind: Service
metadata:
  name: {SERVICE_NAME}
  labels:
    app: {APP_NAME}
spec:
  type: NodePort
  ports:
  - name: web
    port: {PORT}
    targetPort: {TARGET_PORT}
    nodePort: {NODE_PORT}
    protocol: TCP
  - name: proxy
    port: {PROXY_PORT}
    targetPort: {PROXY_TARGET_PORT}
    nodePort: {PROXY_NODE_PORT}
    protocol: TCP
  selector:
    app: {APP_NAME}

