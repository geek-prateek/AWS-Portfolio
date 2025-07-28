"use client";
import Image from "next/image";
import experienceData from "../../../public/data/experience.json";
import personalData from "../../../public/data/personal.json";
import contactData from "../../../public/data/contact.json";
import { useRef } from "react";

const profileImg = "/data/profile.jpg";

export default function ResumePage() {
  // Extract data
  const experiences = experienceData.experiences;
  const education = experienceData.education;
  const contact = contactData;
  const personal = personalData;

  // PDF ref
  const resumeRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="bg-white text-black max-w-2xl mx-auto p-8 shadow-lg min-h-screen print:shadow-none print:p-0 print:bg-white">
      {/* Resume Content */}
      <div ref={resumeRef}>
        {/* Header */}
        <div className="flex items-center gap-6 border-b pb-4 mb-4">
          <div className="flex-shrink-0">
            <Image src={profileImg} alt="Profile" width={90} height={90} className="rounded-full border object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{personal.name}</h1>
            <div className="text-gray-700 text-sm">{personal.title}</div>
            <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-600">
              <span className="flex items-center gap-1"><svg className="w-4 h-4 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> {experiences[0].location}</span>
              <span className="flex items-center gap-1"><svg className="w-4 h-4 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 01-8 0m8 0a4 4 0 01-8 0m8 0v4a4 4 0 01-8 0v-4m8 0V8a4 4 0 00-8 0v4" /></svg> prateek.dbg@gmail.com</span>
              <span className="flex items-center gap-1"><svg className="w-4 h-4 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 4v8" /></svg> (+91) 732-093-4131</span>
            </div>
            <div className="flex flex-wrap gap-4 mt-2 text-xs">
              <a href={personal.social.linkedin} className="text-blue-700 hover:underline">LinkedIn</a>
              <a href={personal.social.github} className="text-blue-700 hover:underline">GitHub</a>
              <a href={contact.social.LinkTree} className="text-blue-700 hover:underline">Linktree</a>
            </div>
          </div>
        </div>
        {/* Objective */}
        <div className="mb-4">
          <h2 className="font-semibold text-lg mb-1">Objective</h2>
          <p className="text-sm text-gray-800">Aspiring to build impactful software by applying and refining my full-stack skills in a growth-driven environment. Eager to contribute to real-world engineering challenges while continually learning technologies that drive innovation.</p>
        </div>
        {/* Skills */}
        <div className="mb-4">
          <h2 className="font-semibold text-lg mb-1">Skills</h2>
          <ul className="list-disc ml-6 text-sm">
            <li>Frontend: ReactJS, Angular, HTML, CSS, JavaScript, Bootstrap, PrimeNG</li>
            <li>Backend: Java, Python, C#, Node.js, SQL</li>
            <li>DevOps & Tools: Git, GitHub, npm, vite, FastAPI</li>
            <li>Concepts: Data Structures, REST APIs, Linux, OOP</li>
          </ul>
        </div>
        {/* Education */}
        <div className="mb-4">
          <h2 className="font-semibold text-lg mb-1">Education</h2>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-start text-sm">
                <div>
                  <div className="font-semibold">{edu.title}</div>
                  <div className="text-gray-700">{edu.institution}</div>
                  <div className="text-gray-600 text-xs">{edu.description}</div>
                </div>
                <div className="text-right whitespace-nowrap text-gray-700">{edu.period}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Experience */}
        <div className="mb-4">
          <h2 className="font-semibold text-lg mb-1">Experience</h2>
          <div className="space-y-4">
            {experiences.map((exp, idx) => (
              <div key={idx} className="text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{exp.title}</span>
                  <span className="text-xs text-gray-700 whitespace-nowrap">{exp.period}</span>
                </div>
                <div className="text-gray-700">{exp.company}, {exp.location}</div>
                <div className="text-gray-600 text-xs mb-1">{exp.description}</div>
                <ul className="list-disc ml-6 text-xs text-gray-700">
                  {exp.achievements && exp.achievements.map((ach, i) => (
                    <li key={i}>{ach}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* Projects */}
        <div className="mb-4">
          <h2 className="font-semibold text-lg mb-1">Projects</h2>
          <div className="space-y-3">
            {/* Project 1 */}
            <div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-900">AI Powered MathSolver</span>
                <a href="https://github.com/geek-prateek/AI-Powered-Calculator" className="text-blue-700 text-xs hover:underline">GitHub</a>
              </div>
              <div className="italic text-xs text-gray-700 mb-1">Key Skills: React, TypeScript, Vite, FastAPI, Tailwind CSS, Google's Gemini AI, MathJax</div>
              <ul className="list-disc ml-6 text-xs text-gray-700">
                <li>Built a React + TypeScript application that allows users to draw mathematical expressions on a canvas and solve them using AI.</li>
                <li>Integrated Google's Gemini AI via FastAPI backend to analyze and process mathematical expressions from images.</li>
                <li>Utilized MathJax for rendering mathematical results in LaTeX format.</li>
              </ul>
            </div>
            {/* Project 2 */}
            <div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-900">Valid Correct - An NPM Package</span>
                <a href="https://www.npmjs.com/package/valid-correct" className="text-blue-700 text-xs hover:underline">GitHub</a>
              </div>
              <div className="italic text-xs text-gray-700 mb-1">Key Skills: Node.js, JavaScript, npm</div>
              <ul className="list-disc ml-6 text-xs text-gray-700">
                <li>Developed and published a robust npm package for form validation in Node.js applications.</li>
                <li>The package provides detailed error handling and actionable correction suggestions, simplifying validation processes for developers.</li>
              </ul>
            </div>
            {/* Project 3 */}
            <div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-900">CodeIN - College Coding Platform Website</span>
                <a href="https://github.com/geek-prateek/CodeIN" className="text-blue-700 text-xs hover:underline">GitHub</a>
              </div>
              <div className="italic text-xs text-gray-700 mb-1">Key Skills: ReactJS, CSS, Bootstrap, NodeJS, JavaScript, MongoDB</div>
              <ul className="list-disc ml-6 text-xs text-gray-700">
                <li>Developed a website that will help the colleges conduct their coding-based contests, and virtual hackathons all in one platform using a particular IDE.</li>
              </ul>
            </div>
            {/* Project 4 */}
            <div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-900">CricNow - Live Matches Chrome Extension</span>
                <a href="https://github.com/geek-prateek/My_Chrome_Extension" className="text-blue-700 text-xs hover:underline">GitHub</a>
              </div>
              <div className="italic text-xs text-gray-700 mb-1">Key Skills: HTML, CSS, JavaScript, Fetch API</div>
              <ul className="list-disc ml-6 text-xs text-gray-700">
                <li>Designed and developed a Chrome Extension that provides live match updates for cricket using HTML, CSS, and JavaScript.</li>
                <li>Utilized the Fetch API to retrieve real-time match data from external sources.</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Achievements */}
        <div className="mb-4">
          <h2 className="font-semibold text-lg mb-1">Achievements</h2>
          <ul className="list-disc ml-6 text-sm text-gray-800 space-y-1">
            <li>Authored a series of tech blogs on <a href="https://geekprateek.hashnode.dev/" className="text-blue-700 hover:underline">HashNode</a>, simplifying complex software development concepts and tools to enhance community understanding.</li>
            <li>Participated in many events and completed several boot camps organized by the <a href="https://www.linkedin.com/posts/geekprateek_nodejs-backend-learncoding-activity-6949691698155249664-dcqz/" className="text-blue-700 hover:underline">DSCPU</a>.</li>
            <li>Achieved a 2-star <a href="https://www.codechef.com/users/geekprateek19" className="text-blue-700 hover:underline">CodeChef</a> rating, reflecting consistent participation and problem-solving skills.</li>
            <li>Completed the February and March Daily Challenges on <a href="https://leetcode.com/u/geekprateek/" className="text-blue-700 hover:underline">LeetCode</a>, earning the "Problem Solver" badges.</li>
            <li>Awarded a <a href="https://www.hackerrank.com/profile/prateek_dbg" className="text-blue-700 hover:underline">HackerRank</a> Gold Badge for successfully completing the "30 Days of Code" challenge.</li>
          </ul>
        </div>
        {/* Certifications */}
        <div className="mb-4">
          <h2 className="font-semibold text-lg mb-1">Certifications</h2>
          <ul className="list-disc ml-6 text-sm text-gray-800 space-y-1">
            <li><a href="https://www.credly.com/badges/74635664-0c66-4e87-910d-ee09117107c1/linked_in_profile" className="text-blue-700 hover:underline">Introduction to Cybersecurity</a> <span className="text-xs text-gray-600">Cisco</span></li>
            <li><a href="https://geek-prateek.github.io/NGVP-Portfolio/HackerRank%20Certificate.png" className="text-blue-700 hover:underline">SQL (Basic) Certificate</a> <span className="text-xs text-gray-600">HackerRank</span></li>
            <li><a href="https://geek-prateek.github.io/NGVP-Portfolio/Android%20App%20Development%20Training%20-%20Certificate%20of%20Completion_page-0001.jpg" className="text-blue-700 hover:underline">Android App Development</a> <span className="text-xs text-gray-600">Internshala</span></li>
          </ul>
        </div>
        {/* Interests */}
        <div className="mb-4">
          <h2 className="font-semibold text-lg mb-1">Interests</h2>
          <ul className="list-disc ml-6 text-sm text-gray-800 space-y-1">
            <li><a href="https://github.com/geek-prateek/Machine_learning" className="text-blue-700 hover:underline">Machine Learning</a></li>
            <li><a href="https://geek-prateek.github.io/NGVP-Portfolio/flutter%20certificate.jpg" className="text-blue-700 hover:underline">Flutter</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
