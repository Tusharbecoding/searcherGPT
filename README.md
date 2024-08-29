This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Project Enhancement: Chat and Search Functionalities

## Overview

This project focuses on enhancing the chat functionality by adding features such as message editing and local storage for chat sessions, as well as improving search functionalities with filter buttons for better user experience.

---

## Task - Enhance Chat Functionality

### Part 1 - Edit Messages

**Objective:** Allow users to edit their messages after sending.

1. **Message Structure Analysis:**

   - Identified how messages are currently structured and rendered.
   - Determined whether messages are stored in a state management system (like Redux or React's state) or manipulated directly in the DOM.

2. **UI Changes for Editing:**

   - Decided how the UI should change when a user clicks "edit" on a message.
   - Implemented a feature where the message text becomes an editable input field upon clicking the "edit" button similar to ChatGpt

3. **Toggle Editable State:**

   - Implemented functionality to toggle a message to an editable state when a user clicks to edit.

4. **Error Handling:**

   - Implemented error handling and fallback mechanisms.

5. **Update Message in State:**

   - On saving the edited message, updated the message in the chat state.
   - Ensured that the chat history and current chat session remain consistent.

6. **Testing:**
   - Tested the editing functionality across different scenarios:
     - Editing immediately after sending.
     - Editing after some time.
     - Performing multiple edits.
   - Ensured responsiveness and compatibility across different screen sizes.

**Methods Used:** React’s `useState` or `useReducer` for local state management.

---

### Part 2 - Local Storage

**Objective:** Store chat sessions in local storage to maintain chat history across sessions.

1. **Design Storage Structure:**

   - Decided how chat sessions will be stored in local storage.
   - Created a structure using an array of chat session objects, where each session contains metadata (like timestamps and participants) and a list of messages.

2. **Local Storage Functions:**

   - Set up functions to save, retrieve, and delete chat sessions from local storage using `localStorage.setItem()` and `localStorage.getItem()` methods.
   - Added checks to handle scenarios where local storage is unavailable or full.

3. **Error Handling:**

   - Implemented error handling and fallback mechanisms.
   - For example, if local storage fails, the application alerts the user or stores data temporarily in memory.

4. **Testing:**
   - Tested local storage functionality across different browsers and devices to ensure consistent behavior.

**Methods Used:** `localStorage`, `JSON.stringify`, and `JSON.parse` for converting data to and from strings.

---

## Task - Enhance Search Functionality

### Part 1 - Filters

**Objective:** Improve search functionality with the addition of filters to allow users to easily narrow down their search results.

1. **UI Design for Filters:**

   - Designed a user interface for filters, with icons or buttons for each file type (e.g., Docs, PDF, Images, etc.).

2. **Filter Logic:**

   - Created logic to update the search results when a user selects a filter.
   - Implemented client-side filtering to adjust the displayed results based on the selected file type.

3. **Error Handling:**

   - Added error handling and appropriate error messages to inform users of any issues.

4. **Testing:**
   - Tested the filter functionality to ensure it correctly updates the search results based on the selected file types.

**Methods Used:** UI components like buttons and labels, React Hooks for state management, and conditional rendering.

---

## Extra/Bonus Fix

### Enhanced Search Functionality with Search Bar

**Objective:** Improve search functionality to filter file names based on user input in the search bar.

1. **Search Bar Integration:**

   - Added a search bar component to the UI to allow users to input text for searching file names.

2. **Dynamic Filtering:**

   - Implemented logic to dynamically filter and display file names that contain the search query. This involves updating the list of displayed files in real-time as the user types in the search bar.

3. **Case-Insensitive Search:**

   - Ensured that the search functionality is case-insensitive, allowing for a more user-friendly search experience.

4. **Testing:**
   - Tested the search functionality across various scenarios to ensure accurate and responsive filtering:
     - Partial matches.
     - Different casing.
     - Special characters and spaces.

**Methods Used:** React Hooks (`useState`, `useEffect`) for managing search input and filtering logic.
