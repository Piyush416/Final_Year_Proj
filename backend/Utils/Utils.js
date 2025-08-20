// utils/collegeStream.js

// Master branch list
const allBranches = [
    // Engineering
    "Computer Science",
    "Information Technology",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Electronics & Communication",
    "Automobile Engineering",
    "Chemical Engineering",
    "Mechatronics Engineering",
    "Biomedical Engineering",
    "Robotics and Automation",

    // Medical
    "MBBS",
    "Physiotherapy",
    "Nursing",
    "Pharmacy",
    "Ayurveda",
    "Homeopathy",
    "Medical Laboratory Technology",
    "Radiology and Imaging",
    "Optometry",
    "Public Health",

    // Commerce
    "B.Com (General)",
    "B.Com (Accounting & Finance)",
    "B.Com (Taxation)",
    "BBA",
    "BBA (International Business)",
    "M.Com",
    "MBA",

    // Arts
    "BA English",
    "BA Psychology",
    "BA Sociology",
    "BA Political Science",
    "BA History",
    "BA Economics",
    "Fine Arts",

    // Library / Information Science
    "Bachelor of Library Science (B.Lib.Sc.)",
    "Master of Library Science (M.Lib.Sc.)",
    "Diploma in Library Science",
];

// Map streams → colleges + relevant branches
const streamMap = {
    "Engineering & Technology": {
        colleges: [
            "Parul Institue of Engineering and Technology",
            "Parul Institue of Technology",
            "Parul Institue of Engineering and Technology(DS)",
            "Parul Polytechnic Institue",
            "Parul Institute of Engineering & Technology - MBA - PIET - MBA",
            "Parul Institue of Computer Application-PICA",
            "Parul Institue of Engineering & Technology-MCA - PIET-MCA",
            "Parul Institue of Architecture & Research - PIAR"
        ],
        branches: allBranches.slice(0, 11) // first 11 = engineering
    },

    "Medical & Nursing": {
        colleges: [
            "Parul Institute of Medical Science & Research - PIMSR",
            "Parul Institute of Nursing - PIN",
            "Parul Institue of Physiotherapy - PIPT",
            "Ahmedabad Physiotherapy College - APC"
        ],
        branches: allBranches.slice(11, 21) // medical set
    },

    "Pharmacy": {
        colleges: [
            "Parul Institue of Pharmacy - PIP",
            "Parul Institue of Pharmacy and Research - PIPR",
            "School of Pharmacy - SOP"
        ],
        branches: ["Pharmacy"] // already inside medical list, but can keep explicit
    },

    "Ayurveda": {
        colleges: [
            "Parul Institue of Ayurved - PIA",
            "Parul Institue of Ayurved & Research - PIA Research"
        ],
        branches: ["Ayurveda"]
    },

    "Homoeopathy & Health Sciences": {
        colleges: [
            "Jawaharlal Nehru Homoeopathic Medical College - JNHMC",
            "Rajkot Homoeopathic Medical College - RHMC",
            "Ahmedabad Homoeopathic Medical College - AHMC",
            "Parul Institute of Homoeopathic & Research - PIHR",
            "Parul Institute of Public Health - PIPH",
            "Department of Paramedical and Health Sciences - DPMHS"
        ],
        branches: ["Homeopathy", "Public Health", "Medical Laboratory Technology", "Radiology and Imaging", "Optometry"]
    },

    "Management & Commerce": {
        colleges: [
            "Parul Institute of Management & Research - PIMR",
            "Parul Institute of Management (PGDM) - PIM - PGDM",
            "Parul Institute of Business Administration - PIBA",
            "Parul Institue of Commerce - PIC",
            "Parul Institue of Hotel Management and Catering Technology - PIHMCT"
        ],
        branches: allBranches.slice(21, 28) // commerce set
    },

    "Arts & Humanities": {
        colleges: [
            "Parul Institue of Design - PID",
            "Parul Institue of Fine Arts - PIFA",
            "Parul Institue of Arts - PIArts"
        ],
        branches: allBranches.slice(28, 35) // arts set
    },

    "Law & Social Work": {
        colleges: [
            "Parul Institue of Law - PIL",
            "Parul Institue of Social Work - PISW"
        ],
        branches: ["LLB", "LLM", "BSW", "MSW"]
    },

    "Library & Information Science": {
        colleges: ["Parul Institue of Library and Information Science - PILIS"],
        branches: allBranches.slice(35) // library science set
    },

    "Agriculture": {
        colleges: ["College of Agriculture - COA"],
        branches: ["Agriculture Science"]
    }
};

// ✅ Get Stream by College
export const getStreamDetails = (collegeName) => {
    for (const [stream, details] of Object.entries(streamMap)) {
        if (details.colleges.includes(collegeName)) {
            return stream;
        }
    }
    return "Other";
};

// ✅ Get Branches by Stream
export const getBranchesByStream = (streamName) => {
    return streamMap[streamName]?.branches || [];
};

// ✅ Single function: from college → {stream, branches}
export const getCollegeDetails = (collegeName) => {
    const stream = getStreamDetails(collegeName);
    const branches = getBranchesByStream(stream);
    return { stream, branches };
};
