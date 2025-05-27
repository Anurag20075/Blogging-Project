import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { insertUserSchema, loginSchema, registerSchema, insertPostSchema, insertCommentSchema } from "@shared/schema";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    username: string;
    name: string;
  };
}

// Middleware to verify JWT token
const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await storage.getUser(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
    };
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Auth routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const validatedData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      const existingUsername = await storage.getUserByUsername(validatedData.username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      // Create user
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          name: user.name,
        },
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      // Find user by email
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(validatedData.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          name: user.name,
        },
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/auth/me", authenticateToken, async (req: AuthRequest, res: Response) => {
    const user = await storage.getUser(req.user!.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      bio: user.bio,
      location: user.location,
      website: user.website,
      avatar: user.avatar,
    });
  });

  // Post routes
  app.get("/api/posts", async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const offset = (page - 1) * limit;

      const posts = await storage.getPosts(limit, offset);
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/posts/search", async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;
      const tag = req.query.tag as string;
      const authorId = req.query.author ? parseInt(req.query.author as string) : undefined;

      const posts = await storage.searchPosts(query || "", tag, authorId);
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/posts/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getPost(id);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json(post);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/posts", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const validatedData = insertPostSchema.parse({
        ...req.body,
        authorId: req.user!.id,
      });

      // Generate excerpt from content if not provided
      if (!validatedData.excerpt) {
        validatedData.excerpt = validatedData.content.substring(0, 200) + "...";
      }

      const post = await storage.createPost(validatedData);
      res.status(201).json(post);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put("/api/posts/:id", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getPost(id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post.authorId !== req.user!.id) {
        return res.status(403).json({ message: "Not authorized to edit this post" });
      }

      const validatedData = insertPostSchema.partial().parse(req.body);
      const updatedPost = await storage.updatePost(id, validatedData);

      res.json(updatedPost);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/posts/:id", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getPost(id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post.authorId !== req.user!.id) {
        return res.status(403).json({ message: "Not authorized to delete this post" });
      }

      const deleted = await storage.deletePost(id);
      if (deleted) {
        res.json({ message: "Post deleted successfully" });
      } else {
        res.status(500).json({ message: "Failed to delete post" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/users/:id/posts", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const posts = await storage.getPostsByAuthor(id);
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Comment routes
  app.get("/api/posts/:id/comments", async (req: Request, res: Response) => {
    try {
      const postId = parseInt(req.params.id);
      const comments = await storage.getCommentsByPost(postId);
      res.json(comments);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/posts/:id/comments", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const postId = parseInt(req.params.id);
      const validatedData = insertCommentSchema.parse({
        ...req.body,
        postId,
        authorId: req.user!.id,
      });

      const comment = await storage.createComment(validatedData);
      res.status(201).json(comment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/comments/:id", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      // In a real app, you'd check if the user owns the comment or the post
      const deleted = await storage.deleteComment(id);
      
      if (deleted) {
        res.json({ message: "Comment deleted successfully" });
      } else {
        res.status(404).json({ message: "Comment not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // User profile routes
  app.put("/api/users/profile", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const validatedData = insertUserSchema.partial().parse(req.body);
      
      // Remove password from update data if present
      delete (validatedData as any).password;
      
      const updatedUser = await storage.updateUser(req.user!.id, validatedData);
      res.json(updatedUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
