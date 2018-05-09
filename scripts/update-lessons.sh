#! /bin/bash

src="$1" # XXX assumed to be local
dest="$2" # may be remote


# TODO verify that both args were given


here="$(dirname $(readlink -f "$0"))"

# Create temporary directory a la https://unix.stackexchange.com/a/84980
# Should work on both Linux and Mac OSX, although I haven't tested the latter
tmpdir=`mktemp -d 2>/dev/null || mktemp -d -t 'mytmpdir'`

"$here/convert-lessons.py" "$src" $tmpdir

scp -r $tmpdir/* "$dest"

rm -rf $tmpdir
