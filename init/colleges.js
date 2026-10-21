const mongoose = require("mongoose");
const College = require("../models/College");

const MONGO_URL = "mongodb://127.0.0.1:27017/eduguide";

main()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const colleges = [
    {
        name: "IIT Delhi",
        location: "Hauz Khas, New Delhi",
        description:
            "Indian Institute of Technology Delhi is a premier technical institute known for engineering education, research and innovation.",
        collegeType: "Public Technical Institute",
        fees: 100000,
        courses: [
            "B.Tech Computer Science and Engineering",
            "B.Tech Electrical Engineering",
            "B.Tech Mechanical Engineering",
            "B.Tech Mathematics and Computing",
            "B.Tech Civil Engineering"
        ],
        entranceExams: [
            "JEE Main",
            "JEE Advanced"
        ],
        hostelAvailable: true,
        website: "https://home.iitd.ac.in/",
        admissionLink: "https://academics.iitd.ac.in/ug-admissions/"
    },

    {
        name: "IIT Bombay",
        location: "Powai, Mumbai",
        description:
            "Indian Institute of Technology Bombay is a leading institute known for engineering, technology, research and innovation.",
        collegeType: "Public Technical Institute",
        fees: 100000,
        courses: [
            "B.Tech Computer Science and Engineering",
            "B.Tech Electrical Engineering",
            "B.Tech Mechanical Engineering",
            "B.Tech Civil Engineering"
        ],
        entranceExams: [
            "JEE Main",
            "JEE Advanced"
        ],
        hostelAvailable: true,
        website: "https://www.iitb.ac.in/",
        admissionLink: "https://acad.iitb.ac.in/"
    },

    {
        name: "IIT Kanpur",
        location: "Kalyanpur, Kanpur",
        description:
            "Indian Institute of Technology Kanpur is a premier institute offering undergraduate education and advanced research across engineering and science.",
        collegeType: "Public Technical Institute",
         fees: 100000,
        courses: [
            "B.Tech Computer Science and Engineering",
            "B.Tech Electrical Engineering",
            "B.Tech Mechanical Engineering",
            "B.Tech Aerospace Engineering"
        ],
        entranceExams: [
            "JEE Main",
            "JEE Advanced"
        ],
        hostelAvailable: true,
        admissionLink: "https://www.iitk.ac.in/",
        admissionLink: "https://home.iitd.ac.in/",
        website: "https://www.iitk.ac.in/",
        admissionLink: "https://www.iitk.ac.in/doaa/"
    },

    {
        name: "IIT Madras",
        location: "Chennai, Tamil Nadu",
        description:
            "Indian Institute of Technology Madras is a premier institute known for engineering education, scientific research and technological innovation.",
        collegeType: "Public Technical Institute",
         fees: 100000,
        courses: [
            "B.Tech Computer Science and Engineering",
            "B.Tech Electrical Engineering",
            "B.Tech Mechanical Engineering",
            "B.Tech Civil Engineering"
        ],
        entranceExams: [
            "JEE Main",
            "JEE Advanced"
        ],
        hostelAvailable: true,
        admissionLink: "https://www.iitm.ac.in/",
        website: "https://www.iitm.ac.in/",
        admissionLink: "https://www.iitm.ac.in/academics"
    },

    {
        name: "NIT Trichy",
        location: "Tiruchirappalli, Tamil Nadu",
        description:
            "National Institute of Technology Tiruchirappalli is a leading public technical institute offering undergraduate and postgraduate programs in engineering and technology.",
        collegeType: "Public Technical Institute",
         fees: 80000,
        courses: [
            "B.Tech Computer Science and Engineering",
            "B.Tech Electronics and Communication Engineering",
            "B.Tech Electrical and Electronics Engineering",
            "B.Tech Mechanical Engineering",
            "B.Tech Civil Engineering"
        ],
        entranceExams: [
            "JEE Main"
        ],
        hostelAvailable: true,
        admissionLink: "https://www.nitt.edu/",
        website: "https://www.nitt.edu/",
        admissionLink: "https://www.nitt.edu/home/admissions/"
    },

    {
        name: "IIT Roorkee",
        location: "Roorkee, Uttarakhand",
        description:
            "Indian Institute of Technology Roorkee offers engineering, science, architecture and technology programs with a strong focus on research.",
        collegeType: "Public Technical Institute",
        fees: 100000,
        courses: [
            "B.Tech Computer Science and Engineering",
            "B.Tech Electrical Engineering",
            "B.Tech Mechanical Engineering",
            "B.Tech Civil Engineering",
            "B.Tech Electronics and Communication Engineering"
        ],
        entranceExams: ["JEE Main", "JEE Advanced"],
        hostelAvailable: true,
        website: "https://www.iitr.ac.in/",
        admissionLink: "https://www.iitr.ac.in/"
    },
    {
        name: "IIT Hyderabad",
        location: "Sangareddy, Telangana",
        description:
            "IIT Hyderabad is known for engineering education, interdisciplinary research and emerging technology programs.",
        collegeType: "Public Technical Institute",
        fees: 100000,
        courses: [
            "B.Tech Computer Science and Engineering",
            "B.Tech Artificial Intelligence",
            "B.Tech Electrical Engineering",
            "B.Tech Mechanical Engineering",
            "B.Tech Engineering Science"
        ],
        entranceExams: ["JEE Main", "JEE Advanced"],
        hostelAvailable: true,
        website: "https://www.iith.ac.in/",
        admissionLink: "https://www.iith.ac.in/"
    },
    {
        name: "NIT Kurukshetra",
        location: "Kurukshetra, Haryana",
        description:
            "National Institute of Technology Kurukshetra offers undergraduate engineering programs and technical education.",
        collegeType: "Public Technical Institute",
        fees: 80000,
        courses: [
            "B.Tech Computer Engineering",
            "B.Tech Information Technology",
            "B.Tech Electronics and Communication Engineering",
            "B.Tech Mechanical Engineering",
            "B.Tech Electrical Engineering"
        ],
        entranceExams: ["JEE Main"],
        hostelAvailable: true,
        website: "https://nitkkr.ac.in/",
        admissionLink: "https://nitkkr.ac.in/"
    },
    {
        name: "NIT Warangal",
        location: "Warangal, Telangana",
        description:
            "NIT Warangal provides technical education and research opportunities in engineering and related disciplines.",
        collegeType: "Public Technical Institute",
        fees: 80000,
        courses: [
            "B.Tech Computer Science and Engineering",
            "B.Tech Information Technology",
            "B.Tech Electronics and Communication Engineering",
            "B.Tech Mechanical Engineering",
            "B.Tech Civil Engineering"
        ],
        entranceExams: ["JEE Main"],
        hostelAvailable: true,
        website: "https://nitw.ac.in/",
        admissionLink: "https://nitw.ac.in/"
    },
    {
        name: "NIT Calicut",
        location: "Kozhikode, Kerala",
        description:
            "NIT Calicut is a public technical institute offering engineering, architecture and science education.",
        collegeType: "Public Technical Institute",
        fees: 80000,
        courses: [
            "B.Tech Computer Science and Engineering",
            "B.Tech Electrical and Electronics Engineering",
            "B.Tech Electronics and Communication Engineering",
            "B.Tech Mechanical Engineering",
            "B.Tech Civil Engineering"
        ],
        entranceExams: ["JEE Main"],
        hostelAvailable: true,
        website: "https://nitc.ac.in/",
        admissionLink: "https://nitc.ac.in/"
    },
    {
        name: "Delhi Technological University",
        location: "Rohini, Delhi",
        description:
            "Delhi Technological University offers undergraduate engineering, technology and related programs.",
        collegeType: "Government College",
        fees: 200000,
        courses: [
            "B.Tech Computer Science and Engineering",
            "B.Tech Information Technology",
            "B.Tech Software Engineering",
            "B.Tech Electrical Engineering",
            "B.Tech Mechanical Engineering"
        ],
        entranceExams: ["JEE Main"],
        hostelAvailable: true,
        website: "https://dtu.ac.in/",
        admissionLink: "https://dtu.ac.in/"
    },
    {
        name: "Netaji Subhas University of Technology",
        location: "Dwarka, Delhi",
        description:
            "NSUT offers engineering and technology programs in computing, electronics and other technical fields.",
        collegeType: "Government College",
        fees: 200000,
        courses: [
            "B.Tech Computer Science and Engineering",
            "B.Tech Information Technology",
            "B.Tech Artificial Intelligence and Machine Learning",
            "B.Tech Electronics and Communication Engineering",
            "B.Tech Electrical Engineering"
        ],
        entranceExams: ["JEE Main"],
        hostelAvailable: true,
        website: "https://nsut.ac.in/",
        admissionLink: "https://nsut.ac.in/"
    },
    {
        name: "Vellore Institute of Technology",
        location: "Vellore, Tamil Nadu",
        description:
            "VIT is a private university offering engineering, computing and interdisciplinary degree programs.",
        collegeType: "Private University",
        fees: 200000,
        courses: [
            "B.Tech Computer Science and Engineering",
            "B.Tech Information Technology",
            "B.Tech Artificial Intelligence and Machine Learning",
            "B.Tech Biotechnology",
            "B.Tech Electronics and Communication Engineering"
        ],
        entranceExams: ["VITEEE"],
        hostelAvailable: true,
        website: "https://vit.ac.in/",
        admissionLink: "https://vit.ac.in/"
    },
    {
        name: "Manipal Institute of Technology",
        location: "Manipal, Karnataka",
        description:
            "Manipal Institute of Technology offers engineering and technology programs across computing and core engineering disciplines.",
        collegeType: "Private University",
        fees: 300000,
        courses: [
            "B.Tech Computer Science and Engineering",
            "B.Tech Information Technology",
            "B.Tech Artificial Intelligence and Machine Learning",
            "B.Tech Mechanical Engineering",
            "B.Tech Electronics and Communication Engineering"
        ],
        entranceExams: ["MET"],
        hostelAvailable: true,
        website: "https://manipal.edu/mit.html",
        admissionLink: "https://manipal.edu/"
    },
    {
        name: "Thapar Institute of Engineering and Technology",
        location: "Patiala, Punjab",
        description:
            "Thapar Institute is a private deemed university offering engineering, computing and science programs.",
        collegeType: "Private University",
        fees: 300000,
        courses: [
            "B.E. Computer Engineering",
            "B.E. Computer Science and Engineering",
            "B.E. Electronics and Communication Engineering",
            "B.E. Electrical Engineering",
            "B.E. Mechanical Engineering"
        ],
        entranceExams: ["JEE Main"],
        hostelAvailable: true,
        website: "https://www.thapar.edu/",
        admissionLink: "https://www.thapar.edu/"
    },


];

College.find({}).then((colleges) => {
    colleges.forEach((college) => {
        console.log(college.name, college.admissionLink);
    });
});

const initDB = async () => {
    await College.deleteMany({});
    await College.insertMany(colleges);
    console.log("College data was initialized");
};

initDB();

