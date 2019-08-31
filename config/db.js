if(process.env.NODE_ENV == "production"){
    module.exports = {mongoURI: "mongodb+srv://admin:2vteNQl4G5Ns3pGY@cluster0-uxiyq.mongodb.net/test?retryWrites=true"}
}else{
    module.exports = {mongoURI: "mongodb://localhost/fotografo"}
}

