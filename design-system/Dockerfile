FROM node:20-alpine
WORKDIR /app

# O Storybook precisa de acesso aos componentes do frontend
# No Docker Compose, montaremos os volumes para garantir que o alias @/ funcione
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 6006
CMD ["npm", "run", "storybook", "--", "--host", "0.0.0.0", "--ci"]
