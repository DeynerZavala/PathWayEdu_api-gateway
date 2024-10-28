pipeline {
    agent any
 
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

        stage('Install Docker, Authenticate, and Deploy to Google Cloud VM') {
            steps {
                withCredentials([file(credentialsId: 'google-cloud-jenkins', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                    sh """
                        gcloud compute ssh ${GCP_INSTANCE} --project=${GCP_PROJECT} --zone=${GCP_ZONE} \
                        --command="sudo apt update && sudo apt install -y docker.io && sudo systemctl start docker && \
                                   gcloud auth configure-docker --quiet && \
                                   sudo docker pull ${GCR_REGISTRY}/api-gateway && \
                                   sudo docker run -d --network=${DOCKER_NETWORK} --name api-gateway -p 3000:3000 ${GCR_REGISTRY}/api-gateway"
                    """
                }
            }
        }


        stage('Install Docker and Deploy to Google Cloud VM') {
            steps {
                withCredentials([file(credentialsId: 'google-cloud-jenkins', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                    sh """
                        gcloud compute ssh ${GCP_INSTANCE} --project=${GCP_PROJECT} --zone=${GCP_ZONE} \
                        --command="sudo apt update && sudo apt install -y docker.io && sudo systemctl start docker && sudo docker run -d --network=${DOCKER_NETWORK} --name api-gateway -p 3000:3000 ${GCR_REGISTRY}/api-gateway"
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
