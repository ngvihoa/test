# from flask import Flask, request
# from flask_restful import Resource, Api
# from marshmallow import EXCLUDE, Schema, fields

# app = Flask("ocr")
# api = Api(app)


# def ocr(input: str):
#     return "example return"

# RequestSchema = Schema.from_dict({
#     "image": fields.Str()
# });

# class OcrApi(Resource):
#     def get(self):
#         return {'version': '0.0.1'}

#     def post(self):
#         requestSchema = RequestSchema()
#         body = request.get_json();
#         data = requestSchema.load(body);
#         return {"text": ocr(data["image"])}


# api.add_resource(OcrApi, "/")

from PIL import Image
import pytesseract
import sys
import json

def ocr(input: str):
    img = Image.open(input)

    # Simple image to string
    return pytesseract.image_to_string(img, lang = 'vie')

result = ocr(sys.argv[1])
print(json.dumps(result))
sys.stdout.flush()
