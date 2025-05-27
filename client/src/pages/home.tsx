import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, User, ArrowRight, PenTool, BookOpen, Users, Star, TrendingUp, Zap } from 'lucide-react';
import type { PostWithAuthor } from '@shared/schema';

export default function HomePage() {
  const { data: posts, isLoading } = useQuery<PostWithAuthor[]>({
    queryKey: ['/api/posts'],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <Skeleton className="h-12 w-2/3 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="h-[400px]">
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-8">
              <div className="flex justify-center mb-8">
                <div className="p-4 bg-primary/10 rounded-full">
                  <PenTool className="h-16 w-16 text-primary" />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                BlogCraft
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Where stories come to life. Discover amazing insights, share your expertise, and connect with a community of passionate writers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button size="lg" asChild className="text-lg px-8 py-6">
                  <Link href="/create">Start Writing</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Image Showcase Section */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Inspiration Gallery</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Beautiful moments captured by our community of writers and creators
              </p>
            </div>
            
            {/* Image Grid */}
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Person writing on laptop" 
                  className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
                <img 
                  src="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Notebook and coffee" 
                  className="w-full h-32 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Writing desk setup" 
                  className="w-full h-32 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
                <img 
                  src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Creative workspace" 
                  className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Books and coffee" 
                  className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
                <img 
                  src="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Writing tools" 
                  className="w-full h-32 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-4 hidden lg:block">
                <img 
                  src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Typewriter vintage" 
                  className="w-full h-32 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Collaborative writing" 
                  className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Features Section */}
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Why Choose BlogCraft?</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create, share, and grow your writing journey
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Rich Writing Experience</h3>
                  <p className="text-muted-foreground">
                    Create beautiful blog posts with our intuitive editor. Support for images, formatting, and more.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Engage Community</h3>
                  <p className="text-muted-foreground">
                    Connect with readers through comments, build your audience, and discover new perspectives.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Grow Your Reach</h3>
                  <p className="text-muted-foreground">
                    Get discovered through our search and tagging system. Build your personal brand and following.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Story?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of writers who are already sharing their stories on BlogCraft
            </p>
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link href="/register">Get Started Free</Link>
            </Button>
          </div>
        </section>
      </div>
    );
  }

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="min-h-screen">
      {/* Hero Section with animated background */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/10 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-primary/5 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-primary/15 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-10 right-10 w-8 h-8 bg-primary/10 rounded-full animate-bounce delay-700"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <PenTool className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Welcome to BlogCraft
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover amazing stories, thinking, and expertise from writers on any topic. Join our community of passionate storytellers.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>Premium Content</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Users className="h-5 w-5 text-green-500" />
                <span>Active Community</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Zap className="h-5 w-5 text-blue-500" />
                <span>Fast & Secure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Featured Post */}
      {featuredPost && (
        <div className="mb-12">
          <Card className="overflow-hidden bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">Featured</Badge>
                <h2 className="text-2xl md:text-3xl font-bold">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{featuredPost.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(featuredPost.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button asChild>
                  <Link href={`/post/${featuredPost.id}`} className="flex items-center space-x-1">
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              {featuredPost.coverImage && (
                <div className="order-first md:order-last">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="rounded-lg shadow-lg w-full h-64 object-cover"
                  />
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Other Posts Grid */}
      {otherPosts.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              {post.coverImage && (
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {post.tags?.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-lg font-semibold line-clamp-2">
                  <Link 
                    href={`/post/${post.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
