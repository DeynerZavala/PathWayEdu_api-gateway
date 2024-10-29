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
                sh "docker build -t api-gateway ."
            }
        }

        stage('Copy Docker Image to VM') {
            steps {
                withCredentials([file(credentialsId: 'google-cloud-jenkins', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'

                    // Guardar la imagen en un archivo tar
                    sh "docker save api-gateway -o api-gateway.tar"

                    // Copiar el archivo de imagen a la instancia de Compute Engine
                    sh "gcloud compute scp api-gateway.tar ${GCP_INSTANCE}:/home/${USER}/ --zone=${GCP_ZONE} --project=${GCP_PROJECT}"
                }
            }
        }

        stage('Load and Run Docker Image on VM') {
            steps {
                withCredentials([file(credentialsId: 'google-cloud-jenkins', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                    sh """
                        gcloud compute ssh ${GCP_INSTANCE} --project=${GCP_PROJECT} --zone=${GCP_ZONE} --command="
                            if ! command -v docker &> /dev/null; then
                                sudo apt update && sudo apt install -y docker.io && sudo systemctl start docker;
                            fi;
                                                       
                            # Crear la red Docker si no existe
                            if ! docker network inspect $DOCKER_NETWORK} &> /dev/null; then
                                docker network create my-network;
                            fi;
                            
                            # Detener y eliminar contenedor api-gateway existente, si está en ejecución
                            if [ \$(docker ps -q -f name=api-gateway) ]; then
                                sudo docker stop api-gateway && sudo docker rm api-gateway;
                            fi;

                            # Cargar la imagen desde el archivo tar
                            sudo docker load -i /home/${USER}/api-gateway.tar;

                            # Ejecutar contenedor de api-gateway en el puerto 3000
                            sudo docker run -d --name api-gateway --network $DOCKER_NETWORK}-p ${API_GATEWAY_PORT}:3000 api-gateway;

                            # Eliminar archivo tar después de cargar la imagen
                            rm /home/${USER}/api-gateway.tar;
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
