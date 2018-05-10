#! /bin/bash

dest="$1" # may be remote

# XXX Slightly hacky way of getting to Keele root dir
cd "$(dirname $(readlink -f "$0"))/../src"

scp *.html "$dest"
scp -r js "$dest"
scp htaccess "$dest/.htaccess"
scp -r css "$dest"
