// Testimonial data
const testimonials = [
    {
        image: "../assets/dummy_profile/ashley.png",
        content: "The software is fantastic, and it is incredibly user-friendly, which is very essential during a pandemic. This software gets 5 stars from me, what a fantastic app.",
        name: "Ashley Ken Comandao",
        title: "TheHealthBook App User",
    },
    {
        image: "../assets/dummy_profile/paula.jpg",
        content: "The user interface is seamless, and the features are exactly what I needed. It simplifies complex tasks and saves so much time. This app deserves all the praise for being both innovative and reliable.",
        name: "Paula Mae Horolan",
        title: "TheHealthBook App User",
    },
    {
        image: "../assets/dummy_profile/doctor.jpg",
        content: "As a doctor, having quick access to patient information is critical, and this app delivers flawlessly. It saves time and ensures accuracy, which is essential in our profession.",
        name: "Dr. John Neil Cabili",
        title: "TheHealthBook App User",
    },
    {
        image: "../assets/dummy_profile/clerk.jpg",
        content: "This software has transformed how we manage hospital operations. From scheduling to resource allocation, everything is seamless. It has made my job as a hospital manager so much easier!",
        name: "Anna Samantha del Monte",
        title: "TheHealthBook App User",
    },
    // Add more testimonials as needed
];

// Reference to the carousel container
const carousel = document.querySelector(".testimonial-carousel");

// Function to create testimonial cards
function createTestimonialCard({ image, content, name, title }) {
    const card = document.createElement("div");
    card.className = "flex w-full justify-center py-6";
    card.innerHTML = `
        <div class="flex flex-col rounded-xl shadow-lg bg-gradient-to-br from-[#FAF1F1] to-[#F6F1FF] testimonial-card md:flex-row md:h-[320px] max-md:w-[360px] md:w-[600px] xl:w-[800px]">
            <div class="flex w-full h-[240px] md:h-full md:w-[40%]">
                <img src="${image}" alt="testimonial" class="flex grow w-full object-cover max-h-full max-md:rounded-t-xl md:rounded-l-xl">
            </div>
            <div class="flex flex-col justify-between h-full w-full px-10 py-8 md:w-[60%]">
                <p>${content}</p>
                <div class="flex flex-col gap-1">
                    <span class="mt-6 text-xl font-bold text-blue_main">${name}</span>
                    <span class="text-blue_main">${title}</span>
                </div>
            </div>
        </div>
    `;
    return card;
}

// Populate carousel with testimonials
testimonials.forEach((testimonial) => {
    const card = createTestimonialCard(testimonial);
    carousel.appendChild(card);
});
