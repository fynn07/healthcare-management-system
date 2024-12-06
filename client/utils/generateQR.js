document.addEventListener('DOMContentLoaded', function () {
    const largeJson = {
        "first_name" : "Fynn Nino",
        "middle_name" : "Sarinas",
        "last_name" : "Borja",
        "email" : "pewdiestuff@gmail.com",
        "birthday" : "2024-01-02",
        "contact_number" : "095545633",
        "address" : "Labangon, Cebu City",
        "gender" : "M",
        "height" : 135,
        "weight" : 75,        
        };
        
    const finalJson = JSON.stringify(largeJson);
    console.log(finalJson)

    
});
  