# swadeshi-sahayak-api-2

## Introduction
Swadeshi Sahayak AI is an open-source project developed by Tejas Shirnalkar. It serves as a demonstration of a multilingual AI assistant tailored to empower India's Generation X, rather than being a practical problem-solving tool for them.

## Project Mission
Swadeshi Sahayak AI strives to make technology more accessible and relevant to Generation X. We believe that by creating a seamless interface between AI and real-life challenges, we can empower this generation to embrace and harness the potential of AI, enabling them to navigate the digital age with confidence and ease.

## Architecture of the Project
This project uses custom MVC (mode-view-controller) architecture.
- **routes**: this part of the module  handles incoming user requests and defines API endpoints.
- **schemas**: In this part of the module we define schemas for MongoDB Documents.
- **controllers**: In this part of the modules we write all the business logic of applications
- **warehouse**: In this part we write all the necessary CRUD calls to the database which can be reused in controllers

