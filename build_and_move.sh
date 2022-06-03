#!/bin/bash

npm run build

export MAIN_CSS=`basename $(ls build/static/css/main*.css)`
export MAIN_JS=`basename $(ls build/static/js/main.*.js)`


cat << EOF | envsubst > zite/core/templates/core/app.html
{% load static %}
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Sharing is Caring is online donation platform." />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;1,400;1,500&display=swap"
            rel="stylesheet">
        <title>Sharing is Caring</title>
        <script defer="defer" src="{% static 'core/$MAIN_JS' %}"></script>
        <link href="{% static 'core/$MAIN_CSS' %}" rel="stylesheet">
    </head>
    <body><noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
    </body>
</html>
EOF

cp 