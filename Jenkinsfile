pipeline {
    agent any
    environment {

        EMAIL_BODY =
        """
            <p>EXECUTED: Job <b>\'${env.JOB_NAME}:${env.BUILD_NUMBER})\'</b></p>
            <p>
            View console output at
            "<a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a>"
            </p>
            <p><i>(Build log is attached.)</i></p>
        """

        EMAIL_SUBJECT_SUCCESS = "Status: 'SUCCESS' -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'"
        EMAIL_SUBJECT_FAILURE = "Status: 'FAILURE' -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'"
        EMAIL_RECEPIENT = 'bmarete10@gmail.com'
    }


    tools {
        nodejs 'Node-14'
    }

    stages {
        stage ('Clone repository') {
            steps {
                git 'https://github.com/brianmarete/gallery.git'
            }
        }

        stage ('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage ('Run tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy to Heroku') {
          steps {
              withCredentials([usernameColonPassword(credentialsId: 'Heroku', variable: 'HEROKU_CREDENTIALS' )]){
                    sh 'git push https://${HEROKU_CREDENTIALS}@git.heroku.com/secret-shore-37984.git master'
              }
          }
        }
    }
  post {
    failure {
      emailext attachLog: true,
      body: EMAIL_BODY,
      subject: EMAIL_SUBJECT_FAILURE,
      to: EMAIL_RECEPIENT
    }
  }

}
