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
                // Construir imagen usando la nueva dirección de Artifact Registry
                sh "docker build -t ${GCR_REGISTRY}/api-gateway ."
            }
        }

        stage('Authenticate and Push Docker Image to Artifact Registry') {
            steps {
                withCredentials([file(credentialsId: 'google-cloud-jenkins', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    // Autenticación en Google Cloud y configuración de Docker para Artifact Registry
                    sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                    sh 'gcloud auth configure-docker us-central1-docker.pkg.dev --quiet'
                    
                    // Empujar imagen a Artifact Registry
                    sh "docker push ${GCR_REGISTRY}/api-gateway"
                }
            }
        }

        stage('Install Docker if Needed, Authenticate, and Deploy to Google Cloud VM') {
            steps {
                withCredentials([file(credentialsId: 'google-cloud-jenkins', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                    sh """
                        gcloud compute ssh ${GCP_INSTANCE} --project=${GCP_PROJECT} --zone=${GCP_ZONE} --command="
                            if ! command -v docker &> /dev/null; then
                                sudo apt update && sudo apt install -y docker.io && sudo systemctl start docker;
                            fi &&
                            gcloud auth configure-docker us-central1-docker.pkg.dev --quiet &&
                            sudo docker pull ${GCR_REGISTRY}/api-gateway:latest &&
                            sudo docker run -d --network='my-network' --name api-gateway -p 3000:3000 ${GCR_REGISTRY}/api-gateway:latest
                        "
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
