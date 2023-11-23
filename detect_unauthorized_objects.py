import cv2
import json
import numpy as np

with open('./models/object_detection_classes_coco.txt', 'r') as f:
    class_names = f.read().split('\n')

COLORS = np.random.uniform(0, 255, size=(len(class_names), 3))

model = cv2.dnn.readNet(model='./models/frozen_inference_graph.pb',
                        config='./models/ssd_mobilenet_v2_coco_2018_03_29.pbtxt.txt',
                        framework='TensorFlow')

image = cv2.imread('./image_2.jpg')

image_height, image_width, _ = image.shape

blob = cv2.dnn.blobFromImage(image=image, size=(300, 300), mean=(104, 117, 123),
                             swapRB=True)
model.setInput(blob)
output = model.forward()

detected_objects_dict = {}

for detection in output[0, 0, :, :]:
    confidence = detection[2]

    # draw bounding boxes only if the detection confidence is above...
    # ... a certain threshold, else skip
    if confidence > 0.6:
    # get the class id
      class_id = detection[1]
      # map the class id to the class
      class_name = class_names[int(class_id)-1]

      if class_name in detected_objects_dict.keys():
         detected_objects_dict[class_name] += 1

      else:
         detected_objects_dict[class_name] = 1


print("-----------------------------")

detected_objects = detected_objects_dict.keys()
violations_dict = { "unauthorized_objects": [] }

for unauthorized_object in ['cell phone', 'laptop']:
   if unauthorized_object in detected_objects:
      violations_dict["unauthorized_objects"].append(unauthorized_object)

if "person" in detected_objects:
    if detected_objects_dict["person"] > 1:
        violations_dict["person_count"] = "multiple persons were detected"

else:
   violations_dict["person_count"] = "no persons were detected"

violations_response = json.dumps(violations_dict)
print(violations_response)
