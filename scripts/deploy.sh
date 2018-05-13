#! /bin/bash

dest="$1" # may be remote

# XXX Slightly hacky way of getting to Keelek root dir
cd "$(dirname $(readlink -f "$0"))/../src"

# Generate icons and move them to folder
for size in `python -c "import json;f=open('manifest.json','r');print(' '.join([str(icon['sizes']) for icon in json.load(f)['icons']]));f.close()"`;
do
    convert -size "$size" icons/icon.svg "icons/icon-$size.png"
done

scp *.html "$dest"
scp -r js "$dest"
scp htaccess "$dest/.htaccess"
scp -r css "$dest"
scp -r icons "$dest"
