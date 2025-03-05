# CLAUDE.md - InsightBoard Project Guidelines

## Project Commands
- **Frontend**: `cd frontend && npm run dev` - Run development server
- **Backend**: `cd backend && node index.js` - Start backend server
- **Lint**: `cd frontend && npm run lint` - Run ESLint on frontend
- **Build**: `cd frontend && npm run build` - Build for production
- **Preview**: `cd frontend && npm run preview` - Preview production build

## Code Style Guidelines
- **React**: Use functional components with hooks, avoid class components
- **Imports**: Group imports by: React, external libraries, internal components, styles
- **Formatting**: Use consistent 2-space indentation
- **Error Handling**: Use try/catch with specific error messages
- **State Management**: Use React hooks (useState, useEffect) for state
- **Props**: Destructure props in component parameters
- **Naming**: PascalCase for components, camelCase for variables/functions
- **API Calls**: Use async/await with try/catch blocks for API requests
- **Environment Variables**: Use import.meta.env for frontend, process.env for backend
- **Comments**: Add comments for complex logic and component purposes