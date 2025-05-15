
LinguaLens is a modern web application that provides seamless text translation powered by AI. Built with Next.js, React, and Genkit, it offers a user-friendly interface for translating text between various languages.

## Features

- **Multi-language Translation:** Translate text between a wide range of supported languages.
- **User-Friendly Interface:** Clean and intuitive design using ShadCN UI components and Tailwind CSS.
- **Responsive Design:** Adapts to different screen sizes for a consistent experience on desktop and mobile.
- **Copy to Clipboard:** Easily copy translated text with a single click.
- **Language Swap:** Quickly swap source and target languages.
- **AI-Powered:** Utilizes Google's Generative AI models via Genkit for accurate translations.

## Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/) (with App Router)
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [ShadCN UI](https://ui.shadcn.com/)
  - [Tailwind CSS](https://tailwindcss.com/)



## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Running the Application Locally

  **Clone the repository (if applicable):**
    If you're working outside Firebase Studio, clone the repository.

  **Install dependencies:**
    Navigate to the project directory and run:
    ```bash
    npm install
    # or
    yarn install
    ```



  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    This will start the Next.js development server, typically on `http://localhost:9002`.




## Project Structure

-   `src/app/`: Contains the Next.js pages and layout components.
-   `src/components/`: Contains reusable React components, including ShadCN UI components.
-   `src/ai/`: Contains Genkit related files.
    -   `src/ai/flows/`: Genkit flow definitions (e.g., `translate-text.ts`).
    -   `src/ai/genkit.ts`: Genkit global configuration.
    -   `src/ai/dev.ts`: Entry point for Genkit development server.
-   `src/lib/`: Utility functions and constants (e.g., `languages.ts`, `utils.ts`).
-   `src/hooks/`: Custom React hooks.
-   `public/`: Static assets.
-   `globals.css`: Global styles and Tailwind CSS theme configuration.
-   `tailwind.config.ts`: Tailwind CSS configuration.
-   `next.config.ts`: Next.js configuration.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please feel free to open an issue or submit a pull request.



