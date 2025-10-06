<div align="center">
  <h1 style="font-size: 48px; font-weight: bold;">AbroadGuide: AI-Powered Companion for<br>International Students Moving Abroad</h1>
</div>

<div align="center">
  <img src="documents/AbroadGuide_logo.png" alt="AbroadGuide" width="200">
</div>

**AbroadGuide** (Spring Boot version) is a backend-powered web application helping international students find housing, navigate local services, and receive university-specific guidance efficiently.

## Table of Contents
- [1. Motivation 🌎](#1-motivation-)
  - [Background](#background)
  - [Common Challenges Faced by International Students](#common-challenges-faced-by-international-students)
  - [Goals & Value Proposition](#goals--value-proposition)
- [2. Overview of AbroadGuide 🗺️](#2-overview-of-abroadguide-)
  - [Key Features](#key-features)
  - [Methodology](#methodology)
  - [Data](#data)
  - [Code Structure](#code-structure)
- [3. User Interface 💻](#3-user-interface-)
  - [Backend & API](#backend--api)
  - [Demo](#demo)
- [4. Evaluation & Testing 📊](#4-evaluation--testing-)
  - [Evaluation Framework and Results](#evaluation-framework-and-results)
  - [User Testing](#user-testing)
- [5. Differentiators ✨](#5-differentiators-)
  - [Comparison with Other Tools](#comparison-with-other-tools)
- [6. Future Work 🚀](#6-future-work)
- [7. Conclusion 🎓](#7-conclusion)
- [8. Tools Used 🛠️](#8-tools-used-)
- [9. References 📚](#9-references)
- [10. Acknowledgements/About Us 👤](#10-acknowledgementsabout-us)

---

## 1. Motivation 🌎

### Background
AbroadGuide was inspired by the common difficulties international students face when moving abroad. From understanding visa requirements to finding safe housing and navigating local services, many students struggle to find reliable guidance. AbroadGuide leverages **Spring Boot, MySQL, and REST APIs** to provide a scalable and secure solution.

<div align="center">
  <img src="documents/Problem_Statement_I.jpg">
</div>

The growth of international students worldwide highlights a demand for platforms like AbroadGuide. By providing real-time information and API-driven guidance, students can plan their move more confidently.

<div align="center">
  <img src="documents/Problem_Statement_II.jpg">
</div>

### Common Challenges Faced by International Students
- **Legal and Visa Requirements**: e.g., steps to obtain F-1 visa, maintaining status while abroad.
- **Housing**: Safe, affordable accommodation and lease understanding.
- **Cultural Differences**: Local norms, etiquette, and language barriers.
- **Logistics**: Bank accounts, health insurance, transportation, etc.

<div align="center">
  <img src="documents/Problem_Statement_III.jpg">
</div>

AbroadGuide bridges these gaps with housing APIs, local guidance endpoints, and university-specific support.

### Goals & Value Proposition
- Efficient, secure backend for international student services.
- Tailored housing and local guidance using APIs.
- Reliable legal and logistical advice.
- Empathetic, scalable, and trustworthy support.

<div align="center">
  <img src="documents/AbroadGuide_Intro.jpg">
</div>

---

## 2. Overview of AbroadGuide 🗺️

<div align="center">
  <img src="documents/Architecture_Diagram_24at.png">
</div>

### Key Features
- **Housing API**: Filtered search for safe, student-friendly housing.
- **Local Services API**: Nearby amenities, restaurants, transport, and cultural hotspots.
- **University Guidance API**: School-specific advice, legal info, and visa guidance.
- **Interactive Map Support**: Returns location-based data for front-end visualization.

### Methodology
- **Spring Boot Backend**: Provides RESTful APIs with JWT authentication.
- **Role-Based Access**: STUDENT, UNIVERSITY, SPONSOR, ADMIN.
- **Integration with APIs**: Google Maps, external housing sources.
- **RAG-Like Approach**: Using curated datasets for accurate and context-aware responses.

### Data
- **Housing Data**: From external property APIs.
- **Local Services**: Google Maps API for accurate location info.
- **University Guides**: Curated legal and logistical info from official sources.

### Code Structure
