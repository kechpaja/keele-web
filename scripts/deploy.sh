#! /bin/bash

dest="$1" # may be remote

# XXX Slightly hacky way of getting to Keele root dir
cd "$(dirname $(readlink -f "$0"))/../src"


# TODO actually copy stuff to server

scp *.html "$dest"
scp -r js "$dest"
scp htaccess "$dest/.htaccess"

# TODO CSS, when we have it
