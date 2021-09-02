let request = require('request')
const headers = {
    "content-type": "text/plain;"
};
const { exec } = require('child_process')
require('dotenv').config()



module.exports = {
    getHome: async (req, res) => {
        let dataString = `{"jsonrpc": "1.0", "id":"getbalance", "method": "getbalance", "params": [] }`;
        let dataString2 = `{"jsonrpc": "2.0", "id":"curltest", "method": "listtransactions", "params": [] }`;
        let dataString3 = `{"jsonrpc": "2.0", "id":"curltest", "method": "getinfo", "params": [] }`;
        let dataString4 = `{"jsonrpc": "2.0", "id":"curltest", "method": "getpeerinfo", "params": [] }`;
        let dataString5 = `{"jsonrpc": "1.0", "id":"curltest", "method": "getmininginfo", "params": [] }`;

        let data1, data2, data3, data4

        let options = {
            url: `http://${process.env.RPC_USER}:${process.env.RPC_PASSWORD}@${process.env.RPC_ADDRESS}:${process.env.RPC_PORT}/`,
            method: "POST",
            headers: headers,
            body: dataString,

        };
        let options2 = {
            url: `http://${process.env.RPC_USER}:${process.env.RPC_PASSWORD}@${process.env.RPC_ADDRESS}:${process.env.RPC_PORT}/`,
            method: "POST",
            headers: headers,
            body: dataString2,

        };

        let options3 = {
            url: `http://${process.env.RPC_USER}:${process.env.RPC_PASSWORD}@${process.env.RPC_ADDRESS}:${process.env.RPC_PORT}/`,
            method: "POST",
            headers: headers,
            body: dataString3,

        };

        let options4 = {
            url: `http://${process.env.RPC_USER}:${process.env.RPC_PASSWORD}@${process.env.RPC_ADDRESS}:${process.env.RPC_PORT}/`,
            method: "POST",
            headers: headers,
            body: dataString4,

        };
        let options5 = {
            url: `http://${process.env.RPC_USER}:${process.env.RPC_PASSWORD}@${process.env.RPC_ADDRESS}:${process.env.RPC_PORT}/`,
            method: "POST",
            headers: headers,
            body: dataString5,

        };

        cb = (error, response, body) => {
            const data = JSON.parse(body);
            // console.log('fsshsrh', data, response);
            return data
        };

        // request(options, cb)
        // request(options2, cb2)

        request(options, (error, response, body) => {
            const data1 = JSON.parse(body);
            console.log('fsshsrh1', data1);
            request(options2, (error, response, body) => {
                const data2 = JSON.parse(body);
                console.log('fsshsrh2', data2);

                request(options3, (error, response, body) => {
                    const data3 = JSON.parse(body);
                    console.log('fsshsrh2', data3);

                    request(options4, (error, response, body) => {
                        const data4 = JSON.parse(body);
                        console.log('fsshsrh2', data4);

                        request(options5, (error, response, body) => {
                            const data5 = JSON.parse(body);
                            console.log('fsshsrh2', data5);


                            console.log(data1, data2);
                            res.render('home', {
                                data1,
                                data2,
                                data3,
                                data4,
                                data5

                            })
                        })
                    })
                })
            })


        })

        // data1 = request(options, (error, response, body) => {
        //     const data = JSON.parse(body);
        //     console.log('fsshsrh1', data);
        //     return data
        // })
        // data2 = request(options2, (error, response, body) => {
        //     const data = JSON.parse(body);
        //     console.log('fsshsrh2', data);
        //     return data
        // })



        // request(options, cb)

    },
    sendTX: (req, res) => {
        let dataString = `{"jsonrpc": "1.0", "id":"curltest", "method": "sendtoaddress", "params": ["${req.body.to}", ${req.body.cb}, "donation", "seans outpost"] }`
        let options = {
            url: `http://${process.env.RPC_USER}:${process.env.RPC_PASSWORD}@${process.env.RPC_ADDRESS}:${process.env.RPC_PORT}/`,
            method: "POST",
            headers: headers,
            body: dataString

        };
        cb = (error, response, body) => {

            const data = JSON.parse(body);
            console.log(data);
            res.redirect('/')


        };
        request(options, cb)

    },
    getNewAddress: (req, res) => {
        let dataString = `{"jsonrpc": "1.0", "id":"curltest", "method": "getnewaddress", "params": []}`
        let options = {
            url: `http://${process.env.RPC_USER}:${process.env.RPC_PASSWORD}@${process.env.RPC_ADDRESS}:${process.env.RPC_PORT}/`,
            method: "POST",
            headers: headers,
            body: dataString

        };
        cb = (error, response, body) => {

            const data = JSON.parse(body);
            res.redirect('/')


        };
        request(options, cb)

    },
    startMining: (req, res) => {
        let dataString = `{"jsonrpc": "1.0", "id":"curltest", "method": "setgenerate", "params": [true, 4] }`
        let options = {
            url: `http://${process.env.RPC_USER}:${process.env.RPC_PASSWORD}@${process.env.RPC_ADDRESS}:${process.env.RPC_PORT}/`,
            method: "POST",
            headers: headers,
            body: dataString

        };
        cb = (error, response, body) => {

            const data = JSON.parse(body);
            res.redirect('/')


        };
        request(options, cb)

    },
    stopMining: (req, res) => {

        let dataString = `{"jsonrpc": "1.0", "id":"curltest", "method": "setgenerate", "params": [false, 0] }`
        let options = {
            url: `http://${process.env.RPC_USER}:${process.env.RPC_PASSWORD}@${process.env.RPC_ADDRESS}:${process.env.RPC_PORT}/`,
            method: "POST",
            headers: headers,
            body: dataString

        };
        cb = (error, response, body) => {

            const data = JSON.parse(body);
            res.redirect('/')


        };
        request(options, cb)


    }
}