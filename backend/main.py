

from fastapi import FastAPI, File, UploadFile, HTTPException
from PIL import Image
import os
from dotenv import load_dotenv
import json
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load environment variables
load_dotenv()

# Configure API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Select Gemini Model
model = genai.GenerativeModel("gemini-1.5-flash")

@app.post("/extract-data/")
async def extract_data(image_file: UploadFile = File(...)):
    temp_file_path = None
    try:
        # Save the uploaded image to a temporary file
        temp_file_path = f"temp_{image_file.filename}"
        with open(temp_file_path, "wb") as buffer:
            buffer.write(await image_file.read())

        # Process the image and ensure it's properly closed
        with Image.open(temp_file_path) as img:
            # Convert to RGB if needed (Gemini might have issues with some formats)
            if img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Define prompt for data extraction

            prompt = """
                Generate a detailed JSON response for a food product with the following structure. Ensure all fields are populated with realistic values, using "Not Specified" where data is unavailable. Maintain consistent field naming and units as shown in the examples.

                Structure:
                {
                    "Product Name": "[Product Name]",
                    "Ingredients": {
                        "main": ["list of main ingredients"],
                        "additives": ["list of additives/preservatives"] (optional)
                    },
                    "Nutritional Facts": {
                        "per_100g": {
                            "energy" or "energy_kcal": [number],
                            "protein" or "protein_g": [number],
                            "carbohydrate" or "carbohydrate_g": [number],
                            "total_sugars" or "total_sugars_g": [number],
                            "total_fat" or "total_fat_g": [number],
                            "saturated_fat" or "saturated_fat_g": [number],
                            "sodium" or "sodium_mg": [number],
                            "cholesterol" or "cholesterol_mg": [number or string],
                            "vitamins": {object with details} or "Not Specified",
                            "minerals": {object with details} or "Not Specified"
                        },
                        "per_serving": {
                            (same structure as per_100g)
                        }
                    },
                    "Serving Information": {
                        "serving_size": "[amount with unit]",
                        "servings_per_pack": [number or string]
                    },
                    "Health Analysis": {
                        "nutrient_exceedances": {
                            "saturated_fat": "Yes/No",
                            "sodium": "Yes/No"
                        },
                        "summary": "[2-3 sentence health assessment mentioning key nutrients and considerations]"
                    }
                }

                Additional Requirements:
                1. Use consistent naming (either snake_case or spaces, but don't mix)
                2. Maintain the same level of detail as the examples provided
                3. Include realistic values for the product type
                4. For vitamins/minerals, either provide specific values or "Not Specified"
                5. Health analysis should be based on the nutritional data
                6. Use either per_100g/per_serving OR per 100g/per serving format consistently
                7. For cholesterol, use numbers or "<0.10" format when relevant

                Generate this for a [insert product type/category here] product.
                """





            
            response = model.generate_content([img, prompt])

        # Process the response
        response_text = response.text
        start_str = "```json"
        end_str = "```"
        
        if start_str in response_text:
            start = response_text.find(start_str) + len(start_str)
            end = response_text.find(end_str, start)
            json_content = response_text[start:end].strip()
        else:
            # If no code block markers, try to parse the whole response
            json_content = response_text.strip()

        try:
            result = json.loads(json_content)
            return result
        except json.JSONDecodeError as e:
            return {
                "error": "Failed to parse JSON response",
                "raw_response": response_text,
                "exception": str(e)
            }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        # Clean up the temporary file if it exists
        if temp_file_path and os.path.exists(temp_file_path):
            try:
                os.remove(temp_file_path)
            except Exception as cleanup_error:
                print(f"Cleanup failed: {cleanup_error}")