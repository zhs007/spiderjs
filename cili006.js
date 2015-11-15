/**
 * Created by zhs007 on 15/11/15.
 */

var http = require('http');
//var libxmljs = require("libxmljs");
var jsdom = require("jsdom");
var fs = require("fs");

var jquery = fs.readFileSync("./jquery.js", "utf-8");
var jsxpath = fs.readFileSync("./javascript-xpath.js", "utf-8");

//var postData = querystring.stringify({
//    'msg' : 'Hello World!'
//});

var options = {
    hostname: 'cili007.com',
    port: 80,
    path: '/',
    method: 'GET',
    headers: {
        //'Content-Type': 'application/x-www-form-urlencoded',
        //'Content-Length': postData.length
    }
};

var htmlbuf = '';

var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        htmlbuf += chunk;
        console.log('BODY: ' + chunk);
    });
    res.on('end', function() {
        console.log('No more data in response.');

        jsdom.env(htmlbuf, [jquery, jsxpath], function (err, window) {
            var res = window.document.evaluate('/html/body/div[@class="middle-box"]', window.document, null, window.XPathResult.ANY_TYPE, null);
            //var obj = window.$("/html/body/div[@class=\"middle-box\"]");
            //console.log("contents of a.the-link:", window.$('/html/body/div[@class="middle-box"]').text());

            console.log('No more data in response.');
        });
        //var dom = libxmljs.parseHtmlString(htmlbuf, {encoding: 'utf-8', recover: true});
        //var mbox = dom.get('/html/body/div[@class="middle-box"]');

        console.log('No more data in response.');
    })
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

// write data to request body
//req.write(postData);
req.end();