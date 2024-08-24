from flask import Flask, render_template, redirect
import threading
import tkinter as tk
import customtkinter as ctk
from PIL import ImageTk
from diffusers import StableDiffusionPipeline

app = Flask(__name__)

# Flask routes
@app.route('/')
def index():
    return render_template('main_page.html')

@app.route('/clothing')
def clothing_page():
    return render_template('clothing.html')

@app.route('/accessories')
def accessories_page():
    return render_template('accessories.html')

@app.route('/run_app')
def run_app():
    # Run the tkinter application in a separate thread
    threading.Thread(target=start_app).start()
    return 'App is running'

# Route for customization process
@app.route('/customize')
def customize():
    return redirect('/run_app')

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
    device = "cpu"  # Change to CPU
    auth_token = "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"  # Replace this with your actual authentication token
    pipe = StableDiffusionPipeline.from_pretrained(modelid)  # Remove use_auth_token
    pipe.to(device) 

    def generate(): 
        # Generate image asynchronously
        def generate_image_async():
            try:
                output = pipe(prompt.get(), guidance_scale=8.5)
                if "images" in output and len(output["images"]) > 0:
                    image = output["images"][0]
                    image.save('generatedimage.png')
                    img = ImageTk.PhotoImage(image)
                    lmain.configure(image=img)
                else:
                    print("No image found in output:", output)
            except Exception as e:
                print("Error during image generation:", e)

        # Run image generation in a separate thread
        threading.Thread(target=generate_image_async).start()

    trigger = ctk.CTkButton(app, height=40, width=120, text_color="white", fg_color="blue", command=generate)
    trigger.configure(text="Generate") 
    trigger.place(x=206, y=60) 

    print("App.py finished.")

    # Run the tkinter main loop
    app.mainloop()

if __name__ == '__main__':
    app.run(debug=True)
