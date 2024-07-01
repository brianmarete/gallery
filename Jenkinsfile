pipeline {
    agent any 

    environment {
        DOCKER_IMAGE = 'bmarete/gallery'  
        DOCKER_TAG = 'latest'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') 
    }
    
    tools {
        nodejs 'Node-14'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/brianmarete/gallery.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        // stage('Run tests') {
        //     steps {
        //         sh 'npm test'
        //     }
        // }

 
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', DOCKERHUB_CREDENTIALS) {
                        dockerImage.push()
                    }
                }
            }
        }
    }
}
