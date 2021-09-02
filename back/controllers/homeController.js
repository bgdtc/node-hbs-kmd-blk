let request = require('request')
const headers = {
    "content-type": "text/plain;"
};



module.exports = {
    getHome: (req, res) => {
        let dataString = `{"jsonrpc": "1.0", "id":"curltest", "method": "getbalance", "params": [] }`;
        let options = {
            url: `http://user1172876576:pass434c993b4e3151cc5781fbbc461363b34ddc843531c69cb2f13802078f1f75e84c@127.0.0.1:14009/`,
            method: "POST",
            headers: headers,
            body: dataString
        };
        cb = (error, response, body) => {

            const data = JSON.parse(body);
            console.log(data);
            res.render('home', {
                data
            
            })
              
          
        };

        request(options, cb)
        
        
        // request(options, cb)
        


    },
    getBlock: (req, res) => {
        console.log('test home')
        let dataString = `{"jsonrpc": "1.0", "id":"curltest", "method": "getdifficulty", "params": [] }`;
        let options = {
            url: `http://user1172876576:pass434c993b4e3151cc5781fbbc461363b34ddc843531c69cb2f13802078f1f75e84c@127.0.0.1:14009/`,
            method: "POST",
            headers: headers,
            body: dataString
        };


        cb = (error, response, body) => {

            const data = JSON.parse(body);
            console.log(data);
            res.send(data);


        };
        request(options, cb)

    }
}