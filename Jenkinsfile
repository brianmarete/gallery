pipeline {
    agent any

    stages {
        stage ('Clone repository') {
            steps {
                git 'https://github.com/brianmarete/gallery.git'
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
}
