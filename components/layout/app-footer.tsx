import { Compass } from "lucide-react"
import Link from "next/link"

export function AppFooter() {
  return (
    <footer className="border-t bg-muted/30 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Compass className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-primary">Loyola Academy</h3>
                <p className="text-xs text-muted-foreground">Knowledge for Greater Impact</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering learners worldwide with quality ICT and AI education.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Learn</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/courses" className="hover:text-primary">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/free-courses" className="hover:text-primary">
                  Free Courses
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="hover:text-primary">
                  Certificates
                </Link>
              </li>
              <li>
                <Link href="/career-paths" className="hover:text-primary">
                  Career Paths
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Teach</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/teach" className="hover:text-primary">
                  Become Instructor
                </Link>
              </li>
              <li>
                <Link href="/instructor-guide" className="hover:text-primary">
                  Teaching Guide
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-primary">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/help" className="hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Loyola Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
