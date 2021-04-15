# Waited for services
/wait-for mysql:3306 & 
/wait-for mongo:27017 & 

wait

# Pass the NPM script inside double quotes as argument to this script
# e.g. ./wait-for-all "npm run start:dev"
echo 'Waited for all services successfully'
eval $1
