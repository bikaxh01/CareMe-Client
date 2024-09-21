import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Mail, MapPin, Phone, Shield, Stethoscope, User } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <Stethoscope className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold">Care Me</span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 bg-black text-white lg:py-32 xl:py-48 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl  font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary-foreground">
                  Book Your Appointment with Top Doctors
                </h1>
                <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
                  Experience world-class healthcare with our team of expert doctors. Easy booking, exceptional care.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild variant="secondary">
                  <Link href="/auth/sign-in">Book Now</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Why Choose Us</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <User className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Expert Doctors</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Our team consists of highly qualified and experienced medical professionals.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Advanced Treatment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We use the latest medical technologies and techniques for the best patient outcomes.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Clock className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Timely Care</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Easy appointment booking and minimal wait times for your convenience.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="doctors" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Our Doctors</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {[
                { name: "Dr. John Doe", specialization: "Cardiology", experience: "20+ years" },
                { name: "Dr. Jane Smith", specialization: "Neurology", experience: "15+ years" },
                { name: "Dr. Mike Johnson", specialization: "Pediatrics", experience: "18+ years" },
              ].map((doctor, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4" />
                    <CardTitle className="text-center">{doctor.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center">Specialization: {doctor.specialization}</p>
                    <p className="text-center text-sm text-muted-foreground mt-2">
                      {doctor.experience} of experience
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section id="book" className="w-full py-12 md:py-24 lg:py-32 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary-foreground">
                  Ready to Book Your Appointment?
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                  Take the first step towards better health. Book your appointment now and experience our exceptional care.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button className="w-full" variant="secondary" asChild>
                  <Link href="#book">Book Appointment</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@healthcareclinic.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Medical Ave, Health City, HC 12345</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Opening Hours</h3>
              <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
              <p>Saturday: 9:00 AM - 5:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <nav className="flex flex-col space-y-2">
                <Link className="hover:underline" href="#features">Why Choose Us</Link>
                <Link className="hover:underline" href="#doctors">Our Doctors</Link>
                <Link className="hover:underline" href="#book">Book Appointment</Link>
              </nav>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">© 2023 HealthCare Clinic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}