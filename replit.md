# CrossTune - Music-Themed Crossword Game

## Overview

CrossTune is a music-themed crossword puzzle web application that combines traditional crossword solving with music elements. The application features a React frontend with a modern design system using shadcn/ui components, an Express.js backend with REST API endpoints, and PostgreSQL database integration through Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for development and production
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **Component Structure**: Modular component architecture with reusable UI components

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Error Handling**: Centralized error handling middleware
- **Logging**: Custom request/response logging for API endpoints
- **Development**: Hot reload with Vite integration in development mode

### Database Architecture
- **Database**: PostgreSQL (configured for Neon Database)
- **ORM**: Drizzle ORM with schema-first approach
- **Migrations**: Drizzle Kit for database migrations
- **Schema**: Located in shared directory for type safety across frontend and backend

## Key Components

### Game Components
1. **CrosswordGrid**: Interactive grid component handling cell selection, input, and keyboard navigation
2. **CluePanel**: Displays across and down clues with color-coded highlighting
3. **MusicPlayer**: Placeholder component for future music integration
4. **StartScreen**: Landing page with game initiation
5. **GameScreen**: Main game interface combining all game components

### Data Models
- **Puzzle**: Contains grid layout, clues, solutions, and metadata
- **GameState**: Tracks player progress, answers, and completion status
- **GridCell**: Individual cell data with letter, number, and state information

### Storage Layer
- **IStorage Interface**: Abstraction for data operations
- **MemStorage**: In-memory implementation for development/testing
- **Database Integration**: Ready for PostgreSQL connection via Drizzle

## Data Flow

1. **Game Initialization**: Frontend requests today's puzzle from `/api/puzzle/today`
2. **State Management**: Game state created/updated via `/api/game-state` endpoints
3. **Real-time Updates**: Player inputs update local state and sync with backend
4. **Progress Tracking**: Completion status and answers persisted to database
5. **Query Caching**: TanStack Query handles API response caching and synchronization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection for Neon
- **drizzle-orm & drizzle-zod**: Database ORM and schema validation
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React routing
- **express**: Backend web framework

### UI Dependencies
- **@radix-ui/***: Accessible UI primitive components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant handling
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type safety
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Asset Handling**: Static files served from build output

### Environment Configuration
- **Development**: Hot reload with Vite middleware integration
- **Production**: Compiled assets served statically with Express
- **Database**: Environment variable `DATABASE_URL` for connection

### Scalability Considerations
- **Stateless Backend**: Session-free API design for horizontal scaling
- **Database Connection**: Serverless-friendly with connection pooling
- **Asset Delivery**: Static file serving optimized for CDN integration
- **Caching Strategy**: Query-level caching on frontend, ready for backend caching