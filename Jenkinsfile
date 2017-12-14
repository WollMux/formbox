#!/usr/bin/env groovy

pipeline {
    agent {label 'formbox'}

    tools {nodejs 'node6.11.3'}

    environment {
        CHROME_BIN = '/usr/bin/chromium'
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Quality Gate') {
            steps {
                wrap([$class: 'Xvnc', takeScreenshot: false, useXauthority: true]) {
                    sh 'npm run test || error=true'
                    sh 'npm run e2e'
                    sh 'if [ $error ]; then exit -1; fi'
                }
            }
            post {
                always {
                    junit '**/.results/*.xml'
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
