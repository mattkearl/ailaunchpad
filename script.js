document.addEventListener('DOMContentLoaded', function() {
    // Initialize typing animation
    initTypingAnimation();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize parallax effect
    initParallax();
    
    // Initialize launch button
    initLaunchButton();
    
    // Initialize prompt field
    initPromptField();
});

// Typing animation for the main heading
function initTypingAnimation() {
    const typingTextElement = document.querySelector('.typing-text');
    const cursorElement = document.querySelector('.cursor');
    
    if (!typingTextElement || !cursorElement) return;
    
    const typingSpeed = 60; // milliseconds per character (faster than before)
    const pauseBeforeRestart = 1800; // shorter pause before restarting animation
    
    // Array of different texts to type - more creative and engaging
    const textsToType = [
        "Turn your ideas into reality—no coding required",
        "Unleash your creativity without writing a single line of code",
        "From imagination to application in minutes, not months",
        "Build the next big thing with just your ideas and AI",
        "Create, launch, and deploy your digital dreams instantly",
        "Your brilliant idea deserves to exist—let's build it together",
        "Skip the coding bootcamp, start creating right now",
        "Transform concepts into code with the power of AI",
        "Where imagination meets implementation without barriers"
    ];
    
    let currentTextIndex = 0;
    let isDeleting = false;
    let charIndex = 0;
    let typingTimeout;
    
    function typeText() {
        // Clear any existing timeout
        clearTimeout(typingTimeout);
        
        const currentText = textsToType[currentTextIndex];
        
        if (isDeleting) {
            // Deleting text
            charIndex--;
            typingTextElement.textContent = currentText.substring(0, charIndex);
            
            if (charIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % textsToType.length;
                typingTimeout = setTimeout(typeText, pauseBeforeRestart / 3);
            } else {
                typingTimeout = setTimeout(typeText, typingSpeed / 2);
            }
        } else {
            // Typing text
            charIndex++;
            typingTextElement.textContent = currentText.substring(0, charIndex);
            
            if (charIndex === currentText.length) {
                isDeleting = true;
                typingTimeout = setTimeout(typeText, pauseBeforeRestart);
            } else {
                typingTimeout = setTimeout(typeText, typingSpeed);
            }
        }
    }
    
    // Start the typing animation
    typingTimeout = setTimeout(typeText, pauseBeforeRestart / 2);
}

// Scroll-based animations
function initScrollAnimations() {
    // Add fade-in class to elements that should animate on scroll
    const animatedElements = document.querySelectorAll('h2, h3, p, .step, .project-card, .tip-card, #launch-button');
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Create intersection observer for fade-in elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

// Enhanced parallax effect for backgrounds
function initParallax() {
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const bgImage = section.querySelector('.bg-image');
            if (!bgImage) return;
            
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Check if section is in viewport
            if (scrollY + window.innerHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
                // Calculate how far the user has scrolled into the section
                const scrollIntoSection = scrollY - sectionTop + window.innerHeight;
                const scrollPercentage = scrollIntoSection / (sectionHeight + window.innerHeight);
                
                // Apply parallax effect
                const yPos = (scrollPercentage * 50); // Move by 50px total
                bgImage.style.transform = `translateY(${yPos}px) scale(${1 + scrollPercentage * 0.1})`;
                
                // Adjust blur based on scroll position
                const blurValue = Math.min(scrollPercentage * 3, 3); // Max blur of 3px
                if (section.id !== 'header') { // Don't blur the header image
                    bgImage.style.filter = `blur(${blurValue}px)`;
                }
            }
        });
    });
    
    // Trigger initial parallax
    window.dispatchEvent(new Event('scroll'));
}

// Launch button functionality
function initLaunchButton() {
    const launchButton = document.getElementById('launch-button');
    
    if (!launchButton) return;
    
    // Add hover effect for the glow
    launchButton.addEventListener('mouseenter', () => {
        const buttonGlow = launchButton.querySelector('.button-glow');
        if (buttonGlow) {
            buttonGlow.style.opacity = '1';
        }
    });
    
    launchButton.addEventListener('mouseleave', () => {
        const buttonGlow = launchButton.querySelector('.button-glow');
        if (buttonGlow) {
            buttonGlow.style.opacity = '0';
        }
    });
    
    launchButton.addEventListener('click', function() {
        // The pre-filled prompt for bolt.new
        const prompt = `Product Requirements Document
---------------------------------------------
Context:
You are an expert project planner. Your role is to work with me, the idea owner, to create a custom "Product Requirements Document". This document describes your idea in simple terms so anyone can understand what you want to build (a game, website, or web app). It will be in markdown format. Keep it concise.

Instructions:
1. Ask the idea owner to explain their project idea to you in simple concise terms.
2. After they describe the project, if any details are missing, ask as few clarifying questions as possible (for example, "What inspired your idea?", "Who will use this project?", "What problem does it solve?").
3. Output a markdown file using the idea owner's input and the Sample PRD Headings as a guide.
4. Do not generate any code until the following documents have been created "Product Requirements Document", "User Interface Design Document", and "Software Requirements Specification Document", and the user has given permission to start.

Sample PRD Headings:
1. Elevator Pitch - Describe your idea in one paragraph.
2. Problem or Purpose - What problem does this project solve or why did you choose this idea?
3. Functional Requirements - List the main things the project does.
4. User Stories - Describe how a user will interact with the project.
5. Assumptions and Constraints - List any assumptions or limits for your project (for example, "a simple one-page app" or "only available on desktops").


User Interface Design Document
---------------------------------------------

Context:
You are an expert UI designer. Your role is to work with me, the idea owner, to create a custom "User Interface Design Document" in the most concise way possible. Feel free to assume as much as possible, but ask questions if needed. This document explains how your project will look and work so users can interact with it easily. It will be in markdown format. Keep it concise.

Inputs:
1. Product Requirements Document
2. User Chat

Instructions:
1. Review the provided product document. If one is not provided, ask for it.
2. Ask questions about the target users and/or user personas, and the overall design style (for example, "What should the first screen look like?" or "Do you have any favorite colors?").
3. Do not generate any code until the following documents have been created "Product Requirements Document", "User Interface Design Document", and "Software Requirements Specification Document", and the user has given permission to start.

Headings to be included:
- Overall Design Goals / Theme - (Describe the overall look and feel)
- Layout Structure - (How the main screens are arranged)
- Core Components - (Key elements like buttons, images, and text)
- Interaction Patterns - (How users navigate or interact with the project)
- Visual Design Elements & Color Scheme - (Details on color and style)
- Mobile, Web App, Desktop Considerations - (Specify which platform, if needed)
- Typography - (Describe text style and font choices in simple terms)
- Accessibility - (How to make the project easy to use for everyone)


Software Requirements Specification Document
---------------------------------------------

Context:
You are an expert software architect. Your role is to work with me, the idea owner, to create a custom Software Requirements Specification Document, but not to ask too many questions and keep things concise. This document lists what the project should do, guiding the development of your game, website, or web app. It will be in markdown format. Keep it concise.

Input:
1. Product Requirements Document
2. User Interface Design Document

Instructions:
1. Review the provided Product Requirements Document and User Interface Design Document. If they are not provided, ask for them or help the idea owner create one.
2. If possible, keep the tools or technologies as simple as possible.
3. Use free stock photos from unsplash if any images need to be included. If they images do not display because of a broken path, then find some that do.
4. Produce a simple markdown file (using headings and bullet points) that outlines the requirements using the exact format in the Headings to be included section. For simple projects, mark some detailed sections as optional.
5. Do not generate any code until the following documents have been created "Product Requirements Document", "User Interface Design Document", and "Software Requirements Specification Document", and the user has given permission to start.

Headings to be included:
- Purpose and Scope - (Brief introduction to what the project will do)
- System Design - (General idea of how the system will work)
- Architecture Pattern - (Basic structure of the project; if unsure, keep it simple)
- State Management - (How information is handled, e.g., tracking scores or user progress)
- Data Flow - (How information moves through the system)
- Tools & Languages - (Replaces 'Technical Stack'; list any preferred tools or coding languages, or leave blank)
- Authentication Process - (If applicable, e.g., simple login; otherwise, note as optional)
- Route Design - (If there are multiple screens or pages, describe how to navigate between them)
- API Design - (Optional for very simple projects)
- Database Design / ERD - (Optional; only include if your project requires data storage)
- Constraints and Assumptions - (Any limits or assumptions, such as "this is a simple one-user project")`;
        
        // Encode the prompt for URL
        const encodedPrompt = encodeURIComponent(prompt);
        
        // Create the bolt.new URL
        const boltUrl = `https://bolt.new/?prompt=${encodedPrompt}`;
        
        // Add launch animation
        launchButton.classList.add('launching');
        
        // Redirect after a short delay for animation
        setTimeout(() => {
            window.location.href = boltUrl;
        }, 800);
    });
}

// Function to initialize the prompt field
function initPromptField() {
    const promptField = document.getElementById('prompt-field');
    const copyButton = document.getElementById('copy-prompt-button');
    
    if (!promptField || !copyButton) return;
    
    // The pre-filled prompt for bolt.new - same as in the launch button
    const prompt = `Product Requirements Document
---------------------------------------------
Context:
You are an expert project planner. Your role is to work with me, the idea owner, to create a custom "Product Requirements Document". This document describes your idea in simple terms so anyone can understand what you want to build (a game, website, or web app). It will be in markdown format. Keep it concise.

Instructions:
1. Ask the idea owner to explain their project idea to you.
2. After they describe the project, if any details are missing, ask clarifying questions (for example, "What inspired your idea?", "Who will use this project?", "What problem does it solve?").
3. Ask to see if there are other projects online that are similar, and ask questions on how theirs is different and/or similar.
3. Output a markdown file using the idea owner's input and the Sample PRD Headings as a guide.
4. Do not generate any code until the following documents have been created "Product Requirements Document", "User Interface Design Document", and "Software Requirements Specification Document", and the user has given permission to start.

Sample PRD Headings:
1. Elevator Pitch - Describe your idea in one paragraph.
2. Who is this app for - Define the target users.
3. Problem or Purpose - What problem does this project solve or why did you choose this idea?
4. Functional Requirements - List the main things the project does.
5. User Stories - Describe how a user will interact with the project.
6. User Interface - Briefly describe how the app will look.
7. Assumptions and Constraints - List any assumptions or limits for your project (for example, "a simple one-page app" or "only available on desktops").


User Interface Design Document
---------------------------------------------

Context:
You are an expert UI designer. Your role is to work with me, the idea owner, to create a custom "User Interface Design Document". This document explains how your project will look and work so users can interact with it easily. It will be in markdown format. Keep it concise.

Inputs:
1. Product Requirements Document
2. User Chat

Instructions:
1. Review the provided product document. If one is not provided, ask for it.
2. Do not assume you know everything at this point. Ask clarifying questions about the design and other questions that you will need to know to build the project. Do not just rely on previous answers to build Be specific and ask for details.
3. Ask questions about the target users and/or user personas, and the overall design style (for example, "What should the first screen look like?" or "Do you have any favorite colors?").
4. Generate 3 natural language options for user interface designs that suit the idea.
5. Ask the idea owner which option they like best or what changes they would like.
6. Do not make any assumptions on what the user wants, unless they tell you to choose.Unless explicitly told to make decisions, continue to ask questions about the design, setup, approach, etc... until you have a clear understanding of the project.
7. Produce the final User Interface Design Document using basic markdown.
8. Do not generate any code until the following documents have been created "Product Requirements Document", "User Interface Design Document", and "Software Requirements Specification Document", and the user has given permission to start.

Headings to be included:
- Overall Design Goals / Theme - (Describe the overall look and feel)
- Layout Structure - (How the main screens are arranged)
- Core Components - (Key elements like buttons, images, and text)
- Interaction Patterns - (How users navigate or interact with the project)
- Visual Design Elements & Color Scheme - (Details on color and style)
- Mobile, Web App, Desktop Considerations - (Specify which platform, if needed)
- Typography - (Describe text style and font choices in simple terms)
- Accessibility - (How to make the project easy to use for everyone)


Software Requirements Specification Document
---------------------------------------------

Context:
You are an expert software architect. Your role is to work with me, the idea owner, to create a custom Software Requirements Specification Document. This document lists what the project should do, guiding the development of your game, website, or web app. It will be in markdown format. Keep it concise.

Input:
1. Product Requirements Document
2. User Interface Design Document

Instructions:
1. Review the provided Product Requirements Document and User Interface Design Document. If they are not provided, ask for them or help the idea owner create one.
2. Do not assume you know everything at this point. Ask clarifying questions about the project and other questions that you will need to know to build the project. Do not just rely on previous answers to build Be specific and ask for details.
2. Ask questions about your project details. For example, "What happens when a user clicks a button?" or "Which features are most important?" Also ask, "What tools or coding languages are you interested in, if any?"
4. If possible, keep the tools or technologies as simple as possible.
5. Make sure to follow best security practices.
6. Use free stock photos from unsplash if any images need to be included. If they images do not display because of a broken path, then find some that do.
7. Produce a simple markdown file (using headings and bullet points) that outlines the requirements using the exact format in the Headings to be included section. For simple projects, mark some detailed sections as optional.
8. Do not generate any code until the following documents have been created "Product Requirements Document", "User Interface Design Document", and "Software Requirements Specification Document", and the user has given permission to start.

Headings to be included:
- Purpose and Scope - (Brief introduction to what the project will do)
- System Design - (General idea of how the system will work)
- Architecture Pattern - (Basic structure of the project; if unsure, keep it simple)
- State Management - (How information is handled, e.g., tracking scores or user progress)
- Data Flow - (How information moves through the system)
- Tools & Languages - (Replaces 'Technical Stack'; list any preferred tools or coding languages, or leave blank)
- Authentication Process - (If applicable, e.g., simple login; otherwise, note as optional)
- Route Design - (If there are multiple screens or pages, describe how to navigate between them)
- API Design - (Optional for very simple projects)
- Database Design / ERD - (Optional; only include if your project requires data storage)
- Constraints and Assumptions - (Any limits or assumptions, such as "this is a simple one-user project")`;
    
    // Set the prompt text in the field
    promptField.textContent = prompt;
    
    // Add copy functionality
    copyButton.addEventListener('click', function() {
        // Create a temporary textarea element to copy from
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = prompt;
        document.body.appendChild(tempTextArea);
        
        // Select and copy the text
        tempTextArea.select();
        document.execCommand('copy');
        
        // Remove the temporary element
        document.body.removeChild(tempTextArea);
        
        // Show feedback that text was copied
        const originalText = copyButton.innerHTML;
        copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyButton.classList.add('copied');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            copyButton.innerHTML = originalText;
            copyButton.classList.remove('copied');
        }, 2000);
    });
}