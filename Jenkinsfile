pipeline {
    agent any

    environment {
        GOOGLE_APPLICATION_CREDENTIALS = credentials('google-cloud-jenkins')
        GCP_PROJECT = 'your-gcp-project-id'
        GCP_ZONE = 'your-gcp-zone'
        GCP_INSTANCE = 'your-instance-name'
        DOCKER_NETWORK = 'my-network'
        GCR_REGISTRY = "gcr.io/${GCP_PROJECT}"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/your-org/pathway-edu-api-gateway.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Construye y etiqueta la imagen para GCR
                sh 'docker build -t ${GCR_REGISTRY}/api-gateway .'
            }
        }

        stage('Push Docker Image to GCR') {
            steps {
                script {
                    // Autenticación con Google Cloud para acceder a GCR
                    sh 'gcloud auth configure-docker'
                    // Enviar la imagen a GCR
                    sh 'docker push ${GCR_REGISTRY}/api-gateway'
                }
            }
        }

        stage('Deploy to Google Cloud VM') {
            steps {
                // Despliega el contenedor desde GCR en la VM de Google Cloud
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
