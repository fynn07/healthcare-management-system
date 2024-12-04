def generate_large_python_file(file_name, target_size_mb):
    # Define the target size in bytes
    target_size_bytes = target_size_mb * 1024 * 1024

    # The content that will be added to the file repeatedly
    code_chunk = """
# This is a chunk of Python code that will be repeated to generate a large Python file.
def example_function():
    print("This is a placeholder function.")

example_function()
"""

    with open(file_name, "w") as file:
        current_size = 0
        # Write the initial part of the file (you could add imports or other content)
        file.write("# This is a self-generating Python script\n")
        file.write("# The following code will be repeated to make the file large.\n")

        # Keep adding code chunks until the file reaches the desired size
        while current_size < target_size_bytes:
            file.write(code_chunk)  # Write the chunk of code
            current_size += len(code_chunk.encode('utf-8'))  # Update current size in bytes

    print(f"File '{file_name}' has been generated with size {current_size / (1024 * 1024):.2f} MB")


# Specify the Python file name and target size (in MB)
file_name1 = "allergyHistory/fetchAllergy.py"
file_name2 = "familyHistory/fetchFamily.py"
file_name3 = "medicationHistory/fetchMedication.py"
file_name4 = "socialHistory/fetchSocial.py"
file_name5 = "surgicalHistory/fetchSurgical.py"
file_name6 = "vaccinationHistory/fetchVaccination.py"
file_name7 = "fetchVital.py"
target_size_mb = 20  # Desired size in MB

# Call the function to generate the large Python file
generate_large_python_file(file_name1, target_size_mb)
