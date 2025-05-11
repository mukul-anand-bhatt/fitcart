# # from fastapi import FastAPI, UploadFile, File, HTTPException
# # from fastapi.middleware.cors import CORSMiddleware
# # from pydantic import BaseModel
# # import google.generativeai as genai
# # from typing import Optional, List, Dict
# # import os
# # import logging

# # # Configure logging
# # logging.basicConfig(level=logging.INFO)
# # logger = logging.getLogger(__name__)

# # # Initialize FastAPI app
# # app = FastAPI(
# #     title="Food Product Information Extractor",
# #     description="Extract nutritional information from food packaging images using Gemini API",
# #     version="1.0.0"
# # )

# # # CORS configuration
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"],
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )

# # # Configure Gemini
# # GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")  # Replace with your actual key or use environment variable
# # genai.configure(api_key=GEMINI_API_KEY)
# # model = genai.GenerativeModel('gemini-1.5-flash')

# # # Pydantic models for response validation
# # class Ingredient(BaseModel):
# #     name: str
# #     percentage: Optional[str] = "Not Specified"

# # class NutritionalFact(BaseModel):
# #     name: str
# #     per_100g: Optional[str] = "Not Specified"
# #     per_serving: Optional[str] = "Not Specified"

# # class ServingInformation(BaseModel):
# #     size: Optional[str] = "Not Specified"
# #     per_pack: Optional[str] = "Not Specified"

# # class HealthAnalysis(BaseModel):
# #     excessive_nutrients: List[str]
# #     max_daily_consumption: Dict[str, str]
# #     summary: str

# # class ExtractionResponse(BaseModel):
# #     ingredients: List[Ingredient]
# #     nutritional_facts: List[NutritionalFact]
# #     serving_information: ServingInformation
# #     health_analysis: HealthAnalysis

# # # Prompt template
# # PROMPT_TEMPLATE = """
# # Analyze this food product packaging image and extract the following information in JSON format:

# # {
# #     "ingredients": [
# #         {"name": "ingredient1", "percentage": "X%"},
# #         {"name": "ingredient2", "percentage": "Y%"},
# #         ...
# #     ],
# #     "nutritional_facts": [
# #         {"name": "Calories", "per_100g": "X", "per_serving": "Y"},
# #         {"name": "Fat", "per_100g": "X", "per_serving": "Y"},
# #         {"name": "Saturated Fat", "per_100g": "X", "per_serving": "Y"},
# #         {"name": "Trans Fat", "per_100g": "X", "per_serving": "Y"},
# #         {"name": "Carbohydrates", "per_100g": "X", "per_serving": "Y"},
# #         {"name": "Sugars", "per_100g": "X", "per_serving": "Y"},
# #         {"name": "Fiber", "per_100g": "X", "per_serving": "Y"},
# #         {"name": "Protein", "per_100g": "X", "per_serving": "Y"},
# #         {"name": "Sodium", "per_100g": "X", "per_serving": "Y"},
# #         {"name": "Cholesterol", "per_100g": "X", "per_serving": "Y"},
# #         {"name": "Vitamins", "per_100g": "X", "per_serving": "Y"},
# #         {"name": "Minerals", "per_100g": "X", "per_serving": "Y"}
# #     ],
# #     "serving_information": {
# #         "size": "Xg/ml",
# #         "per_pack": "Y"
# #     },
# #     "health_analysis": {
# #         "excessive_nutrients": ["nutrient1", "nutrient2"],
# #         "max_daily_consumption": {
# #             "based_on_calories": "X servings",
# #             "based_on_sugar": "Y servings",
# #             "based_on_sodium": "Z servings",
# #             "based_on_fats": "W servings"
# #         },
# #         "summary": "Brief analysis of safe consumption limits"
# #     }
# # }

# # Rules:
# # 1. If any data is missing, use "Not Specified"
# # 2. For health analysis, compare against standard FDA/WHO guidelines
# # 3. Return only the JSON, no additional text or markdown
# # """

# # @app.post("/extract", response_model=ExtractionResponse)
# # async def extract_food_info(file: UploadFile = File(...)):
# #     """
# #     Extract nutritional information from food packaging image.
    
# #     Upload an image of the back cover of a packed food product to get:
# #     - Ingredients list with percentages
# #     - Nutritional facts per 100g and per serving
# #     - Serving information
# #     - Health analysis based on dietary guidelines
# #     """
# #     try:
# #         # Check if the file is an image
# #         if not file.content_type.startswith("image/"):
# #             raise HTTPException(status_code=400, detail="File must be an image")
        
# #         logger.info(f"Processing file: {file.filename}")
        
# #         # Read the image file
# #         image_data = await file.read()
        
# #         # Generate content with Gemini
# #         response = model.generate_content([PROMPT_TEMPLATE, image_data])
        
# #         # Extract JSON from response
# #         try:
# #             # The response might have markdown code blocks, so we need to extract the JSON
# #             response_text = response.text
# #             print(response_text)
# #             # if '```json' in response_text:
# #             #     json_str = response_text.split('```json')[1].split('```')[0].strip()
# #             # elif '```' in response_text:
# #             #     json_str = response_text.split('```')[1].split('```')[0].strip()
# #             # else:
# #             #     json_str = response_text
            
# #             # Validate and return the response
# #             # return ExtractionResponse.parse_raw(json_str)
# #             return response_text
            
# #         except Exception as e:
# #             logger.error(f"Error parsing Gemini response: {str(e)}")
# #             logger.error(f"Response content: {response_text}")
# #             raise HTTPException(status_code=422, detail=f"Failed to parse response from Gemini: {str(e)}")
    
# #     except Exception as e:
# #         logger.error(f"Error processing request: {str(e)}")
# #         raise HTTPException(status_code=500, detail=str(e))

# # if __name__ == "__main__":
# #     import uvicorn
# #     uvicorn.run(app, host="0.0.0.0", port=8000)



# from fastapi import FastAPI, File, UploadFile, HTTPException
# from PIL import Image
# import os
# from dotenv import load_dotenv
# import json
# import google.generativeai as genai

# app = FastAPI()

# # Load environment variables
# load_dotenv()

# # Configure API key
# genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# # Select Gemini Model
# model = genai.GenerativeModel("gemini-1.5-flash")


# # @app.post("/extract-data/")
# # async def extract_data(image_file: UploadFile = File(...)):
# #     try:
# #         # Save the uploaded image locally
# #         with open(image_file.filename, "wb") as buffer:
# #             buffer.write(image_file.file.read())

# #         # Properly open and close the image
# #         with Image.open(image_file.filename) as image:
# #             # Define prompt
# #             prompt = """Extract the following information from the image and return it as a well-structured JSON:  

# #         1. **Ingredients:**  
# #            - List all ingredients along with their percentages.  

# #         2. **Nutritional Facts:**  
# #            - Per 100g  
# #            - Per serving  
# #            - Include: calories, fats (saturated, trans, unsaturated), carbohydrates (sugars, fiber), protein, sodium, cholesterol, vitamins, and minerals.  

# #         3. **Serving Information:**  
# #            - Serving size  
# #            - Servings per pack  

# #         4. **Health Analysis:**  
# #            - Identify which nutrients exceed daily human dietary recommendations (based on standard guidelines like FDA/WHO).  
# #            - Calculate the maximum recommended daily consumption of this product based on:  
# #              - Total calories  
# #              - Sugar content  
# #              - Sodium levels  
# #              - Saturated/trans fats  
# #            - Provide a brief summary of how much a person can safely consume per day without exceeding healthy limits.  

# #         Ensure the JSON keys are properly structured and human-readable. If any data is missing or unclear, note it as "Not Specified".
# #         """

# #             # Generate response
# #             response = model.generate_content([image, prompt])

# #         # Print the raw response
# #         print("Raw Response:", response.json)

# #         # Try parsing JSON
# #         # try:
# #         #     extracted_data = json.loads(response.text)
# #         #     return extracted_data
# #         # except json.JSONDecodeError:
# #         #     return {"error": "Failed to parse JSON response", "raw_response": response.text}

# #     except Exception as e:
# #         raise HTTPException(status_code=500, detail=str(e))

# #     finally:
# #         # Safely remove the file
# #         if os.path.exists(image_file.filename):
# #             try:
# #                 os.remove(image_file.filename)
# #             except Exception as cleanup_error:
# #                 print(f"Cleanup failed: {cleanup_error}")

# from fastapi.middleware.cors import CORSMiddleware

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # For development only
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
# # Define FastAPI endpoint
# @app.post("/extract-data/")
# async def extract_data(image_file: UploadFile = File(...)):
#     try:
#         # Save the uploaded image locally
#         with open(image_file.filename, "wb") as buffer:
#             buffer.write(image_file.file.read())

#         # Load the saved image
#         image = Image.open(image_file.filename)
#         os.remove(image_file.filename)

#         # Define prompt for data extraction
#         prompt = """
#         Extract the following information from the image and return it as a well-structured JSON:  

#         1. **Ingredients:**  
#            - List all ingredients along with their percentages.  

#         2. **Nutritional Facts:**  
#            - Per 100g  
#            - Per serving  
#            - Include: calories, fats (saturated, trans, unsaturated), carbohydrates (sugars, fiber), protein, sodium, cholesterol, vitamins, and minerals.  

#         3. **Serving Information:**  
#            - Serving size  
#            - Servings per pack  

#         4. **Health Analysis:**  
#            - Identify which nutrients exceed daily human dietary recommendations (based on standard guidelines like FDA/WHO).  
#            - Calculate the maximum recommended daily consumption of this product based on:  
#              - Total calories  
#              - Sugar content  
#              - Sodium levels  
#              - Saturated/trans fats  
#            - Provide a brief summary of how much a person can safely consume per day without exceeding healthy limits.  

#         Ensure the JSON keys are properly structured and human-readable. If any data is missing or unclear, note it as "Not Specified".  
#         """

#         # Generate response from AI model
#         response = model.generate_content([image, prompt])

#         # Print the raw response for debugging
#         # print("Raw Response:", response.text)
#         start_str = "```json"
#         end_str = "```"
#         start = response.text.find(start_str)+len(start_str)
#         end = response.text.find(end_str, start)
#         result = json.loads(response.text[start:end])
#         print(result)
#         return result

#         # # Try parsing JSON
#         # try:
#         #     extracted_data = json.loads(response.text)
#         #     return extracted_data
#         # except json.JSONDecodeError as e:
#         #     return { "raw_response": response.json}

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
    
#     # finally:
#     #     # Safely remove the file
#     #     if os.path.exists(image_file.filename):
#     #         try:
#     #             os.remove(image_file.filename)
#     #         except Exception as cleanup_error:
#     #             print(f"Cleanup failed: {cleanup_error}")


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





            # prompt = """
            # Extract the following information from the image and return it as a well-structured JSON:

            # 1. **Product Name:**  
            # - The name of the product being scanned.

            # 2. **Ingredients:**  
            # - List of ingredients present in the product. Each ingredient should include its name and, if available, its percentage composition.

            # 3. **Allergens:**  
            # - List of allergens present in the product if specified on the packaging.

            # 4. **Nutritional Facts (per 100g):**  
            # - Include the following nutritional components:
            #     - Energy (in kcal)
            #     - Protein (in grams)
            #     - Carbohydrates (total and sugars, in grams)
            #     - Total fat (in grams)
            #     - Saturated fat (in grams)
            #     - Trans fat (in grams, specify if "<0.01" or similar)
            #     - Cholesterol (in mg, specify if "<0.01" or similar)
            #     - Sodium (in mg)
            #     - Dietary fiber (in grams, specify if "Not Specified")
            #     - Vitamins (if available, specify if "Not Specified")
            #     - Minerals (if available, specify if "Not Specified")

            # Ensure the JSON keys are consistent and human-readable. If any data point is missing or unclear based on the image, mark it as "Not Specified".

            # """
            
            # 3. **Serving Information:**  
            #    - Serving size  
            #    - Servings per pack  

            # 4. **Health Analysis:**  
            #    - Identify which nutrients exceed daily human dietary recommendations (based on standard guidelines like FDA/WHO).  
            #    - Calculate the maximum recommended daily consumption of this product based on:  
            #      - Total calories  
            #      - Sugar content  
            #      - Sodium levels  
            #      - Saturated/trans fats  
            #    - Provide a brief summary of how much a person can safely consume per day without exceeding healthy limits.  


            # # Generate response from AI model
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