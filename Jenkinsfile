#!/usr/bin/env groovy

pipeline {
    agent {label 'formbox'}

    tools {nodejs 'node6.11.3'}

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Quality Gate') {
            steps {
                sh 'npm run test'
            }
            post {
                always {
                    junit 'test/.results/*.xml'
                    withSonarQubeEnv('SonarQube') {
                        sh 'npm run sonar'
                    }
                    timeout(time: 1, unit: 'HOURS') {
                        script {
                            def qg = waitForQualityGate()
                            if (qg.status != 'OK') {
                                error 'Pipeline abgebrochen auf Grund von Quality Gate Fehlern: ${qg.status}'
                            }
                        }
                    }
                }
            }
        }
    }
}
