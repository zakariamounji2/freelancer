pipeline {
    agent any

    tools {
        dockerTool 'docker'
    }

    environment {
        REGISTRY_USER  = 'zakariamounji2'
        FRONTEND_IMAGE = 'nextjs-frontend'
        BACKEND_IMAGE  = 'springboot-backend'
        DB_IMAGE       = 'mysql-db' // 1. Added DB Image variable
        IMAGE_TAG      = 12
        DOCKER_API_VERSION = '1.40'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build DB Image') { // 2. New stage for your custom DB
            steps {
                script {
                    sh "docker build -t ${REGISTRY_USER}/${DB_IMAGE}:${IMAGE_TAG} -t ${REGISTRY_USER}/${DB_IMAGE}:latest ./db"
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    sh "docker build -t ${REGISTRY_USER}/${FRONTEND_IMAGE}:${IMAGE_TAG} -t ${REGISTRY_USER}/${FRONTEND_IMAGE}:latest ./frontend"
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    sh "docker build -t ${REGISTRY_USER}/${BACKEND_IMAGE}:${IMAGE_TAG} -t ${REGISTRY_USER}/${BACKEND_IMAGE}:latest ./backend"
                }
            }
        }

        stage('Deploy Stack') {
            steps {
                script {
                    echo "Successfully built tracking tags version: ${IMAGE_TAG}"
                    echo "Ready to run docker-compose up!"
                }
            }
        }
    }
}
