# Chat thead - React + TypeScript

App is available at: https://chat-thread.netlify.app

### Available Features
- Display comments in a nested thread structure
- Upvote and downvote comments
- Add replies to any comment
- Persist data
- Sort comments **[only the top most layer]**
- Reply collapse & expand

## Table of Contents
- [Setup](#setup)
- [Testing](#testing)
- [Folder Structure](#folder-structure)

## Setup

Follow the instructions below to setup and run:

- ### Clone the repository:

   ```bash
   git clone https://github.com/nisalV/chat-thread.git
   ```
- ### Navigate to app folder
  ```bash
   cd chat-thread
  ```
- ### Install packages
  ```bash
   npm install
  ```
- ### Run app
  ```bash
   npm start
   ```
- ### Build app
  ```bash
   npm build
  ```
## Testing

- ### To run test
  ```bash
   npm test
  ```
  - CommentInput.test - CommentInput component test cases
  - sortComments.test - To test comment sorting function
  - updateComments.test - To test update comment function
## Folder Structure
```bash
├── .github
│   └── workflows
│       └── ci.yml
├── public
│   └── favicon-32x32.png
└── src
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    └── vite-env.d.ts
    ├── assets
    │   ├── images
    │   │   ├── avatar.png
    │   │   └── fallback-user.png
    ├── common
    │   ├── commonStyles.ts
    │   └── values.ts
    ├── components
    │   ├── core
    │   │   ├── button
    │   │   │   ├── button.css
    │   │   │   └── index.tsx
    │   │   ├── image
    │   │   │   ├── image.css
    │   │   │   └── index.tsx
    │   │   ├── menuDrop
    │   │   │   ├── index.tsx
    │   │   │   └── menuDrop.css
    │   │   └── text
    │   │       ├── index.tsx
    │   │       └── textArea
    │   │           ├── index.tsx
    │   │           └── textArea.css
    │   ├── pages
    │   │   └── thread
    │   │       ├── index.tsx
    │   │       └── thread.css
    │   └── views
    │       ├── commentInput
    │       │   ├── commentInput.css
    │       │   └── index.tsx
    │       └── commentThread
    │           ├── CommentOptions.tsx
    │           ├── commentThread.css
    │           ├── CommentUser.tsx
    │           └── index.tsx
    ├── contexts
    │   └── commentContext.tsx
    ├── hooks
    │   └── commentHooks.tsx
    ├── types
    │   ├── comments.ts
    │   └── commentsUtils.ts
    └── utils
        ├── commentsUtils.ts
├── test
    ├── setup.ts
    ├── components
    │   └── CommentInput.test.tsx
    └── functions
        ├── sortComments.test.ts
        └── updateComment.test.ts
```