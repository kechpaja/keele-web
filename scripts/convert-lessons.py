#! /usr/bin/env python3

###
# Lessons are generally created in a format designed to minimize storage 
# space and developer effort, whereas lesson files as deployed to the server
# will be optimized for minimal request processing time. This script handles
# converting between the two formats.
###


import json
import os
import shutil
import sys


def getjson(filename):
    with open(filename, "r") as f:
        data = json.load(f)
    return data

def savejson(filename, obj):
    with open(filename, "w") as f:
        json.dump(obj, f)

def convertitem(item):
    newitem = {}
    for k in item:
        newitem[k] = item[k]
    newitem["images"] = ["images/" + img for img in item["images"]]
    # TODO probably have to do the same for audio eventually
    return newitem


###
# The Script Itself
###
if len(sys.argv) != 3:
    print("Requires two arguments")
    exit(1)

srcdir = sys.argv[1]
destdir = sys.argv[2]


# Move images
# TODO move audio here too eventually
os.makedirs(destdir + "/images")
images = os.listdir(srcdir + "/images")
for image in images:
    shutil.copy2(srcdir + "/images/" + image, destdir + "/images")

# create index of languages
courseindex = []

for lang in os.listdir(srcdir):
    if lang == "images": # images are not a lesson pack
        continue

    langsrcdir = srcdir + "/" + lang + "/"

    index = getjson(langsrcdir + "index.json")
    courseindex.append({"id" : lang, "title" : index["title"]})

    # Start creating new index
    newindex = {"title" : index["title"], "course" : lang, "lessons" : []}
   
    lessonsDir = destdir + "/" + lang + "/lessons"
    os.makedirs(lessonsDir)
    for lesson in index["lessons"]:
        lessonData = getjson(langsrcdir + "lessons/" + lesson + ".json")
        newindex["lessons"].append({"id":lesson, "title":lessonData["title"]})
        savejson(lessonsDir + "/" + lesson + ".json", {
            "title" : lessonData["title"],
            "items" : [convertitem(item) for item in lessonData["items"]],
            "grammar" : lessonData["grammar"],
            "course" : lang,
            "lesson" : lesson
        })

    savejson(destdir + "/" + lang + "/index.json", newindex)

savejson(destdir + "/index.json", courseindex)
