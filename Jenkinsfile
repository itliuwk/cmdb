def label = "${BUILD_TAG}"
label=label.replaceAll("%2F",'-')
def GIT_REPO = "${JOB_NAME}"
//def GIT_REPO = "${env.gitlabSourceRepoName}"
//def GIT_BRANCH = "${env.gitlabTargetBranch}"

podTemplate(label: label,cloud: 'kubernetes',namespace: 'devops',
    containers: [
        containerTemplate(name: 'jnlp', 
            image: 'harbor.devops.shccs.com.cn/devops/jenkins-slave:v5.1', 
            alwaysPullImage: true,
		    args: '${computer.jnlpmac} ${computer.name}'),
	],
    volumes: [
        hostPathVolume(mountPath: '/usr/bin/docker',hostPath: '/usr/local/bin/docker'),
        hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
        hostPathVolume(mountPath: '/root/.m2/repository', hostPath: '/var/lib/docker/k8s-hostpath/mavenRepos')]
) {


    node(label) {
        withCredentials([
	    usernamePassword(credentialsId: "HARBOR_CRED", passwordVariable: 'HARBOR_PASSWD', usernameVariable: 'HARBOR_USERNAME'),
	    string(credentialsId: 'K8S_CRED',variable: 'K8S_CONFIG'),
	    ])
    {

        properties([
            parameters([
                string(defaultValue: 'harbor.devops.shccs.com.cn', description: 'Docker仓库地址', name: 'DOCKER_REGISTRY', trim: false),  
                string(defaultValue: 'cmdb-front', description: 'k8s中标签名', name: 'APP_NAME', trim: false), 
                string(defaultValue: 'shccs-cloud-cmdb-dev', description: 'k8s的namespace名称', name: 'K8S_NAMESPACE', trim: false),
                string(defaultValue: 'cmdb-front', description: 'vue-service名称', name: 'SERVICE_NAME', trim: false),
                string(defaultValue: '30280', description: 'NodePort', name: 'NODE_PORT', trim: false),
                string(defaultValue: '80', description: 'targetPort', name: 'TARGET_PORT', trim: false),
                string(defaultValue: '80', description: 'port', name: 'PORT', trim: false),
                string(defaultValue: '33000', description: 'proxy targetPort', name: 'PROXY_TARGET_PORT', trim: false),
                string(defaultValue: '33000', description: 'proxy port', name: 'PROXY_PORT', trim: false),
                string(defaultValue: '33000', description: 'proxy nodePort', name: 'PROXY_NODE_PORT', trim: false),
            ])
        ])
        def DOCKER_IMAGE = "${DOCKER_REGISTRY}/${K8S_NAMESPACE}/${GIT_REPO}"
        stage("checkout"){
            checkout scm
        }
        stage('Npm build'){
            sh 'npm config set registry https://registry.npm.taobao.org'
//            sh 'npm config set disturl https://npm.taobao.org/dist'
            sh 'npm run pre && npm run build:qas'
//            sh 'sleep 1000'
        }
        stage('Push Harbor') {
            GIT_TAG = sh(returnStdout: true,script: 'git describe --tags --always').trim()
            sh "docker login -u ${HARBOR_USERNAME} -p ${HARBOR_PASSWD} ${DOCKER_REGISTRY}"
            sh "docker build -t ${DOCKER_IMAGE}:${GIT_TAG} ."
            sh "docker push ${DOCKER_IMAGE}:${GIT_TAG}"
            sh "docker rmi ${DOCKER_IMAGE}:${GIT_TAG}"
        }
        stage('K8s Deploy') {
            sh "mkdir -p ~/.kube"
            sh "sed -e 's#{IMAGE_URL}#${DOCKER_IMAGE}#g;s#{IMAGE_TAG}#${GIT_TAG}#g;s#{APP_NAME}#${APP_NAME}#g;s#{SERVICE_NAME}#${SERVICE_NAME}#g;s#{PORT}#${PORT}#g; s#{NODE_PORT}#${NODE_PORT}#g; s#{TARGET_PORT}#${TARGET_PORT}#g;s#{PROXY_TARGET_PORT}#${PROXY_TARGET_PORT}#g; s#{PROXY_PORT}#${PROXY_PORT}#g; s#{PROXY_NODE_PORT}#${PROXY_NODE_PORT}#g;' k8s-deployment.tpl > k8s-deployment.yml"
            sh "kubectl apply -f k8s-deployment.yml --namespace=${K8S_NAMESPACE}"
        }
    }
    }
}