import { CSRole } from '../types';

export const CS_ROLES: CSRole[] = [
  {
    id: 'full-stack-engineer',
    title: 'Full Stack Software Engineer',
    category: 'Software Engineering',
    shortDescription: 'Master end-to-end web architecture from React frontends to scalable Node.js/PostgreSQL backends.',
    fullOverview: 'Full stack engineers bridge client-side user experience with robust server infrastructure, database models, and cloud deployments.',
    difficulty: 'Beginner Friendly',
    estTimeToMaster: '6 - 9 Months',
    salaryRange: '$95,000 - $175,000',
    topCompanyChannels: ['Google Developers', 'Meta Open Source', 'freeCodeCamp', 'Traversy Media'],
    techStack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'GraphQL', 'Tailwind CSS'],
    steps: [
      {
        id: 'fs-1',
        stepNumber: 1,
        phase: 'Foundations',
        title: 'Modern JavaScript & TypeScript Mastery',
        duration: '12:45',
        durationSec: 765,
        youtubeUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80',
        description: 'Deep dive into asynchronous programming, event loop mechanics, closures, and strict type safety.',
        keyConcepts: ['Event Loop & Promises', 'TypeScript Generics', 'DOM Manipulation', 'ES6+ Modules'],
        geminiPrompts: {
          cheatsheetPrompt: 'Generate a high-density TypeScript & Modern ES6+ syntax cheat sheet covering Async/Await, Generics, Utility Types, and Closures with concise code snippets.',
          projectPrompt: 'Suggest 3 real-world full-stack portfolio mini-projects to practice modern TypeScript and REST APIs with step-by-step milestones.',
          interviewPrompt: 'Give me 5 senior-level technical interview questions on JavaScript Event Loop, microtasks vs macrotasks, and closures with model answers.',
          edgeCasePrompt: 'Explain common memory leaks in JavaScript applications, event listener teardown, and how to debug them using Chrome DevTools.'
        }
      },
      {
        id: 'fs-2',
        stepNumber: 2,
        phase: 'Core Engineering',
        title: 'React 19 & Component Architecture',
        duration: '18:20',
        durationSec: 1100,
        youtubeUrl: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
        description: 'Build composable UI hierarchies, custom hooks, state synchronization, and render optimization.',
        keyConcepts: ['React Reconciliation', 'Custom Hooks', 'Server Components', 'State Normalization'],
        geminiPrompts: {
          cheatsheetPrompt: 'Create a comprehensive React 19 Hooks and Component Architecture cheat sheet covering useEffect cleanup, useMemo, useCallback, and Context patterns.',
          projectPrompt: 'Provide a specification for building a real-time collaborative Kanban board with optimistic UI updates in React and TypeScript.',
          interviewPrompt: 'What is the Virtual DOM and Fiber reconciler? Explain how React schedules and batches state updates in technical detail.',
          edgeCasePrompt: 'What causes infinite re-render loops in React and how do you ensure referential equality in custom hooks?'
        }
      },
      {
        id: 'fs-3',
        stepNumber: 3,
        phase: 'Advanced Architecture',
        title: 'Node.js, Express & Distributed APIs',
        duration: '22:15',
        durationSec: 1335,
        youtubeUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        description: 'Design secure RESTful & GraphQL microservices, JWT authentication, rate limiting, and database ORMs.',
        keyConcepts: ['Middleware Pipelines', 'Connection Pooling', 'JWT & OAuth2 Security', 'REST vs GraphQL'],
        geminiPrompts: {
          cheatsheetPrompt: 'Generate an Express.js & Node.js backend architecture cheat sheet including error handling middlewares, JWT auth flow, and database connection pooling.',
          projectPrompt: 'Design an end-to-end API gateway with rate-limiting, CORS configuration, and role-based access control (RBAC).',
          interviewPrompt: 'How does Node.js handle high concurrency despite being single-threaded? Explain libuv threadpool and non-blocking I/O.',
          edgeCasePrompt: 'Explain how to prevent SQL injection, prototype pollution, and timing attacks in Node.js backend services.'
        }
      },
      {
        id: 'fs-4',
        stepNumber: 4,
        phase: 'Production & Scale',
        title: 'PostgreSQL Relational Design & Indexing',
        duration: '15:30',
        durationSec: 930,
        youtubeUrl: 'https://www.youtube.com/watch?v=qw--VYLpxG4',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
        description: 'Relational data modeling, ACID transactions, B-Tree indexes, and query performance tuning.',
        keyConcepts: ['ACID Compliance', 'B-Tree & GIN Indexing', 'Database Normalization', 'EXPLAIN ANALYZE'],
        geminiPrompts: {
          cheatsheetPrompt: 'Provide an SQL & PostgreSQL performance cheat sheet featuring JOIN types, indexing strategies (B-Tree, Partial, Composite), and transaction isolation levels.',
          projectPrompt: 'Design a relational schema for an e-commerce platform with inventory race condition protection using SELECT FOR UPDATE.',
          interviewPrompt: 'Explain database transaction isolation levels (Read Committed vs Serializable) and the anomalies they prevent (Phantom Reads, Dirty Reads).',
          edgeCasePrompt: 'How do N+1 query problems occur in ORMs and how do you resolve them with batch loading or SQL joins?'
        }
      }
    ]
  },
  {
    id: 'frontend-engineer',
    title: 'Frontend Specialist',
    category: 'Software Engineering',
    shortDescription: 'Specialize in high-performance browser rendering, accessible design systems, and modern web applications.',
    fullOverview: 'Frontend specialists craft fluid, accessible, and ultra-responsive digital interfaces with deep knowledge of browser rendering engines.',
    difficulty: 'Beginner Friendly',
    estTimeToMaster: '4 - 7 Months',
    salaryRange: '$90,000 - $160,000',
    topCompanyChannels: ['Google Chrome Developers', 'Vercel', 'Web Dev Simplified'],
    techStack: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Web Vitals', 'WAI-ARIA', 'Vitest'],
    steps: [
      {
        id: 'fe-1',
        stepNumber: 1,
        phase: 'Foundations',
        title: 'Semantic HTML, CSS Architecture & Flexbox/Grid',
        duration: '11:20',
        durationSec: 680,
        youtubeUrl: 'https://www.youtube.com/watch?v=mU6anWqZJcc',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
        description: 'Master modern CSS layout algorithms, stacking contexts, specificity, and accessible markup.',
        keyConcepts: ['CSS Stacking Context', 'Flexbox & CSS Grid', 'Fluid Typography', 'Accessibility (a11y)'],
        geminiPrompts: {
          cheatsheetPrompt: 'Generate a CSS Grid & Flexbox alignment reference cheat sheet with visual ASCII layouts and shorthand property values.',
          projectPrompt: 'Provide 3 UI layout challenges to test deep CSS Grid and responsive container queries without media query bloat.',
          interviewPrompt: 'Explain how the browser renders a web page: DOM, CSSOM, Render Tree, Layout, Paint, and Composite steps.',
          edgeCasePrompt: 'How do you prevent Cumulative Layout Shift (CLS) and optimize Largest Contentful Paint (LCP) in production?'
        }
      },
      {
        id: 'fe-2',
        stepNumber: 2,
        phase: 'Core Engineering',
        title: 'Next.js App Router & Server Side Rendering',
        duration: '24:40',
        durationSec: 1480,
        youtubeUrl: 'https://www.youtube.com/watch?v=wm5gMKuwSYk',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        description: 'Server Components, streaming SSR, dynamic routing, caching semantics, and hydration patterns.',
        keyConcepts: ['React Server Components', 'Incremental Static Regeneration', 'Server Actions', 'Route Handlers'],
        geminiPrompts: {
          cheatsheetPrompt: 'Create a Next.js App Router cheat sheet detailing file conventions, caching behavior (force-cache, no-store), and Server Actions.',
          projectPrompt: 'Build a high-performance content platform with server-side rendered markdown, image optimization, and dynamic OG images.',
          interviewPrompt: 'Compare SSR, SSG, ISR, and Client-side Rendering. When would you choose each strategy for an enterprise web app?',
          edgeCasePrompt: 'How do you troubleshoot hydration mismatch errors between server-rendered HTML and client React trees?'
        }
      }
    ]
  },
  {
    id: 'backend-distributed-engineer',
    title: 'Backend & Distributed Systems',
    category: 'Software Engineering',
    shortDescription: 'Build fault-tolerant microservices, message queues, and high-throughput low-latency APIs.',
    fullOverview: 'Backend engineers architect distributed consensus systems, caching layers, and high-volume data pipelines that power modern tech giants.',
    difficulty: 'Intermediate',
    estTimeToMaster: '8 - 12 Months',
    salaryRange: '$110,000 - $195,000',
    topCompanyChannels: ['AWS Developers', 'Google TechTalks', 'Hussein Nasser', 'ByteByteGo'],
    techStack: ['Go / Golang', 'gRPC', 'Kafka', 'Redis', 'PostgreSQL', 'Docker', 'Kubernetes'],
    steps: [
      {
        id: 'be-1',
        stepNumber: 1,
        phase: 'Foundations',
        title: 'Go (Golang) Concurrency & Goroutines',
        duration: '16:10',
        durationSec: 970,
        youtubeUrl: 'https://www.youtube.com/watch?v=un6ZyFkqFJU',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
        description: 'Go channels, CSP concurrency model, mutex locks, and high-throughput networking services.',
        keyConcepts: ['Goroutines & Channels', 'Mutex & WaitGroups', 'Memory Allocation', 'Interfaces & Structs'],
        geminiPrompts: {
          cheatsheetPrompt: 'Generate a comprehensive Go concurrency cheat sheet detailing buffered vs unbuffered channels, select statements, and sync package primitives.',
          projectPrompt: 'Build a high-concurrency worker pool in Go that processes thousands of background tasks with rate limiting and graceful shutdown.',
          interviewPrompt: 'Explain how the Go runtime scheduler (GMP model) maps Goroutines to OS threads efficiently.',
          edgeCasePrompt: 'How do you detect and prevent race conditions and goroutine leaks in production Go applications?'
        }
      },
      {
        id: 'be-2',
        stepNumber: 2,
        phase: 'Advanced Architecture',
        title: 'Event-Driven Architectures with Kafka & Redis',
        duration: '20:30',
        durationSec: 1230,
        youtubeUrl: 'https://www.youtube.com/watch?v=R873BlNVUB4',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        description: 'Asynchronous event streaming, partition keys, consumer groups, and in-memory cache eviction policies.',
        keyConcepts: ['Kafka Partitioning', 'Pub/Sub Patterns', 'Cache Invalidation (Cache-Aside)', 'Idempotency'],
        geminiPrompts: {
          cheatsheetPrompt: 'Create an Apache Kafka & Redis caching architecture cheat sheet covering consumer lag, partition replication, and cache stamping protection.',
          projectPrompt: 'Architect an asynchronous payment processing pipeline with idempotent event consumers and dead-letter queues.',
          interviewPrompt: 'Explain the CAP Theorem and PACELC theorem. How do you design systems for eventual consistency across distributed databases?',
          edgeCasePrompt: 'How do you prevent the Cache Stampede (Thundering Herd) problem when high-traffic cache keys expire?'
        }
      }
    ]
  },
  {
    id: 'ai-deep-learning-engineer',
    title: 'AI & Deep Learning Engineer',
    category: 'AI & Data Science',
    shortDescription: 'Design neural networks, transformer architectures, and fine-tune foundation models with PyTorch.',
    fullOverview: 'AI engineers build machine learning models, train neural representations, and implement generative AI pipelines for enterprise intelligence.',
    difficulty: 'Advanced',
    estTimeToMaster: '9 - 14 Months',
    salaryRange: '$125,000 - $220,000',
    topCompanyChannels: ['Google DeepMind', 'Andrej Karpathy', 'MIT OpenCourseWare', 'Stanford Online'],
    techStack: ['Python', 'PyTorch', 'Transformers', 'CUDA', 'LangChain', 'Vector DBs', 'Gemini API'],
    steps: [
      {
        id: 'ai-1',
        stepNumber: 1,
        phase: 'Foundations',
        title: 'Neural Networks & Backpropagation from Scratch',
        duration: '26:50',
        durationSec: 1610,
        youtubeUrl: 'https://www.youtube.com/watch?v=VMj-3S1tku0',
        channel: '3Blue1Brown',
        thumbnailUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
        description: 'Mathematical intuition behind gradient descent, cost functions, chain rule of calculus, and activation functions.',
        keyConcepts: ['Gradient Descent', 'Backpropagation Calculus', 'Activation Functions (ReLU/GELU)', 'Loss Surfaces'],
        geminiPrompts: {
          cheatsheetPrompt: 'Generate a mathematical and code cheat sheet for Neural Network Backpropagation showing derivative calculations and weight updates in Python/NumPy.',
          projectPrompt: 'Build a multi-layer perceptron from scratch in raw Python without ML libraries to classify handwritten digits.',
          interviewPrompt: 'Explain vanishing and exploding gradients in deep networks. What techniques (Batch Normalization, Residual Connections) resolve them?',
          edgeCasePrompt: 'How do you diagnose overfitting versus underfitting and configure early stopping with validation loss monitoring?'
        }
      },
      {
        id: 'ai-2',
        stepNumber: 2,
        phase: 'Advanced Architecture',
        title: 'Transformer Architecture & Self-Attention Mechanics',
        duration: '31:10',
        durationSec: 1870,
        youtubeUrl: 'https://www.youtube.com/watch?v=kCc8FmEb1nY',
        channel: 'Andrej Karpathy',
        thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
        description: 'Scaled dot-product attention, multi-head projections, positional encodings, and autoregressive language generation.',
        keyConcepts: ['Self-Attention Formula', 'Multi-Head Attention', 'Positional Encoding', 'Transformer Decoders'],
        geminiPrompts: {
          cheatsheetPrompt: 'Create a Transformer Architecture cheat sheet detailing Query/Key/Value matrix multiplication, Softmax scaling, and causal masking.',
          projectPrompt: 'Implement a character-level GPT transformer in PyTorch and train it on Shakespeare text.',
          interviewPrompt: 'Why does the Transformer replace Recurrent Neural Networks (RNNs) for sequential modeling? Explain parallelization during training.',
          edgeCasePrompt: 'How does KV Caching optimize autoregressive token generation speed during LLM inference?'
        }
      }
    ]
  },
  {
    id: 'mlops-engineer',
    title: 'Machine Learning Operations (MLOps)',
    category: 'AI & Data Science',
    shortDescription: 'Deploy, monitor, and scale machine learning models into production with CI/CD for data.',
    fullOverview: 'MLOps engineers automate model training pipelines, drift detection, feature stores, and high-throughput GPU inference clusters.',
    difficulty: 'Intermediate',
    estTimeToMaster: '7 - 10 Months',
    salaryRange: '$115,000 - $190,000',
    topCompanyChannels: ['Google Cloud Tech', 'Weights & Biases', 'DataTalksClub'],
    techStack: ['Python', 'Docker', 'Kubeflow', 'MLflow', 'Triton Inference', 'FastAPI', 'Prometheus'],
    steps: [
      {
        id: 'mlops-1',
        stepNumber: 1,
        phase: 'Core Engineering',
        title: 'Model Packaging, FastAPI & Containerization',
        duration: '14:25',
        durationSec: 865,
        youtubeUrl: 'https://www.youtube.com/watch?v=0sOvCWFmrtA',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80',
        description: 'Exporting ONNX models, wrapping neural weights into async FastAPI endpoints, and multi-stage Docker builds.',
        keyConcepts: ['ONNX Runtime', 'FastAPI Async Handlers', 'Docker Multi-stage Builds', 'Batch Inference'],
        geminiPrompts: {
          cheatsheetPrompt: 'Generate an MLOps deployment cheat sheet covering Dockerfiles for PyTorch/CUDA, FastAPI inference endpoints, and health probes.',
          projectPrompt: 'Build a production-ready model inference server with dynamic request batching and Prometheus latency metrics.',
          interviewPrompt: 'What is data drift versus concept drift? How do you set up automated re-training triggers in production pipelines?',
          edgeCasePrompt: 'How do you optimize GPU memory allocation and prevent Out-Of-Memory (OOM) crashes during concurrent model inference?'
        }
      }
    ]
  },
  {
    id: 'ui-ux-design-systems',
    title: 'UI/UX & Web Design Architect',
    category: 'Design & Creative Tech',
    shortDescription: 'Bridge visual aesthetics and code with Figma design systems, micro-interactions, and spatial mathematics.',
    fullOverview: 'Design engineers combine UX research, typography, optical geometry, and frontend code to deliver breathtaking digital experiences.',
    difficulty: 'Beginner Friendly',
    estTimeToMaster: '5 - 8 Months',
    salaryRange: '$85,000 - $155,000',
    topCompanyChannels: ['Figma', 'Flux Academy', 'DesignCourse'],
    techStack: ['Figma', 'Tailwind CSS', 'CSS Motion', 'Radix UI', 'Tokens Studio', 'Design Tokens'],
    steps: [
      {
        id: 'ui-1',
        stepNumber: 1,
        phase: 'Foundations',
        title: 'Design Systems, Optical Spacing & Typography Rules',
        duration: '13:40',
        durationSec: 820,
        youtubeUrl: 'https://www.youtube.com/watch?v=JW36yd6w9Ew',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
        description: 'Mathematical typographic scales, WCAG AA contrast, design token architectures, and negative space rhythm.',
        keyConcepts: ['Design Token Architecture', 'Typographic Scale Ratio', 'WCAG AA Accessibility', 'Component Variant Sets'],
        geminiPrompts: {
          cheatsheetPrompt: 'Create a Design Systems & UI Architecture cheat sheet detailing 8pt grid rules, typographic scaling formulas, and semantic color naming tokens.',
          projectPrompt: 'Design a complete design system in Figma with color palettes, button states, modal primitives, and translate it to Tailwind CSS config.',
          interviewPrompt: 'How do you balance aesthetic delight with strict accessibility guidelines (WCAG 2.1 AA)?',
          edgeCasePrompt: 'What are the rules for mathematically correct nested border radii (Outer Radius - Padding = Inner Radius)?'
        }
      }
    ]
  },
  {
    id: 'game-developer-programmer',
    title: 'Game Developer & Gameplay Programmer',
    category: 'Design & Creative Tech',
    shortDescription: 'Develop 2D/3D game loops, physics simulations, shader graphics, and multiplayer netcode.',
    fullOverview: 'Game programmers craft interactive virtual worlds using C++, C#, game engines, and real-time linear algebra transformations.',
    difficulty: 'Intermediate',
    estTimeToMaster: '8 - 14 Months',
    salaryRange: '$85,000 - $165,000',
    topCompanyChannels: ['Unity', 'Unreal Engine', 'Brackeys Archive', 'Freya Holmér'],
    techStack: ['C#', 'C++', 'Unity', 'Unreal Engine 5', 'HLSL Shaders', 'Three.js', 'Physics Engines'],
    steps: [
      {
        id: 'game-1',
        stepNumber: 1,
        phase: 'Foundations',
        title: 'Game Loop, Vector Math & 2D/3D Physics',
        duration: '19:10',
        durationSec: 1150,
        youtubeUrl: 'https://www.youtube.com/watch?v=gB1F9G0JXOo',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
        description: 'Delta time calculations, dot products, cross products, collision detection (AABB/SAT), and rigid bodies.',
        keyConcepts: ['Delta Time Smoothing', 'Dot & Cross Products', 'Collision Resolution (AABB)', 'Finite State Machines'],
        geminiPrompts: {
          cheatsheetPrompt: 'Generate a Game Math & Physics cheat sheet covering Vector operations, Quaternion rotations, Lerp/Slerp interpolation, and Raycasting.',
          projectPrompt: 'Program a 2D physics-based puzzle platformer in Unity/Godot featuring rigid body interactions and state machine character controls.',
          interviewPrompt: 'Explain how the game loop decouples rendering FPS from fixed physics timesteps to prevent jitter.',
          edgeCasePrompt: 'How do you prevent tunneling (fast-moving objects passing through walls) in discrete collision detection systems?'
        }
      }
    ]
  },
  {
    id: '3d-animator-tech-artist',
    title: '3D Animator & Technical Artist',
    category: 'Design & Creative Tech',
    shortDescription: 'Master 3D geometry modeling, character rigging, UV unwrapping, and real-time graphics shading.',
    fullOverview: 'Technical artists connect creative vision with runtime engine performance, crafting character rigs, particle FX, and custom shaders.',
    difficulty: 'Intermediate',
    estTimeToMaster: '6 - 12 Months',
    salaryRange: '$80,000 - $150,000',
    topCompanyChannels: ['Blender Foundation', 'Blender Guru', 'CG Geek'],
    techStack: ['Blender', 'Maya', 'Substance Painter', 'GLSL/HLSL', 'Unreal Engine', 'Three.js'],
    steps: [
      {
        id: '3d-1',
        stepNumber: 1,
        phase: 'Foundations',
        title: 'Blender 3D Modeling, Topology & Rigging',
        duration: '21:05',
        durationSec: 1265,
        youtubeUrl: 'https://www.youtube.com/watch?v=nIoXOplUvAw',
        channel: 'Blender Guru',
        thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        description: 'Polygon topology flow, procedural node shaders, armature rigging, weight painting, and WebGL asset optimization.',
        keyConcepts: ['Quad Topology Flow', 'PBR Material Shaders', 'Skeletal Rigging & Inverse Kinematics', 'GLTF/GLB Export'],
        geminiPrompts: {
          cheatsheetPrompt: 'Create a 3D Modeling & Shader cheat sheet detailing PBR channels (Roughness, Metallic, Normal Maps), topology quad flow, and shortcut hotkeys.',
          projectPrompt: 'Model, texture, and rig a stylized low-poly game asset and export an optimized GLTF model with animations for Three.js.',
          interviewPrompt: 'What is PBR (Physically Based Rendering) and how does the Fresnel effect govern light reflectance at grazing angles?',
          edgeCasePrompt: 'How do non-manifold geometry, inverted face normals, and unapplied transforms break skeletal rigging animations?'
        }
      }
    ]
  },
  {
    id: 'cybersecurity-penetration-tester',
    title: 'Cybersecurity & Ethical Hacker',
    category: 'Cloud & Cybersecurity',
    shortDescription: 'Defend systems and uncover vulnerabilities with penetration testing, network auditing, and cryptography.',
    fullOverview: 'Security professionals audit attack surfaces, perform red/blue team simulations, reverse-engineer malware, and harden cloud perimeters.',
    difficulty: 'Advanced',
    estTimeToMaster: '8 - 14 Months',
    salaryRange: '$105,000 - $185,000',
    topCompanyChannels: ['DEF CON Conference', 'Computerphile', 'NetworkChuck', 'LiveOverflow'],
    techStack: ['Linux', 'Wireshark', 'Burp Suite', 'Metasploit', 'Python', 'Cryptography', 'OWASP Top 10'],
    steps: [
      {
        id: 'sec-1',
        stepNumber: 1,
        phase: 'Foundations',
        title: 'OWASP Top 10 Web Vulnerabilities & Exploitation',
        duration: '17:35',
        durationSec: 1055,
        youtubeUrl: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
        description: 'Hands-on breakdown of SQL injection, Cross-Site Scripting (XSS), CSRF, SSRF, and broken access controls.',
        keyConcepts: ['SQL Injection (Blind/Time-based)', 'Stored vs Reflected XSS', 'Server-Side Request Forgery (SSRF)', 'Content Security Policy (CSP)'],
        geminiPrompts: {
          cheatsheetPrompt: 'Generate an OWASP Top 10 security cheat sheet detailing vulnerability root causes, payload signatures, and code remediation patterns.',
          projectPrompt: 'Set up a secure lab environment (DVWA/Juice Shop) and perform authenticated penetration testing with full vulnerability reports.',
          interviewPrompt: 'Explain how Public Key Cryptography (RSA / Diffie-Hellman) establishes secure TLS handshakes across untrusted networks.',
          edgeCasePrompt: 'How do you safeguard APIs against Server-Side Request Forgery (SSRF) when fetching external metadata or webhooks?'
        }
      }
    ]
  },
  {
    id: 'cloud-devops-engineer',
    title: 'Cloud Architect & DevOps Specialist',
    category: 'Cloud & Cybersecurity',
    shortDescription: 'Automate infrastructure as code, continuous integration/delivery, and multi-region cloud resilience.',
    fullOverview: 'DevOps engineers orchestrate Kubernetes clusters, Terraform configurations, and zero-downtime deployment pipelines.',
    difficulty: 'Intermediate',
    estTimeToMaster: '7 - 12 Months',
    salaryRange: '$110,000 - $190,000',
    topCompanyChannels: ['AWS Developers', 'Google Cloud Tech', 'TechWorld with Nana'],
    techStack: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Linux'],
    steps: [
      {
        id: 'cloud-1',
        stepNumber: 1,
        phase: 'Foundations',
        title: 'Docker & Kubernetes Container Orchestration',
        duration: '23:45',
        durationSec: 1425,
        youtubeUrl: 'https://www.youtube.com/watch?v=d6WC5n9G_sM',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80',
        description: 'Pods, Deployments, Services, Ingress controllers, Helm charts, and declarative YAML manifests.',
        keyConcepts: ['Pod Lifecycle & Probes', 'Ingress & Service Routing', 'StatefulSets vs Deployments', 'ConfigMaps & Secrets'],
        geminiPrompts: {
          cheatsheetPrompt: 'Create a Kubernetes CLI (`kubectl`) and manifest cheat sheet detailing Pod deployments, Ingress routing, and Horizontal Pod Autoscaling.',
          projectPrompt: 'Build a production CI/CD pipeline in GitHub Actions that builds Docker images, runs automated tests, and deploys to a Kubernetes cluster.',
          interviewPrompt: 'Explain how Kubernetes handles zero-downtime rolling updates and graceful container termination (SIGTERM vs SIGKILL).',
          edgeCasePrompt: 'How do you debug CrashLoopBackOff states in Kubernetes pods and resolve persistent volume mount lockouts?'
        }
      }
    ]
  },
  {
    id: 'data-engineer',
    title: 'Data Engineer & Big Data Architect',
    category: 'AI & Data Science',
    shortDescription: 'Build high-volume ETL pipelines, data warehouses, and streaming analytics pipelines.',
    fullOverview: 'Data engineers design the foundational pipelines, Lakehouses, and streaming architectures powering business intelligence and ML models.',
    difficulty: 'Intermediate',
    estTimeToMaster: '8 - 12 Months',
    salaryRange: '$110,000 - $185,000',
    topCompanyChannels: ['Apache Foundation', 'Databricks', 'Seattle Data Guy'],
    techStack: ['Python', 'SQL', 'Apache Spark', 'Snowflake', 'dbt', 'Airflow', 'Kafka'],
    steps: [
      {
        id: 'de-1',
        stepNumber: 1,
        phase: 'Core Engineering',
        title: 'Apache Spark, Distributed Compute & Data Lakehouses',
        duration: '18:50',
        durationSec: 1130,
        youtubeUrl: 'https://www.youtube.com/watch?v=_C8kWso4ne4',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        description: 'Resilient Distributed Datasets (RDDs), Spark DataFrames, partitioning strategies, and Delta Lake ACID transactions.',
        keyConcepts: ['Distributed Shuffling & Partitions', 'Data Lakehouse Architecture', 'dbt Transformations', 'Airflow DAG Orchestration'],
        geminiPrompts: {
          cheatsheetPrompt: 'Generate an Apache Spark & SQL Data Engineering cheat sheet covering PySpark transformations, broadcast joins, and window functions.',
          projectPrompt: 'Architect an end-to-end data pipeline using Spark and dbt that processes streaming event logs into star-schema analytical tables.',
          interviewPrompt: 'Explain the difference between star schema and snowflake schema. When would you denormalize data for OLAP queries?',
          edgeCasePrompt: 'How do you detect and mitigate data skew during large Spark distributed shuffle operations?'
        }
      }
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist & Quantitative Analyst',
    category: 'AI & Data Science',
    shortDescription: 'Extract predictive insights through statistical modeling, feature engineering, and hypothesis testing.',
    fullOverview: 'Data scientists formulate statistical experiments, build regression/classification algorithms, and communicate quantitative insights.',
    difficulty: 'Intermediate',
    estTimeToMaster: '7 - 11 Months',
    salaryRange: '$100,000 - $175,000',
    topCompanyChannels: ['MIT OpenCourseWare', 'StatQuest with Josh Starmer', 'Kaggle'],
    techStack: ['Python', 'Pandas', 'Scikit-Learn', 'Statsmodels', 'SQL', 'Seaborn', 'Hypothesis Testing'],
    steps: [
      {
        id: 'ds-1',
        stepNumber: 1,
        phase: 'Foundations',
        title: 'Statistical Inference, A/B Testing & Machine Learning',
        duration: '20:15',
        durationSec: 1215,
        youtubeUrl: 'https://www.youtube.com/watch?v=i_LwzRVP7bg',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
        description: 'P-values, confidence intervals, logistic regression, decision trees, random forests, and feature importance.',
        keyConcepts: ['Null Hypothesis Testing (p-values)', 'A/B Testing Sample Sizes', 'Bias-Variance Tradeoff', 'ROC-AUC & Precision-Recall'],
        geminiPrompts: {
          cheatsheetPrompt: 'Create a Data Science & Statistics cheat sheet detailing distributions (Normal, Binomial, Poisson), hypothesis tests (t-test, ANOVA, Chi-Square), and model evaluation metrics.',
          projectPrompt: 'Conduct an end-to-end churn prediction study on a customer dataset including feature engineering, cross-validation, and business impact analysis.',
          interviewPrompt: 'Explain the difference between Type I and Type II errors. How do you calculate sample size required for statistical significance in A/B testing?',
          edgeCasePrompt: 'How do you handle severe class imbalance in classification datasets (SMOTE, Focal Loss, threshold tuning)?'
        }
      }
    ]
  },
  {
    id: 'mobile-app-engineer',
    title: 'Mobile App Engineer (iOS, Android & Flutter)',
    category: 'Software Engineering',
    shortDescription: 'Build native and cross-platform mobile apps with smooth 60fps animations and offline sync.',
    fullOverview: 'Mobile engineers create performant touch-first client experiences for iOS and Android using modern declarative UI frameworks.',
    difficulty: 'Intermediate',
    estTimeToMaster: '6 - 10 Months',
    salaryRange: '$95,000 - $170,000',
    topCompanyChannels: ['Android Developers', 'Apple Developer', 'Flutter', 'Kavsoft'],
    techStack: ['Flutter / Dart', 'Swift / SwiftUI', 'Kotlin / Jetpack Compose', 'SQLite', 'Firebase', 'Push Notifications'],
    steps: [
      {
        id: 'mob-1',
        stepNumber: 1,
        phase: 'Core Engineering',
        title: 'Flutter & Dart Cross-Platform App Architecture',
        duration: '22:00',
        durationSec: 1320,
        youtubeUrl: 'https://www.youtube.com/watch?v=VPvVD8t02U8',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
        description: 'Widget trees, reactive state management (Riverpod/Bloc), local persistence, and background tasks.',
        keyConcepts: ['Declarative Widget Trees', 'Riverpod State Management', 'Offline Local Storage (Hive/Isar)', 'Platform Channels'],
        geminiPrompts: {
          cheatsheetPrompt: 'Generate a Flutter & Dart architecture cheat sheet detailing Widget lifecycles, Riverpod providers, layout widgets, and asynchronous Futures.',
          projectPrompt: 'Build a full-featured offline-first habit tracker mobile app with local notifications and cloud sync in Flutter.',
          interviewPrompt: 'Explain the rendering pipeline in Flutter (Widget -> Element -> RenderObject) and how it achieves 60/120 FPS performance.',
          edgeCasePrompt: 'How do you prevent memory leaks when managing TextEditingControllers and AnimationControllers in mobile apps?'
        }
      }
    ]
  },
  {
    id: 'embedded-systems-robotics',
    title: 'Embedded Systems & Robotics Engineer',
    category: 'Systems & Hardware',
    shortDescription: 'Program microcontrollers, real-time operating systems (RTOS), sensors, and robotic kinematics.',
    fullOverview: 'Embedded engineers write low-level C/C++ firmware that interacts directly with hardware registers, actuators, and embedded IoT sensors.',
    difficulty: 'Advanced',
    estTimeToMaster: '9 - 15 Months',
    salaryRange: '$100,000 - $180,000',
    topCompanyChannels: ['MIT OpenCourseWare', 'Arduino', 'Raspberry Pi Foundation'],
    techStack: ['C / C++', 'FreeRTOS', 'ARM Cortex', 'I2C / SPI / UART', 'ROS (Robot Operating System)', 'Linux Kernel'],
    steps: [
      {
        id: 'emb-1',
        stepNumber: 1,
        phase: 'Foundations',
        title: 'C Programming for Microcontrollers & Hardware Protocols',
        duration: '16:40',
        durationSec: 1000,
        youtubeUrl: 'https://www.youtube.com/watch?v=KJgsSFOSQv0',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        description: 'Bit manipulation, memory mapped registers, interrupt service routines (ISR), I2C, and SPI buses.',
        keyConcepts: ['Memory-Mapped I/O', 'Interrupt Handlers (ISR)', 'SPI & I2C Protocols', 'Bitwise Register Masking'],
        geminiPrompts: {
          cheatsheetPrompt: 'Create an Embedded C & Hardware Protocols cheat sheet covering Bit manipulation macros, ISR rules, volatile qualifiers, and communication protocols (I2C, SPI, UART).',
          projectPrompt: 'Design firmware for an autonomous sensor station reading environmental data via I2C with power-saving sleep modes.',
          interviewPrompt: 'Why is the `volatile` keyword critical in embedded C? What happens when an optimizing compiler ignores it for hardware registers?',
          edgeCasePrompt: 'How do you prevent priority inversion in Real-Time Operating Systems (RTOS) using Priority Inheritance protocols?'
        }
      }
    ]
  },
  {
    id: 'blockchain-smart-contracts',
    title: 'Blockchain & Smart Contract Engineer',
    category: 'Software Engineering',
    shortDescription: 'Author decentralized smart contracts, verify consensus protocols, and audit EVM state security.',
    fullOverview: 'Blockchain developers write immutable smart contracts in Solidity/Rust, implement zero-knowledge proofs, and secure decentralized finance (DeFi).',
    difficulty: 'Advanced',
    estTimeToMaster: '7 - 12 Months',
    salaryRange: '$115,000 - $210,000',
    topCompanyChannels: ['Ethereum Foundation', 'Patrick Collins', 'EatTheBlocks'],
    techStack: ['Solidity', 'Rust', 'EVM', 'Foundry / Hardhat', 'Ethers.js', 'Cryptography'],
    steps: [
      {
        id: 'bc-1',
        stepNumber: 1,
        phase: 'Core Engineering',
        title: 'Solidity Smart Contracts, Foundry & EVM Security',
        duration: '25:10',
        durationSec: 1510,
        youtubeUrl: 'https://www.youtube.com/watch?v=gyMwXuJrbJQ',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
        description: 'EVM opcode execution, gas optimization, reentrancy protection, and automated fuzz testing in Foundry.',
        keyConcepts: ['Reentrancy Guards', 'EVM Storage Slots', 'Gas Optimization Techniques', 'ERC-20 & ERC-721 Standards'],
        geminiPrompts: {
          cheatsheetPrompt: 'Generate a Solidity & EVM Security cheat sheet covering reentrancy prevention (Checks-Effects-Interactions), storage layout packing, and standard ERC interfaces.',
          projectPrompt: 'Develop an automated vault smart contract with time-locked withdrawals, role permissions, and comprehensive Foundry unit and fuzz tests.',
          interviewPrompt: 'Explain how the Ethereum Virtual Machine (EVM) executes opcodes and how storage vs memory vs calldata alters gas consumption.',
          edgeCasePrompt: 'How do you defend smart contracts against frontrunning, flash loan attacks, and oracle manipulation?'
        }
      }
    ]
  },
  {
    id: 'site-reliability-engineer',
    title: 'Site Reliability Engineer (SRE)',
    category: 'Cloud & Cybersecurity',
    shortDescription: 'Engineer system uptime, service level objectives (SLOs), automated remediation, and chaos engineering.',
    fullOverview: 'SREs apply software engineering principles to operations, establishing error budgets, latency alerts, and automated disaster recovery.',
    difficulty: 'Intermediate',
    estTimeToMaster: '7 - 11 Months',
    salaryRange: '$115,000 - $195,000',
    topCompanyChannels: ['Google TechTalks', 'SREcon', 'USENIX Association'],
    techStack: ['Linux', 'Prometheus', 'Grafana', 'Python', 'Go', 'Kubernetes', 'Chaos Mesh'],
    steps: [
      {
        id: 'sre-1',
        stepNumber: 1,
        phase: 'Core Engineering',
        title: 'SLIs, SLOs, Error Budgets & Observability',
        duration: '15:45',
        durationSec: 945,
        youtubeUrl: 'https://www.youtube.com/watch?v=uTBP6E6CPAQ',
        channel: 'Google Cloud Tech',
        thumbnailUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
        description: 'Defining actionable service level indicators, calculating error burn rates, and distributed tracing with OpenTelemetry.',
        keyConcepts: ['Service Level Objectives (SLOs)', 'Error Budget Calculation', 'OpenTelemetry Tracing', 'Alert Burn Rates'],
        geminiPrompts: {
          cheatsheetPrompt: 'Create an SRE & Observability cheat sheet detailing the Four Golden Signals (Latency, Traffic, Errors, Saturation) and Prometheus PromQL queries.',
          projectPrompt: 'Set up an observability stack using Prometheus, Grafana, and OpenTelemetry to trace requests across microservices.',
          interviewPrompt: 'What is an Error Budget and how does an SRE team enforce it when developers want to ship new features during outages?',
          edgeCasePrompt: 'How do you prevent cascading failures in distributed architectures using circuit breakers and exponential backoff jitter?'
        }
      }
    ]
  },
  {
    id: 'computer-vision-specialist',
    title: 'Computer Vision Specialist',
    category: 'AI & Data Science',
    shortDescription: 'Build convolutional neural nets, real-time object detection (YOLO), and 3D visual reconstruction.',
    fullOverview: 'Computer vision engineers enable machines to perceive, segment, track, and understand visual scenes for autonomous vehicles and robotics.',
    difficulty: 'Advanced',
    estTimeToMaster: '9 - 14 Months',
    salaryRange: '$120,000 - $210,000',
    topCompanyChannels: ['OpenCV', 'Stanford Online', 'PyTorch'],
    techStack: ['Python', 'PyTorch', 'OpenCV', 'YOLOv8', 'CUDA', 'TorchVision', 'Point Cloud Library'],
    steps: [
      {
        id: 'cv-1',
        stepNumber: 1,
        phase: 'Core Engineering',
        title: 'Convolutional Neural Networks & Object Detection',
        duration: '21:30',
        durationSec: 1290,
        youtubeUrl: 'https://www.youtube.com/watch?v=IA3WxTTPXqQ',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80',
        description: 'Convolution kernels, pooling layers, feature maps, bounding box regression, and Intersection over Union (IoU).',
        keyConcepts: ['Convolution & Kernel Filters', 'Intersection over Union (IoU)', 'Non-Max Suppression (NMS)', 'Feature Pyramid Networks'],
        geminiPrompts: {
          cheatsheetPrompt: 'Generate a Computer Vision & CNN cheat sheet covering convolution operations, receptive fields, IoU calculation, and popular architectures (ResNet, YOLO).',
          projectPrompt: 'Train a custom real-time object detection model using YOLO and PyTorch on a custom labeled dataset.',
          interviewPrompt: 'Explain how Non-Maximum Suppression (NMS) removes redundant bounding boxes during object detection inference.',
          edgeCasePrompt: 'How do you handle domain shift when a computer vision model trained on sunny daylight fails in rainy night conditions?'
        }
      }
    ]
  },
  {
    id: 'nlp-llm-engineer',
    title: 'NLP & Large Language Model Specialist',
    category: 'AI & Data Science',
    shortDescription: 'Build Retrieval-Augmented Generation (RAG) pipelines, fine-tune LLMs, and author AI agent tools.',
    fullOverview: 'NLP engineers leverage foundation models, vector embeddings, semantic search, and prompt architectures to build intelligent text systems.',
    difficulty: 'Advanced',
    estTimeToMaster: '8 - 13 Months',
    salaryRange: '$125,000 - $225,000',
    topCompanyChannels: ['Google DeepMind', 'Hugging Face', 'Stanford NLP'],
    techStack: ['Python', 'Gemini API', 'LangChain / LlamaIndex', 'ChromaDB', 'Hugging Face', 'PEFT / LoRA'],
    steps: [
      {
        id: 'nlp-1',
        stepNumber: 1,
        phase: 'Core Engineering',
        title: 'RAG Architectures, Vector Embeddings & LLM Agents',
        duration: '24:10',
        durationSec: 1450,
        youtubeUrl: 'https://www.youtube.com/watch?v=kCc8FmEb1nY',
        channel: 'Andrej Karpathy',
        thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        description: 'Dense vector search, cosine similarity, semantic chunking strategies, and ReAct agent function calling.',
        keyConcepts: ['Dense Vector Embeddings', 'Cosine Similarity & HNSW Indexing', 'Context Chunking Strategies', 'Tool Calling & Function Calling'],
        geminiPrompts: {
          cheatsheetPrompt: 'Create an Advanced RAG & LLM Engineering cheat sheet detailing chunking methods, re-ranking algorithms, and function-calling schemas.',
          projectPrompt: 'Build a production RAG application with hybrid search (BM25 + Dense Embeddings) and source citation verification using Gemini.',
          interviewPrompt: 'Compare Fine-Tuning (LoRA / QLoRA) with Retrieval-Augmented Generation (RAG). When is each technique the correct architectural choice?',
          edgeCasePrompt: 'How do you prevent hallucination and prompt injection attacks in enterprise LLM agent workflows?'
        }
      }
    ]
  },
  {
    id: 'qa-automation-engineer',
    title: 'QA Automation & Test Architect',
    category: 'Software Engineering',
    shortDescription: 'Automate end-to-end browser tests, API load tests, and continuous regression suites.',
    fullOverview: 'QA architects build automated test suites using Playwright, Cypress, and k6, ensuring zero regressions reach production.',
    difficulty: 'Beginner Friendly',
    estTimeToMaster: '4 - 7 Months',
    salaryRange: '$85,000 - $145,000',
    topCompanyChannels: ['Playwright', 'freeCodeCamp', 'Execute Automation'],
    techStack: ['TypeScript', 'Playwright', 'Jest / Vitest', 'k6 Load Testing', 'GitHub Actions', 'Postman'],
    steps: [
      {
        id: 'qa-1',
        stepNumber: 1,
        phase: 'Core Engineering',
        title: 'Playwright End-to-End Testing & CI Pipelines',
        duration: '16:00',
        durationSec: 960,
        youtubeUrl: 'https://www.youtube.com/watch?v=Xz6qhPrb4_0',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        description: 'Page Object Models (POM), auto-waiting, visual regression snapshots, and headless browser parallelization.',
        keyConcepts: ['Page Object Model (POM)', 'Auto-waiting & Locators', 'Mocking Network Requests', 'Visual Snapshot Diffing'],
        geminiPrompts: {
          cheatsheetPrompt: 'Generate a Playwright & Testing Architecture cheat sheet covering resilient locators (getByRole, getByText), network interception, and assertions.',
          projectPrompt: 'Architect an automated test suite with Page Object Model that validates user checkout flows across Chrome, Firefox, and Safari in parallel.',
          interviewPrompt: 'What is the Testing Pyramid and why should unit tests outnumber end-to-end UI tests in healthy codebases?',
          edgeCasePrompt: 'How do you eliminate flaky tests caused by asynchronous timing, network delays, or animation race conditions?'
        }
      }
    ]
  },
  {
    id: 'technical-product-manager',
    title: 'Technical Product Manager (TPM)',
    category: 'Design & Creative Tech',
    shortDescription: 'Define product roadmaps, write technical PRDs, prioritize sprint backlog, and analyze telemetry.',
    fullOverview: 'Technical PMs translate customer problems into scalable software specifications, coordinating engineering and design teams.',
    difficulty: 'Intermediate',
    estTimeToMaster: '6 - 10 Months',
    salaryRange: '$105,000 - $185,000',
    topCompanyChannels: ['Google PM Guides', 'Y Combinator', 'Lenny Rachitsky'],
    techStack: ['System Architecture', 'SQL', 'Product Requirement Docs (PRD)', 'Figma', 'Mixpanel', 'Jira'],
    steps: [
      {
        id: 'pm-1',
        stepNumber: 1,
        phase: 'Foundations',
        title: 'Technical PRD Authoring, Metrics & Agile Delivery',
        duration: '14:15',
        durationSec: 855,
        youtubeUrl: 'https://www.youtube.com/watch?v=8aGhZQkoFbQ',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
        description: 'North Star metrics, user story mapping, non-functional requirements (NFRs), and technical tradeoff evaluation.',
        keyConcepts: ['North Star Metric Framework', 'Writing Technical PRDs', 'Sprint Backlog Prioritization (RICE)', 'Data Analytics with SQL'],
        geminiPrompts: {
          cheatsheetPrompt: 'Create a Technical Product Management (TPM) cheat sheet detailing PRD templates, RICE scoring formulas, and North Star metric hierarchies.',
          projectPrompt: 'Write a comprehensive technical PRD for an AI-assisted search feature including functional specs, edge cases, and success metrics.',
          interviewPrompt: 'How do you make product prioritization decisions when engineering asks for a 3-month technical refactor while sales demands new features?',
          edgeCasePrompt: 'How do you establish quantitative guardrail metrics to ensure a new feature launch does not degrade system latency or conversion rates?'
        }
      }
    ]
  },
  {
    id: 'ar-vr-spatial-developer',
    title: 'AR/VR & Spatial Computing Developer',
    category: 'Design & Creative Tech',
    shortDescription: 'Develop spatial interfaces, immersive 6DOF VR environments, and WebXR applications.',
    fullOverview: 'Spatial computing developers build applications for headsets (Apple Vision Pro, Meta Quest) using 3D interaction design and real-time physics.',
    difficulty: 'Advanced',
    estTimeToMaster: '8 - 14 Months',
    salaryRange: '$110,000 - $190,000',
    topCompanyChannels: ['Meta Developers', 'Unity', 'Apple Developer'],
    techStack: ['Unity', 'Unreal Engine', 'WebXR', 'Three.js', 'C#', 'OpenXR', 'Spatial Audio'],
    steps: [
      {
        id: 'ar-1',
        stepNumber: 1,
        phase: 'Core Engineering',
        title: 'Spatial UI, Hand Tracking & OpenXR Interactions',
        duration: '19:40',
        durationSec: 1180,
        youtubeUrl: 'https://www.youtube.com/watch?v=0kF41r7j7gY',
        channel: 'freeCodeCamp.org',
        thumbnailUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80',
        description: '6-Degrees-of-Freedom (6DOF) tracking, ray interactor pointers, hand gesture recognition, and spatial UI ergonomics.',
        keyConcepts: ['6DOF Coordinate Spaces', 'Hand Gesture Interaction', 'OpenXR Standard', 'Spatial Audio Simulation'],
        geminiPrompts: {
          cheatsheetPrompt: 'Generate a Spatial Computing & WebXR cheat sheet covering 3D interaction physics, hand tracking gesture states, and spatial audio configuration.',
          projectPrompt: 'Build an interactive 3D spatial product customizer in WebXR / Three.js that users can manipulate with ray-casting gestures.',
          interviewPrompt: 'How does foveated rendering use eye-tracking to drastically reduce GPU fragment shading workloads in VR headsets?',
          edgeCasePrompt: 'How do you design spatial user interfaces that minimize motion sickness and physical neck/eye fatigue?'
        }
      }
    ]
  }
];

export const CS_ROLE_CATEGORIES = [
  'All Tracks',
  'Software Engineering',
  'AI & Data Science',
  'Cloud & Cybersecurity',
  'Design & Creative Tech',
  'Systems & Hardware'
] as const;
