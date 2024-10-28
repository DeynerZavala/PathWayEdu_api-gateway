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


        stage('Authenticate and Push Docker Image to GCR') {
            steps {
                withCredentials([file(credentialsId: 'google-cloud-jenkins', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                    sh 'gcloud auth configure-docker'
                    sh "docker push ${GCR_REGISTRY}/api-gateway"
                }
            }
        }

        stage('Install Docker if Needed, Authenticate, and Deploy to Google Cloud VM') {
            steps {
                sh """
                    gcloud compute ssh ${GCP_INSTANCE} --project=${GCP_PROJECT} --zone=${GCP_ZONE} \
                    --command="if ! command -v docker &> /dev/null; then \
                                  sudo apt update && sudo apt install -y docker.io && sudo systemctl start docker; \
                               fi && \
                               gcloud auth configure-docker us-docker.pkg.dev --quiet && \
                               sudo docker pull ${ARTIFACT_REGISTRY}/api-gateway && \
                               sudo docker run -d --network=${DOCKER_NETWORK} --name api-gateway -p 3000:3000 ${ARTIFACT_REGISTRY}/api-gateway"
                """
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
