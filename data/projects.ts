export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  hasImage?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  writeupUrl?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "FICTIONHUB",
    description: "This project is a simple yet functional eBook library system developed using PHP and MySQL. It allows users to register, log in, browse digital books, borrow and return them, and for administrators to manage books, categories, and users through a dedicated dashboard.",
    tags: ["PHP", "Laragon", "Tailwind CSS"],
    image: "/FICTIONHUB.PNG",
    hasImage: true,
    liveUrl: "",
    githubUrl: "https://github.com/GaleAdi/FICTIONHUB",
  },
  {
    id: "2",
    title: "ParamAI-BPOM Testing Parameter",
    description: "AI-powered system that instantly recommends BPOM testing parameters for food products by analyzing product descriptions with Claude API and a regulatory rule engine — cutting manual lookup time from 45 minutes to under 30 seconds.",
    tags: ["React", "Node.js", "TypeScript", "Python", "FastAPI", "Railway"],
    image: "/ParamAI.png",
    hasImage: true,
    liveUrl: "https://param-ai-bpom-simulation.vercel.app/",
    githubUrl: "https://github.com/GaleAdi/ParamAI",
  },
  {
    id: "3",
    title: "SIMKK",
    description: "SIMKK stands for Employee Performance Management System. This application is used by companies to assess employee performance using the 360 Assessment method, meaning an employee can be assessed by themselves (self-assessment), their superiors, their coworkers and their subordinates.",
    tags: ["React", "Node js", "TypeScript", "PostgreSQL"],
    image: "/SIMKK.png",
    hasImage: true,
    liveUrl: "https://ptenerginusantara360.vercel.app/",
    githubUrl: "https://github.com/GaleAdi/simkk",
  },
  {
    id: "4",
    title: "Capture The Flag — Anti Error (#4)",
    description: "Competed as part of Team Anti Error in a Capture The Flag (CTF) cybersecurity competition, tackling challenges across web exploitation, forensics, and cryptography categories. Secured 4th place overall through systematic vulnerability analysis and collaborative problem-solving under time pressure.",
    tags: ["Cybersecurity", "CTF", "Forensics", "Kali Linux", "BurpSuite"],
    image: "/images/project-ctf-anti-error.jpg",
    hasImage: false,
    writeupUrl: "/anti-error-writeup.pdf",
  },
  {
    id: "5",
    title: "Capture The Flag — Sherlock Homeless (#5)",
    description: "Participated with Team Sherlock Homeless in a Capture The Flag (CTF) competition, focusing on digital forensics and network packet analysis challenges. Achieved 5th place by applying investigative techniques to trace and reconstruct evidence from compromised systems.",
    tags: ["Cybersecurity", "CTF", "Network Analysis", "Forensic"],
    image: "/images/project-ctf-sherlock.jpg",
    hasImage: false,
    writeupUrl: "/sherlock-homeless-writeup.pdf",
  },
  {
    id: "6",
    title: "Cyber Risk Assesment",
    description: "Participated with Team to buil an organizational initiative designed to identify, assess, and mitigate the potential threats facing an organization's digital assets, information systems, and operational stability",
    tags: ["Cybersecurity", "React", "Next js", "PostgreSQL"],
    image: "/cyber-risk.jpeg",
    hasImage: true,
  },
  {
    id: "7",
    title: "Material Tracking for PT Gunze Indonesia",
    description: "A QR code and barcode-based material tracking system for PT Gunze Indonesia. This system records material movement across five production divisions using USB HID (keyboard emulation) barcode scanners.",
    tags: ["Type Script", "React", "Next js", "PostgreSQL", "Neon"],
    liveUrl: "https://gunze-material-tracking.vercel.app/",
    githubUrl: "https://github.com/GaleAdi/gunze-material-tracking",
    image: "/gunze.jpg",
    hasImage: true,
  },
];     
