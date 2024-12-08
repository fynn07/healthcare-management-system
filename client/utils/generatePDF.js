
import 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.27/jspdf.plugin.autotable.min.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/qrcode/1.5.1/qrcode.min.js';
import { getApiEndpoint } from "./getApiEndpoint.js";
import { fetchProvider } from "./generateQR.js";

document.getElementById("generate_pdf").addEventListener("click", async() => {
    const { jsPDF } = window.jspdf; // Ensure jsPDF is available
    const doc = new jsPDF();
    console.log(window.jspdf); 

    const urlParams = new URLSearchParams(window.location.search);
    const token = localStorage.getItem('token');
    const id = urlParams.get('id');

    const ENDPOINT = getApiEndpoint();

    const provider = await fetchProvider();
    if (!provider) {
        alert("Failed to fetch provider data.");
        return;
    } 

    const json_url = `${ENDPOINT}/api/patient/fetch/${id}/generate_patient_json/${provider.account}/`;

    const qrDiv = document.getElementById("qrcode");
    qrDiv.innerHTML = ""; // Clear previous QR code
    new QRCode(qrDiv, {
        text: json_url,
        width: 256, // QR code width
        height: 256, // QR code height
    });

    // Extract QR Code as Image
    const qrCanvas = qrDiv.querySelector("canvas");
    if (!qrCanvas) {
        alert("Failed to generate QR code.");
        return;
    }
    const qrImage = qrCanvas.toDataURL("image/png");

    // Fetch data from the endpoint
    const profileInformation = await fetch(json_url, {
        method: "GET",
        headers: {
            'Authorization': `Token ${token}`,
            "Content-Type": "application/json"
        }
    }).then((response) => response.json());
    

    // Header Section
    doc.setFontSize(24);
    doc.setTextColor(33, 150, 243); 
    doc.text('TheHealthBook', 10, 20);

    doc.addImage(qrImage, "PNG", 130, 20, 50, 50);

    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0); // Black text
    doc.text(`${profileInformation.patient.first_name} ${profileInformation.patient.last_name}`, 10, 30);

    const today = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options).replace(',', '') + 
                      ` at ${today.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100); 
    doc.text(`Printed, ${formattedDate}`, 10, 36);

    doc.text('Personal Information', 10, 50);
    doc.text(
        `${profileInformation.patient.gender === "M" ? "Male" : "Female"}     ${new Date(profileInformation.patient.birthday).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} (${new Date().getFullYear() - new Date(profileInformation.patient.birthday).getFullYear() - (new Date() < new Date(new Date(profileInformation.patient.birthday).setFullYear(new Date().getFullYear())) ? 1 : 0)}y)`, 
        10, 
        56
    );
    doc.text(`${profileInformation.patient.email}     +63 998 987 7654`, 10, 62);
    doc.text(`${profileInformation.patient.address}`, 10, 68);

    // // Medical History Section
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); 
    doc.text('History Records', 10, 80);

     // Medication History Table
     doc.setFontSize(14);
     doc.text('Medication History', 10, 90);
 
    const medicationHeaders = [
         'DATE ADDED', 'DATE PRESCRIBED', 'GENERIC NAME', 'DOSAGE FORM', 'QUANTITY', 'INSTRUCTIONS'
    ];

    const medicationRows = profileInformation.medication_history.map(medication => [
        medication.date_added,
        medication.date_prescribed,
        medication.generic_name,
        medication.dosage,
        medication.quantity,
        medication.instructions
    ]);

    doc.autoTable({
        startY: 95,
        head: [medicationHeaders],
        body: medicationRows,
        styles: { fontSize: 10 },
        theme: 'striped'
    });

    // Vaccination History Table
    doc.text('Vaccination History', 10, doc.lastAutoTable.finalY + 15);

    const vaccinationHeaders = [
        'DATE ADDED', 'VACCINE AND BRAND', 'PROVIDER', 'SITE GIVEN', 'DOSE ML', 'NEXT DOSE ON'
    ];

    const vaccinationRows = profileInformation.vaccination_history.map(vaccination => [
        vaccination.date_added,
        vaccination.vaccine_name,
        vaccination.provider,
        vaccination.site_given,
        vaccination.dose_ml,
        vaccination.next_dose_date
    ]);

    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 20,
        head: [vaccinationHeaders],
        body: vaccinationRows,
        styles: { fontSize: 10 },
        theme: 'striped'
    });

    // Family History Table
    doc.text('Family History', 10, doc.lastAutoTable.finalY + 15);

    const familyHeaders = [
        'DATE ADDED', 'FAMILY RELATIONSHIP', 'CONDITION ILLNESS' 
    ];

    const familyRows = profileInformation.family_history.map(family => [
        family.date_added,
        family.relationship,
        family.condition_illness,
    ]);

    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 20,
        head: [familyHeaders],
        body: familyRows,
        styles: { fontSize: 10 },
        theme: 'striped'
    });

    // Social History Table
    doc.text('Social History', 10, doc.lastAutoTable.finalY + 15);

    const socialHeaders = [
        'DATE ADDED', 'NICOTINE CONSUMPTION', 'ALCOHOL CONSUMPTION', 'DRUGS TAKEN', 'DIET', 'PHYSICAL ACTIVITY' 
    ];

    const socialRows = profileInformation.social_history.map(social => [
        social.date_added,
        social.nicotine_consumption,
        social.alcohol_consumption,
        social.drugs_taken,
        social.diet,
        social.physical_activity
    ]);

    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 20,
        head: [socialHeaders],
        body: socialRows,
        styles: { fontSize: 10 },
        theme: 'striped'
    });

    // Surgical History Table
    doc.text('Surgical History', 10, doc.lastAutoTable.finalY + 15);

    const surgicalHeaders = [
        'DATE ADDED', 'OPERATION PROCEDURE', 'INDICATION', 'HOSPITAL', 'OPERATION DATE' 
    ];

    const surgicalRows = profileInformation.surgical_history.map(surgical => [
        surgical.date_added,
        surgical.operation_procedure,
        surgical.indication,
        surgical.hospital,
        surgical.operation_date,
    ]);

    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 20,
        head: [surgicalHeaders],
        body: surgicalRows,
        styles: { fontSize: 10 },
        theme: 'striped'
    });

    // Vital History Table
    doc.text('Vital History', 10, doc.lastAutoTable.finalY + 15);

    const vitalHeaders = [
        'DATE ADDED', 'TEMPERATURE', 'BLOOD PRESSURE', 'PULSE RATE', 'BLOOD GLUCOSE' 
    ];

    const vitalRows = profileInformation.vital_history.map(vital => [
        vital.date_added,
        vital.temperature,
        vital.blood_pressure,
        vital.pulse_rate,
        vital.blood_glucose,
    ]);

    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 20,
        head: [vitalHeaders],
        body: vitalRows,
        styles: { fontSize: 10 },
        theme: 'striped'
    });

    // Allergy History Table
    doc.text('Vital History', 10, doc.lastAutoTable.finalY + 15);

    const allergyHeaders = [
        'DATE ADDED', 'SUBSTANCE', 'DESCRIPTION', 'SEVERITY', 'CRITICALITY' 
    ];

    const allergyRows = profileInformation.allergy_history.map(allergy => [
        allergy.date_added,
        allergy.substance,
        allergy.description,
        allergy.severity,
        allergy.criticality
    ]);

    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 20,
        head: [allergyHeaders],
        body: allergyRows,
        styles: { fontSize: 10 },
        theme: 'striped'
    });

    doc.save(`THB_${profileInformation.patient.last_name}_Records.pdf`);
})