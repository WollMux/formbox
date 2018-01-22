#!/usr/bin/env groovy

pipeline {
    agent {label 'formbox'}

    options { disableConcurrentBuilds() }

    tools {nodejs 'node6.11.3'}

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build-jenkins'
            }
        }

        stage('Quality Gate') {
            steps {
                wrap([$class: 'Xvnc', takeScreenshot: false, useXauthority: true]) {
                    sh 'npm run test-jenkins || error=true'
                    sh 'npm run webdriver-update -- --standalone false --chrome false'
                    sh 'npm run e2e'
                    sh 'if [ $error ]; then exit -1; fi'
                }
            }
            post {
                always {
                    junit '**/.results/*.xml'
                    script {
                        if (GIT_BRANCH == 'master') {
                            withSonarQubeEnv('SonarQube') {
                                sh 'npm run sonar'
                            }
                            timeout(time: 1, unit: 'HOURS') {
                                script {
                                    def qg = waitForQualityGate()
                                    if (qg.status != 'OK') {
                                        error "Pipeline abgebrochen auf Grund von Quality Gate Fehlern: ${qg.status}"
                                    }
                                }
                            }
                        } else {
                            withSonarQubeEnv('SonarQube') {
                                withCredentials([usernamePassword(credentialsId: '3eaee9fd-bbdd-4825-a4fd-6b011f9a84c3', passwordVariable: 'GITHUB_ACCESS_TOKEN', usernameVariable: 'USER')]) {
                                    sh "npm run sonar -- -Dsonar.analysis.mode=preview -Dsonar.github.pullRequest=${env.CHANGE_ID} \
                                        -Dsonar.github.repository=wollmux/formbox \
                                        -Dsonar.github.oauth=${GITHUB_ACCESS_TOKEN}"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
