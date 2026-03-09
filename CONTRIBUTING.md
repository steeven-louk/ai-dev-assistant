# Contributing to AI Dev Assistant

Thank you for your interest in contributing to AI Dev Assistant! This document provides guidelines and instructions for contributing to the project.

---

## Code of Conduct

Please be respectful and constructive in all interactions. We follow principles of:
- **Inclusivity**: Welcome all contributors regardless of background
- **Respect**: Treat all community members with dignity
- **Constructive Feedback**: Focus on improvement, not criticism

---

## Getting Started

### 1. Fork the Repository

```bash
# On GitHub, click the "Fork" button
# Clone your fork locally
git clone https://github.com/YOUR_USERNAME/ai-dev-assistant.git
cd ai-dev-assistant

# Add upstream remote for keeping fork in sync
git remote add upstream https://github.com/steeven-louk/ai-dev-assistant.git
```

### 2. Create a Feature Branch

```bash
# Update from upstream
git fetch upstream
git merge upstream/main

# Create feature branch with descriptive name
git checkout -b feature/what-you-are-adding
# or for bug fixes:
git checkout -b fix/bug-description
```

### 3. Make Your Changes

Follow the code standards and guidelines (see below).

### 4. Commit Your Changes

```bash
# Use clear, descriptive commit messages
git commit -m "feat: add new feature

- Describe what you changed
- Explain why you made this change
- Reference any issues: fixes #123"
```

### 5. Push and Create Pull Request

```bash
git push origin feature/what-you-are-adding
# Go to GitHub and create a Pull Request
```

---

## Code Standards

### TypeScript/JavaScript

- **Strict TypeScript Mode**: All code must pass TypeScript strict mode
- **No `any` Types**: Avoid `any`; use proper type annotations
- **ESLint**: All code must pass ESLint checks
- **Formatting**: Follow existing code style

```typescript
// ✅ Good
interface User {
  id: number
  name: string
  email: string
}

const getUser = async (userId: number): Promise<User> => {
  // implementation
}

// ❌ Bad
const getUser = async (userId: any): Promise<any> => {
  // implementation
}
```

### React Components

- **Functional Components**: Use modern React hooks
- **Type Props**: Always type component props
- **Memoization**: Use `React.memo()` for performance-critical components
- **Hooks**: Use hooks instead of class components

```typescript
// ✅ Good
interface ButtonProps {
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = React.memo(({ onClick, disabled, children }) => (
  <button onClick={onClick} disabled={disabled}>
    {children}
  </button>
))

export default Button

// ❌ Bad
const Button = ({ onClick, disabled, children }) => (
  <button onClick={onClick} disabled={disabled}>
    {children}
  </button>
)
```

### Backend Code

- **Express Middleware**: Follow modern Express patterns
- **Error Handling**: Always include try-catch and proper error responses
- **Validation**: Validate all inputs
- **Logging**: Use appropriate logging levels

```typescript
// ✅ Good
app.post('/analyze', async (req: Request, res: Response) => {
  try {
    const { code } = req.body
    
    if (!code || code.length < 10) {
      return res.status(400).json({
        message: 'Code snippet too short',
        status: 400
      })
    }
    
    const result = await analyzeCode(code)
    res.json(result)
  } catch (error) {
    console.error('Analysis error:', error)
    res.status(500).json({
      message: 'Failed to analyze code',
      status: 500
    })
  }
})
```

### Documentation

- **JSDoc Comments**: Document functions, especially public APIs
- **README Sections**: Update README if adding new features
- **Type Comments**: Use `/** */` for complex types
- **Examples**: Provide usage examples where helpful

```typescript
/**
 * Analyzes code for complexity, security, and performance issues
 * 
 * @param code - The code snippet to analyze
 * @returns Promise containing analysis results with scores and issues
 * 
 * @example
 * const result = await analyzeCode('const x = 1;')
 * console.log(result.analysis.complexity_score.performance) // 0-100
 */
export async function analyzeCode(code: string): Promise<AnalyzeCodeResponse> {
  // implementation
}
```

---

## Before Submitting

### Checklist

- [ ] Branch created from latest `main`
- [ ] Code follows TypeScript strict mode
- [ ] No `any` types used
- [ ] ESLint passes: `pnpm lint` (frontend) or `npm run lint` (backend)
- [ ] Types are properly defined
- [ ] Components are typed (React)
- [ ] Error handling is complete
- [ ] No console errors (except necessary logs)
- [ ] New features have tests
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] No breaking changes (or clearly documented)
- [ ] Attribution license respected

### Running Tests

Frontend:
```bash
cd frontend
pnpm lint      # ESLint
pnpm tsc       # TypeScript compiler
pnpm build     # Build check
```

Backend:
```bash
cd backend
npm run lint   # ESLint
npm run build  # TypeScript build
npm test       # Unit tests
```

---

## Pull Request Guidelines

### PR Title Format

Use clear, descriptive titles:

```
feat: add new feature description
fix: fix specific bug
docs: update documentation
style: code formatting changes
refactor: code refactoring
perf: performance improvements
test: add or update tests
chore: maintenance tasks
```

### PR Description Template

Include:

```markdown
## Description
Brief summary of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Breaking change

## Related Issues
Fixes #123
Related to #456

## Changes Made
- What was changed
- Why it was changed
- How to test it

## Testing Done
- Manual testing
- Edge cases tested
- Browsers tested

## Screenshots/Videos (if applicable)
[Add any relevant screenshots or videos]

## Checklist
- [ ] Code follows style guidelines
- [ ] All checks pass
- [ ] Documentation updated
- [ ] No breaking changes
```

### Merge Process

Your PR will be reviewed for:
1. **Code Quality**: Follows standards and best practices
2. **Functionality**: Works as intended
3. **Tests**: Adequate test coverage
4. **Documentation**: Clear and helpful
5. **Attribution**: Respects the license

---

## Types of Contributions

### 🐛 Bug Reports

Found a bug? Create an issue with:
- Detailed description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment (OS, browser, versions)

### ✨ Feature Requests

Have an idea? Create an issue with:
- Clear use case
- Proposed solution (optional)
- Alternatives considered
- Additional context

### 📝 Documentation

Help improve docs:
- Fix typos and errors
- Add examples
- Clarify confusing sections
- Improve code comments
- Add new guides

### 🔧 Code Improvements

Ways to contribute code:
- Fix bugs
- Optimize performance
- Add tests
- Refactor code
- Add new features

### 🎨 Design/UX

Improve user experience:
- UI/UX improvements
- Accessibility enhancements
- Design suggestions
- User testing feedback

---

## Development Environment

### Frontend Development

```bash
cd frontend

# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Type checking
pnpm tsc --watch

# Lint
pnpm lint --fix
```

### Backend Development

```bash
cd backend

# Install dependencies
npm install

# Start dev server
npm run dev

# Type checking
npm run build

# Lint
npm run lint --fix
```

### Docker Development

```bash
# Build images
docker-compose build

# Run services
docker-compose up

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

---

## Commit Message Conventions

Use semantic commit messages:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type**: feat, fix, docs, style, refactor, perf, test, chore  
**Scope**: Optional (e.g., `frontend`, `backend`, `docker`)  
**Subject**: Imperative, present tense, no period  
**Body**: Detailed explanation (optional)  
**Footer**: Issue references (optional)

### Examples

```
feat(frontend): add code analysis results display

- Create metrics card component
- Implement refactor tab with improvements
- Add syntax highlighting with Prism.js

Fixes #42
```

```
fix(backend): handle empty code submission

Previously returned 500 error. Now returns 400
with appropriate error message.

Fixes #37
```

---

## Branches

### Branch Naming

```
feature/feature-name          # New features
fix/bug-description           # Bug fixes
docs/what-is-updated          # Documentation
refactor/what-changed         # Code refactoring
perf/improvement              # Performance improvements
style/formatting              # Code formatting
test/what-is-tested           # Tests
```

### Branch Conventions

- Create branches from latest `main`
- Keep branches focused (one feature per branch)
- Delete branch after merge
- Keep branch names lowercase with hyphens

---

## Review Process

### What Reviewers Look For

1. **Code Quality**
   - Follows project standards
   - Proper error handling
   - Type safety
   - No code duplication

2. **Functionality**
   - Works as described
   - Handles edge cases
   - No breaking changes
   - Backward compatible

3. **Tests & Documentation**
   - Tests included
   - Documentation updated
   - Examples provided
   - Clear comments

4. **Performance**
   - No performance regressions
   - Optimized where needed
   - Proper caching
   - Efficient algorithms

### Feedback Process

- Reviewers may request changes
- Respond to feedback constructively
- Make requested changes in new commits
- Request re-review when done
- Be patient - volunteers are reviewing

---

## Common Pitfalls to Avoid

❌ **Don't:**
- Use `any` types
- Ignore TypeScript errors
- Make multiple unrelated changes
- Forget to update documentation
- Submit code without testing
- Make breaking changes without discussion
- Ignore code review feedback
- Use `console.log()` for logging

✅ **Do:**
- Use proper types
- Fix all TypeScript errors
- Keep changes focused
- Update docs and tests
- Test thoroughly
- Discuss breaking changes first
- Engage with code review feedback
- Use appropriate logging levels

---

## Recognition

Contributors are recognized:
- In project README
- In release notes
- In GitHub contributors page
- Through public appreciation

---

## Questions?

- Check [README.md](./README.md) for project overview
- Check [GitHub Issues](../../issues) for similar questions
- See [Documentation](./frontend/) for detailed guides
- Open a GitHub Discussion

---

## License Reminder

By contributing, you agree that your contributions will be licensed under the project's Attribution License. See [LICENSE](./LICENSE) for details.

---

## Additional Resources

- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [How to Write a Good Commit Message](https://chris.beams.io/posts/git-commit/)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [React Best Practices](https://react.dev/learn)

---

Thank you for contributing to AI Dev Assistant! 🙏

**Made with ❤️ by Steeven Loukanou**
