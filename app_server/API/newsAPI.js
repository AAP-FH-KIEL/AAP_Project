module.exports.homelist = function(req, res){
    var requestOptions, path;
    path = '/api/locations';
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {},
        qs : {
            lng : -0.7992599,
            lat : 51.378091,
            maxDistance : 20
        }
    };
    request(
        requestOptions,
        function(err, response, body) {
            renderHomepage(req, res);
        }
    );
};


