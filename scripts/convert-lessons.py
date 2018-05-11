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


# Load JSON file
def getjson(filename):
    with open(filename, "r") as f:
        data = json.load(f)
    return data


# Save JSON file
def savejson(filename, obj):
    with open(filename, "w") as f:
        json.dump(obj, f)


def convertitem(item):
    newitem = {}
    for k in item:
        newitem[k] = item[k]
    newitem["images"] = ["images/" + img for img in item["images"]]
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
os.makedirs(destdir + "/images")
images = os.listdir(srcdir + "/images")
for image in images:
    shutil.copy2(srcdir + "/images/" + image, destdir + "/images")

# TODO create index of languages

for lang in os.listdir(srcdir):
    if lang == "images": # images are not a lesson pack
        continue

    langsrcdir = srcdir + "/" + lang + "/"

    # get items
    items = getjson(langsrcdir + "items.json")

    # Copy index of lessons
    #os.makedirs(destdir + "/" + lang)
    #shutil.copy2(langsrcdir + "index.json", destdir + "/" + lang)

    # get list of lessons
    index = getjson(langsrcdir + "index.json")

    # Start creating new index
    newindex = {"title" : index["title"], "lessons" : []}
    
    for lesson in index["lessons"]:
        lessonData = getjson(langsrcdir + "lessons/" + lesson + ".json")

        # Get title for index
        newindex["lessons"].append({"id":lesson, "title":lessonData["title"]})

        # save grammar page separately
        lessondir = lang + "/lessons/" + lesson
        os.makedirs(destdir + "/" + lessondir)
        savejson(destdir+"/"+lessondir+"/grammar.json",lessonData["grammar"])

        # create waterfall data object
        temp = {}
        for item in lessonData["items"]:
            for image in items[item]["images"]:
                if image in temp:
                    temp[image].append(items[item]["item"])
                else:
                    temp[image] = [items[item]["item"]]
        waterfalldata = []
        for image in temp:
            waterfalldata.append({"image" : "images/" + image, 
                                  "answers" : temp[image]})
        savejson(destdir + "/" + lessondir + "/waterfall.json", waterfalldata)

        # create lesson page object and save
        grammar = ["grammar"] if "grammar" in lessonData else []
        # TODO as we get more activities, make sure we accurately determine
        # TODO which ones are actually supported
        # TODO consider just having the person writing the lesson specify
        lessonPageObject = {
            "title" : lessonData["title"],
            "items" : [convertitem(items[i]) for i in lessonData["items"]],
            "activities" : grammar + ["waterfall", "vocab"]
        }
        savejson(destdir + "/" + lessondir + "/lesson.json", lessonPageObject)


        # TODO eventually create vocab page (we need to know what it looks like)

        # TODO copy audio as well at some point?

    # Save new index
    savejson(destdir + "/" + lang + "/index.json", newindex)
