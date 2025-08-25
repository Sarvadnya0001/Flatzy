import { Users, Target, Award, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Users,
      title: 'Customer First',
      description: 'We prioritize our customers\' needs and ensure their satisfaction is our top priority.'
    },
    {
      icon: Target,
      title: 'Reliability',
      description: 'We provide accurate information and reliable services you can trust.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from listings to customer service.'
    },
    {
      icon: Heart,
      title: 'Care',
      description: 'We genuinely care about helping people find their perfect home.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-sky-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About RentEase
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to make renting simple, transparent, and stress-free for everyone. 
              Our platform connects tenants with quality properties and provides comprehensive support throughout the rental journey.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2023, RentEase was born out of the frustration of finding quality rental properties 
                  in a market filled with unreliable listings and poor customer service. Our founders experienced 
                  firsthand the challenges of renting and decided to create a better solution.
                </p>
                <p>
                  Today, we've helped thousands of people find their perfect homes across major cities in India. 
                  Our team of dedicated professionals works tirelessly to ensure that every property listing is 
                  verified and every customer receives the support they deserve.
                </p>
                <p>
                  We believe that finding a home should be exciting, not stressful. That's why we've built a 
                  platform that prioritizes transparency, quality, and exceptional customer service.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Our team"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full mb-4">
                    <IconComponent className="w-8 h-8 text-sky-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              To revolutionize the rental experience by providing a transparent, reliable, and user-friendly 
              platform that connects people with their perfect homes. We're committed to building trust, 
              fostering community, and making quality housing accessible to everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;