# 🌐 **theHealthBook**  
**A Comprehensive Digital Healthcare Identification Management System**  

*Empowering healthcare with digital innovation.*  

Seamlessly manage medical records and healthcare identification using a powerful digital platform designed for patients, healthcare providers, and hospital administrators. **theHealthBook** is engineered to improve accessibility, enhance efficiency, and ensure security in managing healthcare documentation.  

---

## 📖 Table of Contents  

1. [📋 Project Overview](#-project-overview)  
2. [✨ Core Features](#-core-features)  
3. [🛠️ Technology Stack](#-technology-stack)  
4. [🖼️ Site Previews](#-site-previews)  

5. [👥 Team Members](-#team-members)  
6. [📚 Additional Resources](-#additional-resources)  
7. [🚀 How to Run the Project](#-how-to-run-the-project)  
8. [📜 License](-#license)  

---

## 📋 Project Overview  

This project, developed as the **capstone** for **CSIT327 Information Management 2** at the *Cebu Institute of Technology - University*, is a cutting-edge solution for **streamlining healthcare management**.  

### **Goals**:  
1. **Revolutionize healthcare services** with digital solutions.  
2. Provide **secure, centralized management** of medical records.  
3. Enable **healthcare providers to access critical patient data quickly**.  

Key functionalities include:  
- **Digital IDs** for each patient.  
- **Centralized storage** for medical records and profiles.  
- **Intelligent Patient Search** for enhanced efficiency.  
- **Generate QR** for ease of share.  
- **Print Patient PDF** for exporting patient's medical records into a PDF Format.  
---

## ✨ Core Features  

- **🔒 Secure User Authentication**  
  - Role-based access for patients, healthcare providers, and administrators.  
  - Password encryption and secure session management.  

- **📄 Export Medical Records to PDF**  
  - Patients can easily **export their medical records** into a **PDF format**.  
  - The PDF feature includes a detailed summary of all the records inside **theHealthBook.**
  - Ensures patient data is formatted professionally for printing or sharing.  

- **🆔 Unique Digital Identification**  
  - Each patient is assigned a unique ID for streamlined tracking.  

- **📑 Comprehensive Medical Record Management**  
  - Stores patient information such as allergies, medications, and diagnoses.  
  - Enables doctors to update and retrieve records in real time.  

- **🔍 Advanced Search Feature**  
  - Quickly search for patients by name.  
  - Improved user interface for seamless navigation.  

- **📱 QR Code Integration**  
  - Generate QR codes for each patient to facilitate secure data sharing.  
  - QR scanning enables instant record retrieval.  

- **🌐 Responsive Design**  
  - Optimized for use across devices (desktop, tablet, mobile).  

---

## 🛠️ Technology Stack  

| **Category**        | **Technology**              |  
|----------------------|-----------------------------|  
| **Frontend**         | ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black) |  
| **Backend**          | ![Django](https://img.shields.io/badge/-Django-092E20?logo=django&logoColor=white) |  
| **Database**         | ![SQLite](https://img.shields.io/badge/-SQLite-003B57?logo=sqlite&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?logo=postgresql&logoColor=white) |  
| **Authentication**   | Django's built-in user authentication |  
| **Version Control**  | ![Git](https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white) |  

---

## 🖼️ Site Previews  

### Landing Page  
![Landing Page](https://github.com/user-attachments/assets/5c49c0e1-f767-4a92-855d-874f0ac3c480)  

### Navigation Inside the Site  
![Site Navigation](https://github.com/user-attachments/assets/6c7e4097-25b7-4533-8369-c23e22f2a6b6)  

### Patient Navigation and Search  
![Patient Search](https://github.com/user-attachments/assets/cf8ff161-bf5e-4b1a-b161-628a16ca40e3)  

### Adding a Medical Record  
![Adding Medical Record](https://github.com/user-attachments/assets/dc3450f6-8a19-4aad-895c-a22f710cb4b9)  

### Generate QR Feature  
![Generate QR](https://github.com/user-attachments/assets/ee3a2dc0-1de1-49a4-b00c-f81c3d09cd61)  

---


## 👥 Team Members  

- **👩‍💻 [Ashley Ken Comandao](https://github.com/CodexPremiera)**  
- **👨‍💻 [Fynn Nino Borja](https://github.com/fynn07)**  
- **👨‍💻 [Karl Christian Ajero](https://github.com/ZenXen7)**  

## 📚 Additional Resources  

- 📊 [**Entity Relationship Diagram (ERD)**](https://link_to_erd)  
- 🎨 [**Figma Prototype Design**](https://link_to_prototype)  
- 📅 [**Gantt Chart**](https://link_to_gantt_chart)  

---




## 🚀 How to Run the Project  

Follow these steps to set up and run the project locally:  

1. **Clone the Repository**  
   ```bash  
   git clone https://github.com/fynn07/healthcare-management-system  
   cd theHealthBook 

2. **Set Up a Virtual Environment**
   ```bash  
   python -m venv env  
   source env/bin/activate  # For Linux/Mac  
   .\env\Scripts\Activate.ps1  # For Windows PowerShell 
  
3. **Install Dependencies**
      ```bash 
      pip install -r requirements.txt 

4. **Apply Migrations**
    ```bash 
    python manage.py makemigrations  
    python manage.py migrate  

5. **Run the Development Server**
    ```bash 
    python manage.py runserver  


## 📜 License  

This project is open-source and licensed under the **MIT License**.  

---