import { useState } from "react";
import "../styles/interview.scss";
import { useInterview } from "../hooks/useInterview";

// const interviewData = {
//   "Description": "Design and build tools and experiences that automate complex workflows and make Azure development simpler and more productive...",
//   "technicalQuestions": [
//     {
//       "question": "This role involves integrating Azure services into open-source client tooling. Given your experience with React.js and Next.js, how would you approach designing a web-based dashboard for an Azure CLI tool that visualizes configuration and monitors service health?",
//       "intention": "To assess the candidate's ability to bridge their frontend expertise with the requirements of building tools for cloud platforms, specifically focusing on data visualization and integration concepts.",
//       "answer": "I would start by designing a component-based architecture using React or Next.js, focusing on modularity and reusability. For data visualization, I'd leverage charting libraries (e.g., Chart.js, Recharts). The key would be defining robust APIs that the CLI tool's backend (potentially Node.js, given my experience) exposes to retrieve configuration, metrics, and logs from Azure services. I'd consider using server-side rendering or static site generation with Next.js for initial load performance, and ensure real-time updates using WebSockets or periodic polling for monitoring. Security, error handling, and a responsive UI for different screen sizes would also be crucial design considerations."
//     },
//     {
//       "question": "The job description emphasizes working with Azure services, Azure CLI, Azure PowerShell, and Terraform. Can you describe any experience you have with cloud platforms, specifically Azure, and how you would go about gaining proficiency in these Azure-specific tools and services?",
//       "intention": "To identify the candidate's current cloud expertise, particularly with Azure, and evaluate their self-learning methodology for crucial domain-specific tools.",
//       "answer": "Currently, my direct hands-on experience with Azure is limited, as my focus has primarily been on web application development with the MERN stack. However, I have a strong foundation in backend development principles with Node.js and Express, which I believe are highly transferable to understanding and interacting with cloud services via APIs and SDKs. To gain proficiency in Azure CLI, PowerShell, and Terraform, I would immediately dive into Microsoft Learn modules and official Azure documentation, focusing on practical labs. I'd set up a free Azure account, replicate basic resource deployments using all three tools, and participate in relevant open-source projects where these are used, to learn by doing and contributing to real-world scenarios."
//     },
//     {
//       "question": "You mentioned working on a project where you handled APIs and built a backend with Express and Node.js. How would your approach to backend development differ when building an internal tool for automating workflows, compared to a customer-facing e-commerce application?",
//       "intention": "To assess the candidate's understanding of different backend development paradigms and considerations (e.g., API design, security, performance) for internal tooling versus external applications.",
//       "answer": "For an internal automation tool, the backend would prioritize robustness, reliability, and security, with a strong emphasis on well-defined APIs for machine-to-machine communication rather than complex UI integrations. Error handling and logging would be paramount for diagnostics. Performance might be critical for specific tasks, but general scalability could be managed differently, perhaps by focusing on individual task execution rather than concurrent user loads. Authentication might integrate with internal identity providers (e.g., Azure AD). In contrast, a customer-facing e-commerce app demands high scalability, low latency, extensive user authentication/authorization, and a focus on user experience through GraphQL or REST APIs designed for frontend consumption, often with public-facing security concerns."
//     }
//   ],
//   "behavioralQuestions": [
//     {
//       "question": "Tell me about a time you had to quickly learn a new technology or domain to deliver on a project requirement. What was the challenge, and what steps did you take to successfully adapt and complete the task?",
//       "intention": "To assess the candidate's adaptability, proactive learning skills, and ability to overcome technical challenges, which is crucial given the specific Azure technologies required for this role.",
//       "answer": "SITUATION: In my 'Sharma Store' project, my initial plan was a frontend-only application using a Fake Store API. However, I decided to expand it into a full-stack application to gain backend experience and store user cart items persistently, which required learning Node.js, Express, and MongoDB from scratch. TASK: The challenge was to integrate a secure and functional backend capable of handling CRUD operations for cart items, while still maintaining the project's frontend functionality and meeting my personal learning timeline. ACTION: I started by breaking down the learning process into smaller, manageable modules. I utilized online tutorials, official documentation for Node.js, Express, and Mongoose, and watched educational videos. I built small, isolated mini-projects for each concept (e.g., setting up a server, connecting to a database, defining routes) before integrating them into the main 'Sharma Store' project. I actively debugged issues, iterated quickly, and sought help from developer communities when stuck. RESULT: I successfully implemented a complete MERN stack backend for the Sharma Store, allowing users to add, view, and manage their cart items persistently. This experience significantly boosted my full-stack development skills and demonstrated my ability to rapidly acquire and apply new technologies to achieve project goals."
//     },
//     {
//       "question": "This role involves engaging deeply with open-source communities, including code reviews and design discussions. Describe a situation where you had to collaborate on a technical project with team members who had differing technical opinions or approaches. How did you navigate that, and what was the outcome?",
//       "intention": "To evaluate the candidate's collaboration skills, ability to handle constructive conflict, and capacity for consensus-building in a technical team or community setting.",
//       "answer": "SITUATION: During a university group project to build a web application, our team had a discussion about the choice of frontend framework. One member was very keen on Angular due to its structured approach, while I advocated for React given my proficiency and its component-based flexibility, and another suggested a simpler approach with vanilla JavaScript. TASK: Our task was to collectively choose a framework that would best suit the project's requirements, our team's collective skill set, and allow for efficient development and future scalability, despite our individual preferences. ACTION: I initiated a discussion where each team member presented the pros, cons, and their rationale for their preferred framework, focusing on how it aligned with our project goals. I actively listened to understand their perspectives and concerns. To move forward, I proposed a small 'proof-of-concept' phase where each of us would implement a core feature using our preferred framework. After a week, we reconvened, showcased our prototypes, and discussed the development experience, community support, learning curve for others, and long-term maintainability for our specific project. RESULT: Based on this practical evaluation and open discussion, we collectively agreed that React offered the best balance of development speed, community resources, and long-term maintainability for our team. This approach ensured everyone felt heard and contributed to a well-informed decision, leading to higher team morale and a successful project completion."
//     },
//     {
//       "question": "The job description mentions delivering new features and enhancements in response to feedback from customers, open-source communities, and internal teams. Describe a time you received critical feedback on your work. How did you process it, and what actions did you take as a result?",
//       "intention": "To assess the candidate's maturity, resilience, and ability to accept and act upon constructive criticism for continuous improvement, which is vital in a feedback-driven role.",
//       "answer": "SITUATION: As a Frontend Developer at Codeunia, one of my responsibilities was technical writing for the organization's GitHub. I submitted an article explaining a basic concept in web development. TASK: My senior reviewer provided critical feedback, pointing out areas where the article lacked clarity, was too verbose, and didn't fully adhere to the organization's technical writing style guide. RESULT: My initial reaction was to feel slightly defensive, but I quickly reminded myself that feedback is an opportunity for growth. ACTION: I took detailed notes during our discussion, asked clarifying questions to understand the specific points of improvement, and requested examples of what 'more concise' or 'clearer' looked like. I then dedicated time to revise the article thoroughly, focusing on restructuring sentences, removing jargon, and ensuring it directly addressed the intended audience based on the feedback. I also reviewed other successful articles on the organization's GitHub to internalize the style guide. RESULT: The revised article was significantly improved, receiving positive remarks for its clarity and conciseness. This experience taught me the invaluable lesson of actively seeking and objectively processing critical feedback, transforming it into actionable steps for continuous improvement, not just in writing but also in code."
//     }
//   ],
//   "skillsGap": [
//     {
//       "skill": "Azure Cloud Services",
//       "recommendation": "Gain fundamental and hands-on experience with core Azure services (compute, storage, networking, identity, developer tools) through Microsoft Learn modules and practical projects using a free Azure account."
//     },
//     {
//       "skill": "Azure CLI/PowerShell/Terraform",
//       "recommendation": "Develop proficiency in using and scripting with Azure CLI, Azure PowerShell, and Terraform for infrastructure as code and resource management within Azure. Practice deploying and managing resources programmatically."
//     },
//     {
//       "skill": "Advanced Backend Development & Tooling Architecture",
//       "recommendation": "Deepen expertise in backend development specifically for building robust, secure, and scalable automation tools, focusing on API design for tooling, error handling, logging, and security best practices relevant to cloud environments."
//     },
//     {
//       "skill": "Open-Source Contribution Workflow",
//       "recommendation": "Actively engage with open-source projects (e.g., Azure CLI GitHub repository) by reviewing code, participating in design discussions, submitting bug fixes, or proposing new features to understand community-driven development."
//     },
//     {
//       "skill": "DevOps & CI/CD on Azure",
//       "recommendation": "Learn about Azure DevOps, GitHub Actions, and other CI/CD practices to understand how tools are built, tested, and deployed automatically within the Azure ecosystem."
//     }
//   ],
//   "preparationPlan": [
//     {
//       "day": "Day 1-2",
//       "topic": "Azure Fundamentals & Account Setup",
//       "resources": "Complete Microsoft Learn: Azure Fundamentals (AZ-900 learning path). Set up a free Azure account. Explore the Azure Portal."
//     },
//     {
//       "day": "Day 3-5",
//       "topic": "Azure CLI & Azure PowerShell Basics",
//       "resources": "Install Azure CLI and Azure PowerShell. Complete Microsoft Learn modules on managing Azure resources with CLI and PowerShell. Practice deploying basic resources (Resource Group, VM, Web App) using both tools."
//     },
//     {
//       "day": "Day 6-8",
//       "topic": "Terraform on Azure & Infrastructure as Code (IaC)",
//       "resources": "Complete HashiCorp Learn: Get Started with Terraform on Azure. Understand HCL syntax. Practice deploying more complex Azure infrastructure (e.g., networking, database) using Terraform."
//     },
//     {
//       "day": "Day 9-11",
//       "topic": "Azure Developer Services & SDKs",
//       "resources": "Explore Azure Functions, Azure Logic Apps, and relevant Azure SDKs for JavaScript/Node.js. Build a simple Node.js application that interacts with an Azure service (e.g., Storage, Cosmos DB) using the SDK."
//     },
//     {
//       "day": "Day 12-14",
//       "topic": "Open-Source Contribution & Advanced Git",
//       "resources": "Review GitHub's guides on contributing to open source. Familiarize with Git branching strategies (GitFlow, GitHub Flow). Identify a 'good first issue' on an Azure-related open-source project (e.g., Azure CLI repo) and attempt a small contribution."
//     },
//     {
//       "day": "Day 15-16",
//       "topic": "Designing & Building a Simple Azure CLI Tool",
//       "resources": "Architect and implement a small Node.js-based CLI tool that leverages Azure CLI commands or Azure SDKs to automate a simple Azure management task. Focus on user experience, error handling, and command design (e.g., using `commander.js` or `yargs`)."
//     },
//     {
//       "day": "Day 17-18",
//       "topic": "DevOps & CI/CD for Azure Tools",
//       "resources": "Learn basics of Azure DevOps or GitHub Actions. Create a simple pipeline to automatically build and test your custom CLI tool or deploy an Azure resource."
//     },
//     {
//       "day": "Day 19-20",
//       "topic": "Security & Reliability in Azure Tools",
//       "resources": "Study Azure Security best practices (least privilege, secure coding). Understand concepts like managed identities and service principals. Research reliability patterns for cloud applications."
//     }
//   ]
// };

export default function Interview() {
  const [activeTab, setActiveTab] = useState('Technical questions');
  const { report } = useInterview();

  const renderContent = () => {
    if (activeTab === 'Technical questions') {
      return (
        <div className="content-list">
          <h2>Technical Questions</h2>
          {interviewData.technicalQuestions.map((q, idx) => (
            <div key={idx} className="info-card">
              <h4>Q: {q.question}</h4>
              <p className="intention"><strong>Intention:</strong> {q.intention}</p>
              <p className="answer"><strong>Suggested Answer:</strong> {q.answer}</p>
            </div>
          ))}
        </div>
      );
    } else if (activeTab === 'Behavioral questions') {
      return (
        <div className="content-list">
          <h2>Behavioral Questions</h2>
          {interviewData.behavioralQuestions.map((q, idx) => (
            <div key={idx} className="info-card">
              <h4>Q: {q.question}</h4>
              <p className="intention"><strong>Intention:</strong> {q.intention}</p>
              <p className="answer"><strong>Suggested Answer:</strong> {q.answer}</p>
            </div>
          ))}
        </div>
      );
    } else if (activeTab === 'Road Map') {
      return (
        <div className="content-list">
          <h2>Preparation Road Map</h2>
          {interviewData.preparationPlan.map((step, idx) => (
            <div key={idx} className="info-card">
              <h4>{step.day} - {step.topic}</h4>
              <p>{step.resources}</p>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <main className="interview-page">
      <div className="interview-container">
        {/* Left Sidebar */}
        <aside className="sidebar left-sidebar">
          <ul className="nav-menu">
            <li
              className={`nav-item ${activeTab === 'Technical questions' ? 'active' : ''}`}
              onClick={() => setActiveTab('Technical questions')}
            >
              Technical questions
            </li>
            <li
              className={`nav-item ${activeTab === 'Behavioral questions' ? 'active' : ''}`}
              onClick={() => setActiveTab('Behavioral questions')}
            >
              Behavioral questions
            </li>
            <li
              className={`nav-item ${activeTab === 'Road Map' ? 'active' : ''}`}
              onClick={() => setActiveTab('Road Map')}
            >
              Road Map
            </li>
          </ul>
        </aside>

        {/* Main Content Area */}
        <section className="main-content">
          {renderContent()}
        </section>

        {/* Right Sidebar */}
        <aside className="sidebar right-sidebar">
          <h3 className="section-title">Skill Gaps</h3>
          <div className="tags-container">
            {interviewData.skillsGap.map((gap, idx) => (
              <span key={idx} className="tag" title={gap.recommendation}>
                {gap.skill}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}