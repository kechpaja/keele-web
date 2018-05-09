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


###
# The Script Itself
###


if len(sys.argv) != 3:
    print("Requires two arguments")
    exit(1)

srcdir = sys.argv[1]
destdir = sys.argv[2]


# get items
items = getjson(srcdir + "/items.json")


# get list of lessons
lessons = getjson(srcdir + "/lessons.json")

for lesson in lessons:
    lessonData = getjson(srcdir + "/lessons/" + lesson + ".json")

    # save grammar page separately
    lessondir = "lessons/" + lesson
    os.makedirs(destdir + "/" + lessondir)
    savejson(destdir + "/"+lessondir + "/grammar.json", lessonData["grammar"])

    # Move all requested images to proper dir
    os.makedirs(destdir + "/images")
    images = os.listdir(srcdir + "/images")
    for image in images:
        shutil.copy2(srcdir + "/images/" + image, destdir + "/images")

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
    lessonPageObject = {"title" : lessonData["title"],
                        "grammar" : lessondir + "/grammar.json",
                        "waterfall" : lessondir + "/waterfall.json"}
    savejson(destdir + "/" + lessondir + "/lesson.json", lessonPageObject)


    # TODO eventually create vocab page (we need to know what it looks like)

    # TODO copy audio as well at some point?
