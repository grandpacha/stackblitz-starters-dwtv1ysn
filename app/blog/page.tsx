'use client';

import Link from 'next/link';
import SectionLabel from '../components/SectionLabel';
import ScrollAnimation from '../components/ScrollAnimation';
import FAQ from '../components/FAQ';
import { blogPosts } from '../data';

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

  return (
    <main>
      {/* Page Header */}
      <section className="pt-32 pb-section">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <SectionLabel text="Blog" />
          </ScrollAnimation>
          <ScrollAnimation delay={100}>
            <h2 className="text-h2 mt-4 max-w-3xl">
              Insights, ideas, and inspiration for bold brands.
            </h2>
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <p className="text-muted mt-4 max-w-xl text-lg leading-relaxed">
              Perspectives on branding, design, and strategy from the Chart+Foster team.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-section border-t border-border">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              {/* Image placeholder */}
              <div className="aspect-[16/9] bg-surface-light rounded-card overflow-hidden w-full mb-8 card-image transition-transform duration-500 group-hover:scale-[1.01]" />

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="inline-block px-3 py-1 bg-surface-light rounded-full text-xs text-muted">
                  {featuredPost.category}
                </span>
                <span className="text-sm text-muted">{featuredPost.readTime}</span>
              </div>

              <h3 className="text-h3 font-bold mb-3 max-w-3xl group-hover:text-cream transition-colors duration-200">
                {featuredPost.title}
              </h3>
              <p className="text-muted leading-relaxed max-w-2xl">
                {featuredPost.excerpt}
              </p>
            </Link>
          </ScrollAnimation>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-section border-t border-border">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation stagger>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {remainingPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block card-hover group"
                >
                  {/* Image placeholder */}
                  <div className="aspect-[3/2] bg-surface-light rounded-card overflow-hidden w-full card-image" />

                  <div className="flex flex-wrap items-center gap-3 mt-4 mb-2">
                    <span className="inline-block px-3 py-1 bg-surface-light rounded-full text-xs text-muted">
                      {post.category}
                    </span>
                    <span className="text-sm text-muted">{post.readTime}</span>
                  </div>

                  <h3 className="font-bold text-xl leading-snug group-hover:text-cream transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-muted mt-2 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />
    </main>
  );
}
