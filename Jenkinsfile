pipeline {
    agent any

    environment {
        GCR_REGISTRY = 'gcr.io/emerald-state-437807-d8'  // Ajusta a tu ID de proyecto real
        GCP_PROJECT = 'emerald-state-437807-d8'
        GCP_ZONE = 'us-central1-a'  // Cambia esto si tu zona es diferente
        GCP_INSTANCE = 'your-instance-name'
        DOCKER_NETWORK = 'my-network'
    }
    
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/DeynerZavala/PathWayEdu_api-gateway.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${GCR_REGISTRY}/api-gateway ."
            }
        }

        stage('Push Docker Image to GCR') {
            steps {
                withCredentials([[$class: 'GoogleServiceAccount', credentialsId: 'google-cloud-jenkins']]) {
                    sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                    sh 'gcloud auth configure-docker'
                    sh "docker push ${GCR_REGISTRY}/api-gateway"
                }
            }
        }

        stage('Deploy to Google Cloud VM') {
            steps {
                withCredentials([[$class: 'GoogleServiceAccount', credentialsId: 'google-cloud-jenkins']]) {
                    sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                    sh """
                        gcloud compute ssh ${GCP_INSTANCE} --project=${GCP_PROJECT} --zone=${GCP_ZONE} \
                        --command="docker run -d --network=${DOCKER_NETWORK} --name api-gateway -p 3000:3000 ${GCR_REGISTRY}/api-gateway"
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'API Gateway deployment successful!'
        }
        failure {
            echo 'API Gateway deployment failed.'
        }
    }
}
