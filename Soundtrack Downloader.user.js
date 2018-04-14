// ==UserScript==
// @name         Soundtrack Downloader
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://downloads.khinsider.com/*
// @require      http://code.jquery.com/jquery-3.3.1.min.js

// @grant        GM_download
// ==/UserScript==

$(document).ready(function () {
    console.log("ready!");
    $('#songlist').prepend('<input type="button" value="Download all!" id="downloadall">');
    $('#downloadall').click(function () {
        var albumname = $("h2:first").text();
        var baseurl = 'https://downloads.khinsider.com/';
        var rows = $('#songlist').find('tr');
        $.each(rows, function (key, value) {
            var $idown;
            var url = $(value).find('a').attr('href');
            if (url != undefined) {
                $.get(baseurl + url, function (data) {
                    var reallink = $(data).find('audio').attr('src');
                    var fname = decodeURI(reallink).substring(decodeURI(reallink).lastIndexOf('/') + 1);
                    console.log("real link :" + reallink);
                    console.log("file name :" + decodeURI(fname));
                    GM_download(reallink, fname);
                });
            }
        });
    });
});