export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
}

export const experiences: Experience[] = [
  {
    id: "1",
    company: "PURTC (President University Robotic and Tech Club)",
    role: "Head of Division Internal",
    period: "Oct 2024  - May 2025",
    description: [
      "Leading internal communication and coordination across departments. ",
      "Responsible for member engagement.",
      "Internal events, and maintaining a positive team environment.",
    ],
  },
  {
    id: "2",
    company: "PUFA Computer Science 2026",
    role: "Vice of Division Entrepreneurship | BEM Faculty of Computer Science",
    period: "August 2025- Present",
    description: [  
      "Actively contributed to the financial sustainability and branding of the Faculty of Computer Science through strategic entrepreneurial initiatives and project management.",
      "Managed communications and negotiations with external vendors to secure cost-effective deals for organizational needs while maintaining quality control.",
      "Worked closely with cross-functional teams within the BEM to streamline logistics and financial workflows for various departmental programs.",
      "Led the end-to-end process for official faculty merchandise, including demand forecasting, coordinating member data (such as apparel sizing), and ensuring high-quality production standards.",
    ],
  },
];
