import cv2
import os
import numpy as np
import pytesseract
import rgb2gray as rgb2gray
from langdetect import detect_langs
from googletrans import Translator

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

path_to_images = r'images/'

#Point tessaract_cmd to tessaract.exe
pytesseract.tesseract_cmd = pytesseract.pytesseract.tesseract_cmd

file = open('text.txt', 'w', encoding='utf-8')

print("Choose your source language: ")

srclanguage = input()

print("Choose your destination language: ")

dectlanguage = input()

for root, dirs, file_names in os.walk(path_to_images):
    print(file_names)

    #Iterate over each file_name in the folder
    for file_name in file_names:
        # We start by using OpenCv to read the Img
        img = cv2.imread(path_to_images + file_name)
        # Here we set dimensions
        img = cv2.resize(img, None, fx=0.5, fy=0.5)
        # Since our img is not in RGB, but in BGR, we will change the color scheme from BGR to RGB
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        # Here we change the color to shades of gray
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        text = pytesseract.image_to_string(img)

        translate = Translator()
        out = translate.translate(text, src=srclanguage, dest=dectlanguage)

        file.write(out.text)

        print(translate.detect(text))
        print(out.text)
    file.close()


# The threshold function returns an image in which all pixels darker (less than) 127 are replaced by 0, and all pixels brighter (greater than) 127 are replaced by 255
adaptive_threshold = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY, 11, 11)

custom_config = r'-l kaz+eng+rus+chi+jap --psm 3'
text = pytesseract.image_to_string(adaptive_threshold, config = custom_config)

cv2.imshow("Gray", gray)
cv2.imshow("adaptive th", adaptive_threshold)
cv2.waitKey(0)