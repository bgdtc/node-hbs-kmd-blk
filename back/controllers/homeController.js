require('dotenv').config()
let request = require('request')
const headers = {
    "content-type": "text/plain;"
};
const {
    exec
} = require('child_process')




module.exports = {
    get: (req, res) => {
        res.render('home')
    },
    connect: (req, res) => {
        console.log(req.body.chooseChain)
        if (req.body.chooseChain === "BGDTC") {
            exec(`~/komodo/src/./komodo-cli -ac_name=ARINFO stop && ~/komodo/src/./komodo-cli -ac_name=TAURUX  stop `)
            exec(` ~/komodo/src/./komodod -ac_name=BGDTC -ac_supply=19052000 -addnode=192.168.1.68 &`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: `, error)
                    
                    return;
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    // return;
                   return;
                }
                 
                console.log(`stdout:\n${stdout}`);
                console.log('REDIRECTION DEPUIS BGDTC SELECT');
            })
            setTimeout(function() { res.redirect('/')},3000) 
           
            
            // res.redirect('/')
        } else if (req.body.chooseChain === "TAURUX") {

            exec(` ~/komodo/src/./komodo-cli -ac_name=ARINFO stop && ~/komodo/src/./komodo-cli -ac_name=BGDTC stop`)
            exec(` ~/komodo/src/./komodod -ac_name=TAURUX -ac_supply=100000 -addnode=192.168.1.95 &`, (error, stdout, stderr) => {
                if (error || stderr) {
                    console.log(`error: `, error)
                    console.log(`stderr: ${stderr}`);
                    return;
                } else {
                
                    console.log(`stdout:\n${stdout}`);
                }
               
            })
            setTimeout(function() { res.redirect('/')},3000) 
        } else if (req.body.chooseChain === "ARINFO") {
            if (req.body.chooseChain === "ARINFO") {
                exec(` ~/komodo/src/./komodo-cli -ac_name=BGDTC stop && ~/komodo/src/./komodo-cli -ac_name=TAURUX stop`)
                exec(` ~/komodo/src/./komodod -ac_name=ARINFO -ac_supply=100000 -addnode=192.168.1.67 &`, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: `, error)
                        return;
                    }
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        return;

                    }
               
                    console.log(`stdout:\n${stdout}`);
                })
                setTimeout(function() { res.redirect('/')},3000) 
            }
     
        }
      
    },
    getHome: async (req, res) => {

        request(`http://127.0.0.1:${process.env.RPC_PORT}`, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Pr
            if (error) {
                console.log('ERROR salope');
                request(`http://127.0.0.1:${process.env.RPC_PORT_TAURUX}`, function (error, response, body) {
                    console.error('error:', error);
                    console.log('statuscode:', response && response.statusCode);
                    console.log('body:', body)
                    if (error) {
                        console.log('ERROR PUTE')
                        request(`http://127.0.0.1:${process.env.RPC_PORT_BGDTC}`, function (error, response, body) {
                            console.error('error:', error);
                            console.log('statusCode:', response && response.statusCode);
                            console.log('body:', body);
                            if (error) {
                                console.log('AUCUNE CONNECTION ÉTABLIE');
                                res.render('home')
                            } else {

                                console.log('NO ERROR');
                                let dataString = `{"jsonrpc": "1.0", "id":"getbalance", "method": "getbalance", "params": [] }`;
                                let dataString2 = `{"jsonrpc": "2.0", "id":"curltest", "method": "listtransactions", "params": [] }`;
                                let dataString3 = `{"jsonrpc": "2.0", "id":"curltest", "method": "getinfo", "params": [] }`;
                                let dataString4 = `{"jsonrpc": "2.0", "id":"curltest", "method": "getpeerinfo", "params": [] }`;
                                let dataString5 = `{"jsonrpc": "1.0", "id":"curltest", "method": "getmininginfo", "params": [] }`;

                                let data1, data2, data3, data4

                                let options = {
                                    url: `http://${process.env.RPC_USER_BGDTC}:${process.env.RPC_PASSWORD_BGDTC}@${process.env.RPC_ADDRESS_BGDTC}:${process.env.RPC_PORT_BGDTC}/`,
                                    method: "POST",
                                    headers: headers,
                                    body: dataString,

                                };
                                let options2 = {
                                    url: `http://${process.env.RPC_USER_BGDTC}:${process.env.RPC_PASSWORD_BGDTC}@${process.env.RPC_ADDRESS_BGDTC}:${process.env.RPC_PORT_BGDTC}/`,
                                    method: "POST",
                                    headers: headers,
                                    body: dataString2,

                                };

                                let options3 = {
                                    url: `http://${process.env.RPC_USER_BGDTC}:${process.env.RPC_PASSWORD_BGDTC}@${process.env.RPC_ADDRESS_BGDTC}:${process.env.RPC_PORT_BGDTC}/`,
                                    method: "POST",
                                    headers: headers,
                                    body: dataString3,

                                };

                                let options4 = {
                                    url: `http://${process.env.RPC_USER_BGDTC}:${process.env.RPC_PASSWORD_BGDTC}@${process.env.RPC_ADDRESS_BGDTC}:${process.env.RPC_PORT_BGDTC}/`,
                                    method: "POST",
                                    headers: headers,
                                    body: dataString4,

                                };
                                let options5 = {
                                    url: `http://${process.env.RPC_USER_BGDTC}:${process.env.RPC_PASSWORD_BGDTC}@${process.env.RPC_ADDRESS_BGDTC}:${process.env.RPC_PORT_BGDTC}/`,
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

                                    request(options2, (error, response, body) => {
                                        const data2 = JSON.parse(body);


                                        request(options3, (error, response, body) => {
                                            const data3 = JSON.parse(body);


                                            request(options4, (error, response, body) => {
                                                const data4 = JSON.parse(body);


                                                request(options5, (error, response, body) => {
                                                    const data5 = JSON.parse(body);



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

                            }
                        })
                    } else {

                        console.log('NO ERROR');
                        let dataString = `{"jsonrpc": "1.0", "id":"getbalance", "method": "getbalance", "params": [] }`;
                        let dataString2 = `{"jsonrpc": "2.0", "id":"curltest", "method": "listtransactions", "params": [] }`;
                        let dataString3 = `{"jsonrpc": "2.0", "id":"curltest", "method": "getinfo", "params": [] }`;
                        let dataString4 = `{"jsonrpc": "2.0", "id":"curltest", "method": "getpeerinfo", "params": [] }`;
                        let dataString5 = `{"jsonrpc": "1.0", "id":"curltest", "method": "getmininginfo", "params": [] }`;

                        let data1, data2, data3, data4

                        let options = {
                            url: `http://${process.env.RPC_USER_TAURUX}:${process.env.RPC_PASSWORD_TAURUX}@${process.env.RPC_ADDRESS_TAURUX}:${process.env.RPC_PORT_TAURUX}/`,
                            method: "POST",
                            headers: headers,
                            body: dataString,

                        };
                        let options2 = {
                            url: `http://${process.env.RPC_USER_TAURUX}:${process.env.RPC_PASSWORD_TAURUX}@${process.env.RPC_ADDRESS_TAURUX}:${process.env.RPC_PORT_TAURUX}/`,
                            method: "POST",
                            headers: headers,
                            body: dataString2,

                        };

                        let options3 = {
                            url: `http://${process.env.RPC_USER_TAURUX}:${process.env.RPC_PASSWORD_TAURUX}@${process.env.RPC_ADDRESS_TAURUX}:${process.env.RPC_PORT_TAURUX}/`,
                            method: "POST",
                            headers: headers,
                            body: dataString3,

                        };

                        let options4 = {
                            url: `http://${process.env.RPC_USER_TAURUX}:${process.env.RPC_PASSWORD_TAURUX}@${process.env.RPC_ADDRESS_TAURUX}:${process.env.RPC_PORT_TAURUX}/`,
                            method: "POST",
                            headers: headers,
                            body: dataString4,

                        };
                        let options5 = {
                            url: `http://${process.env.RPC_USER_TAURUX}:${process.env.RPC_PASSWORD_TAURUX}@${process.env.RPC_ADDRESS_TAURUX}:${process.env.RPC_PORT_TAURUX}/`,
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


                    }
                })
            } else {
                console.log('NO ERROR');
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
            }

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