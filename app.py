from flask import Flask, render_template, redirect, jsonify
import threading
import tkinter as tk
import customtkinter as ctk
from PIL import ImageTk
from diffusers import StableDiffusionPipeline
import subprocess
import webbrowser
import time
import cv2
import mediapipe as mp

def start_react():
    try:
        subprocess.Popen(["npm", "run", "dev"], cwd="./shopping_app")
        time.sleep(3)  
        webbrowser.open("http://localhost:5173")  
    except Exception as e:
        print("Failed to start React app:", e)

app = Flask(__name__)

body_map_lock = threading.Lock()
body_map_running = False


# @app.route('/')
# def index():
#     return render_template('main_page.html')

# @app.route('/clothing')
# def clothing_page():
#     return render_template('clothing.html')

# @app.route('/accessories')
# def accessories_page():
#     return render_template('accessories.html')

@app.route('/run_app')
def run_app():
    threading.Thread(target=start_app).start()
    return jsonify({"status":"started"})

# @app.route('/customize')
# def customize():
#     return redirect('/run_app')

# @app.route('/body_map')
# def body_map():
#     threading.Thread(target=start_body_map).start()
#     return jsonify({"status": "started"})

@app.route('/body_map')
def body_map():
    global body_map_running

    if body_map_running:
        return jsonify({"status": "already running"})

    with body_map_lock:
        if not body_map_running:
            body_map_running = True
            threading.Thread(target=start_body_map).start()
            return jsonify({"status": "started"})
        else:
            return jsonify({"status": "already running"})


# @app.route('/clothing')
# def clothing():
#     return redirect('/body_map')

def start_app():
    print("Running app.py...")

    app = tk.Tk()
    app.geometry("532x632")
    app.title("Stable Bud") 
    ctk.set_appearance_mode("dark") 

    prompt = ctk.CTkEntry(app, height=40, width=512, font=("Arial", 20), text_color="black", fg_color="white") 
    prompt.place(x=10, y=10)

    lmain = ctk.CTkLabel(app, height=512, width=512)
    lmain.place(x=10, y=110)

    modelid = "CompVis/stable-diffusion-v1-4"
    device="cuda"
    
    # device = "cpu"  # Change to CPU
    pipe = StableDiffusionPipeline.from_pretrained(modelid)  
    pipe.to(device) 

    def generate(): 
        def generate_image_async():
            try:
                output = pipe(prompt.get(), guidance_scale=8.5)
                if "images" in output and len(output["images"]) > 0:
                    image = output["images"][0]
                    image.save('images/generatedimage.png')
                    img = ImageTk.PhotoImage(image)
                    lmain.configure(image=img)
                else:
                    print("No image found in output:", output)
            except Exception as e:
                print("Error during image generation:", e)

        threading.Thread(target=generate_image_async).start()

    trigger = ctk.CTkButton(app, height=40, width=120, text_color="white", fg_color="blue", command=generate)
    trigger.configure(text="Generate") 
    trigger.place(x=206, y=60) 

    print("App.py finished.")

    app.mainloop()

def start_body_map():
    global body_map_running

    try:
        mp_pose = mp.solutions.pose
        mp_drawing = mp.solutions.drawing_utils

        cap = cv2.VideoCapture(0)

        if not cap.isOpened():
            print("Failed to open camera")
            body_map_running = False
            return

        with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
            while cap.isOpened():
                ret, frame = cap.read()
                if not ret:
                    break

                image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                results = pose.process(image)

                image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
                if results.pose_landmarks:
                    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
                    image=overlay_shirt(image,results.pose_landmarks.landmark,mp_pose)

                cv2.imshow('Pose Estimation', image)
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
    finally:
            cap.release()
            cv2.destroyAllWindows()
            body_map_running = False

    # cap.release()
    # cv2.destroyAllWindows()

def overlay_shirt(image, landmarks, mp_pose):
    try:
        image_h,image_w,_=image.shape
        
        l_shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER]
        r_shoulder = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER]
        l_hip = landmarks[mp_pose.PoseLandmark.LEFT_HIP]
        r_hip = landmarks[mp_pose.PoseLandmark.RIGHT_HIP]
        
        x1 = int(min(l_shoulder.x, r_shoulder.x) * image_w)
        y1 = int(min(l_shoulder.y, r_shoulder.y) * image_h)
        x2 = int(max(l_hip.x, r_hip.x) * image_w)
        y2 = int(max(l_hip.y, r_hip.y) * image_h)


        shirt = cv2.imread('./1.png', cv2.IMREAD_UNCHANGED)
        if shirt is None:
            print("shirt image not found")
            return image


        shirt_resized = cv2.resize(shirt, (x2 - x1, y2 - y1))

        # Separate alpha and BGR channels
        alpha_s = shirt_resized[:, :, 3] / 255.0  
        alpha_l = 1.0 - alpha_s

        if y1 < 0 or y2 > image_h or x1 < 0 or x2 > image_w:
            return image

        for c in range(3):  # BGR channels
            image[y1:y2, x1:x2, c] = (
                alpha_s * shirt_resized[:, :, c] +
                alpha_l * image[y1:y2, x1:x2, c]
            )

    except Exception as e:
        print("Overlay error:", e)

    return image

        
if __name__ == '__main__':
    start_react()  
    app.run(debug=True)
