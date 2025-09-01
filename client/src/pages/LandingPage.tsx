import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Users, 
  Award, 
  Smartphone, 
  Shield, 
  Clock,
  ArrowRight,
  Star,
  Play,
  TrendingUp,
  Globe,
  Zap
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: "10,000+", label: "Certified Professionals" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Support Available" },
    { number: "50+", label: "Industries Covered" }
  ];

  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: "Multi-Step Registration",
      description: "Simple 4-step registration process with secure payment integration"
    },
    {
      icon: <Award className="w-8 h-8 text-primary-600" />,
      title: "KNQA Certified",
      description: "Official certification under Kenya's National Qualifications Authority framework"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-primary-600" />,
      title: "M-Pesa Integration",
      description: "Seamless payment processing with M-Pesa STK push technology"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-600" />,
      title: "Secure Platform",
      description: "Bank-level security with encrypted data transmission and storage"
    },
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: "Referral System",
      description: "Earn bonuses by referring friends and family to the platform"
    },
    {
      icon: <Clock className="w-8 h-8 text-primary-600" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your needs"
    }
  ];

  const benefits = [
    "Official RPL certification recognized by employers",
    "Access to exclusive job opportunities",
    "Professional development resources",
    "Networking opportunities with certified professionals",
    "Lifetime access to platform features",
    "Mobile-friendly interface for on-the-go access"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Award className="w-8 h-8 text-primary-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">RPL Platform</span>
            </div>
            <div className="flex space-x-4">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
              <Link 
                to="/login" 
                className="btn-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 overflow-hidden">
        {/* Background Animation Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className={`text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6 animate-bounce">
                <Zap className="w-4 h-4 mr-2" />
                Official KNQA Certified Platform
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                RPL Mobilization & 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                  {" "}Certification
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Get officially certified under Kenya's KNQA framework. Join thousands of professionals 
                who have enhanced their careers through our comprehensive RPL platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/login" 
                  className="btn-primary text-lg px-8 py-3 inline-flex items-center group hover:scale-105 transition-transform duration-300"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="btn-secondary text-lg px-8 py-3 hover:scale-105 transition-transform duration-300">
                  <Play className="w-5 h-5 mr-2 inline" />
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Right Content - Image Section */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative">
                {/* Professional Person Image */}
                <div className="relative mb-6 lg:mb-8">
                  <div className="relative overflow-hidden rounded-xl lg:rounded-2xl shadow-xl lg:shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                      alt="Professional smiling person with RPL certification"
                      className="w-full h-64 sm:h-80 md:h-96 object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Sarah Mwangi</h4>
                            <p className="text-xs sm:text-sm text-gray-600">RPL Certified Professional</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Certificate Container */}
                <div className="relative bg-white rounded-xl lg:rounded-2xl shadow-xl lg:shadow-2xl p-4 sm:p-6 transform rotate-1 lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg lg:rounded-xl p-4 sm:p-6 text-white">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className="flex items-center">
                        <Award className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                        <div>
                          <h3 className="text-base sm:text-lg font-bold">RPL Certificate</h3>
                          <p className="text-primary-100 text-xs sm:text-sm">Official Recognition</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg sm:text-xl font-bold">2024</div>
                        <div className="text-xs text-primary-100">KNQA</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-green-300" />
                        <span className="text-xs sm:text-sm">Professional Experience Validated</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-green-300" />
                        <span className="text-xs sm:text-sm">Employer Recognition</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-green-300" />
                        <span className="text-xs sm:text-sm">Career Advancement</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Stats Cards - Hidden on mobile, visible on larger screens */}
                <div className="hidden sm:block absolute top-2 lg:top-4 -left-1 lg:-left-2 bg-white rounded-lg shadow-lg p-2 lg:p-3 animate-float">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-green-500 mr-1 lg:mr-2" />
                    <div>
                      <div className="text-xs lg:text-sm font-bold text-gray-900">95%</div>
                      <div className="text-xs text-gray-500">Success Rate</div>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block absolute -bottom-1 lg:-bottom-2 -right-1 lg:-right-2 bg-white rounded-lg shadow-lg p-2 lg:p-3 animate-float-delayed">
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 lg:w-5 lg:h-5 text-blue-500 mr-1 lg:mr-2" />
                    <div>
                      <div className="text-xs lg:text-sm font-bold text-gray-900">10K+</div>
                      <div className="text-xs text-gray-500">Certified</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center transition-all duration-1000 delay-${index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide a comprehensive, secure, and user-friendly platform for RPL certification
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`card text-center hover:shadow-lg transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-4 group">
                  <div className="p-3 bg-primary-50 rounded-full group-hover:bg-primary-100 transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Unlock Your Professional Potential
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our RPL certification opens doors to new opportunities and validates your 
                professional experience with official recognition.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-secondary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Get Started Today
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                  <span className="font-medium">Registration Fee</span>
                  <span className="text-2xl font-bold text-primary-600">Ksh. 200</span>
                </div>
                <div className="text-center text-gray-600">
                  <p>One-time payment • Lifetime access</p>
                  <p className="text-sm mt-1">M-Pesa, Card, or Bank Transfer</p>
                </div>
                <Link 
                  to="/login" 
                  className="btn-primary w-full text-center block py-3"
                >
                  Start Registration
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Mwangi",
                role: "IT Professional",
                content: "The RPL certification helped me land my dream job. The process was smooth and the support was excellent."
              },
              {
                name: "John Kimani",
                role: "Project Manager",
                content: "I was skeptical at first, but the official certification has opened so many doors for my career."
              },
              {
                name: "Grace Wanjiku",
                role: "Healthcare Worker",
                content: "The referral system is amazing! I've earned bonuses while helping friends advance their careers."
              }
            ].map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Certified?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join the RPL platform today and take the first step towards official professional recognition.
          </p>
          <Link 
            to="/login" 
            className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg text-lg inline-flex items-center transition-colors"
          >
            Start Registration Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Award className="w-8 h-8 text-primary-400 mr-2" />
                <span className="text-xl font-bold">RPL Platform</span>
              </div>
              <p className="text-gray-400">
                Official RPL certification under Kenya's KNQA framework.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/register" className="text-gray-400 hover:text-white">Register</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white">Login</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><span className="text-gray-400">Email: support@rplplatform.co.ke</span></li>
                <li><span className="text-gray-400">Phone: +254 700 000 000</span></li>
                <li><span className="text-gray-400">24/7 Support Available</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><span className="text-gray-400">Privacy Policy</span></li>
                <li><span className="text-gray-400">Terms of Service</span></li>
                <li><span className="text-gray-400">KNQA Compliance</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 sm:pt-8 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 space-y-2 sm:space-y-0">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400 mr-0 sm:mr-2" />
              <span className="text-primary-400 font-semibold text-base sm:text-lg">Official KNQA Certified Platform</span>
            </div>
            <p className="text-gray-400 text-sm sm:text-base">
              © 2024 RPL Mobilization Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
