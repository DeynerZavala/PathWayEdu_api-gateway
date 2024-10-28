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
                // Autenticación con Google Cloud antes de hacer push
                sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                sh 'gcloud auth configure-docker'
                sh "docker push ${GCR_REGISTRY}/api-gateway"
            }
        }



        stage('Deploy to Google Cloud VM') {
            steps {
                // Autenticación automática del plugin
                sh """
                    gcloud compute ssh ${GCP_INSTANCE} --project=${GCP_PROJECT} --zone=${GCP_ZONE} \
                    --command="docker run -d --network=${DOCKER_NETWORK} --name api-gateway -p 3000:3000 ${GCR_REGISTRY}/api-gateway"
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
